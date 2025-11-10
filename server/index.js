import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import Stripe from 'stripe';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import PDFDocument from 'pdfkit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT ?? 4000);
const PRODUCT_API_URL = process.env.PRODUCT_API_URL ?? 'https://fakestoreapi.com/products';
const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:5173';
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

if (!STRIPE_SECRET_KEY) {
  throw new Error('Falta STRIPE_SECRET_KEY en el archivo de entorno.');
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
});

const app = express();
app.set('trust proxy', 1);

app.use(cors());
app.use((req, res, next) => {
  if (req.originalUrl === '/api/webhook') {
    next();
    return;
  }

  express.json({ limit: '1mb' })(req, res, next);
});

const ordersDir = path.join(__dirname, 'orders');
const confirmationsDir = path.join(ordersDir, 'confirmations');
const orderLogPath = path.join(ordersDir, 'order-log.json');

await fs.ensureDir(confirmationsDir);

const readOrders = async () => {
  try {
    const raw = await fs.readFile(orderLogPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if ((err?.code ?? '') === 'ENOENT') {
      return [];
    }
    throw err;
  }
};

const writeOrders = async (orders) => {
  await fs.writeJson(orderLogPath, orders, { spaces: 2 });
};

const calculatePricing = (items) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = Number((subtotal * 0.16).toFixed(2));
  const shipping = subtotal === 0 || subtotal >= 150 ? 0 : 12;
  const total = Number((subtotal + tax + shipping).toFixed(2));
  return { subtotal, tax, shipping, total };
};

const createOrder = async (items) => {
  const id = `order_${Date.now()}`;
  const pricing = calculatePricing(items);
  const order = {
    id,
    sessionId: null,
    status: 'pending',
    items,
    ...pricing,
    createdAt: new Date().toISOString()
  };
  const orders = await readOrders();
  orders.push(order);
  await writeOrders(orders);
  return order;
};

const updateOrderById = async (orderId, updates) => {
  const orders = await readOrders();
  const index = orders.findIndex((order) => order.id === orderId);
  if (index === -1) {
    return null;
  }
  orders[index] = { ...orders[index], ...updates };
  await writeOrders(orders);
  return orders[index];
};

const updateOrderBySessionId = async (sessionId, updates) => {
  const orders = await readOrders();
  const index = orders.findIndex((order) => order.sessionId === sessionId);
  if (index === -1) {
    return null;
  }
  orders[index] = { ...orders[index], ...updates };
  await writeOrders(orders);
  return orders[index];
};

const createConfirmationPdf = async (order) => {
  const pdfPath = path.join(confirmationsDir, `${order.id}.pdf`);
  const doc = new PDFDocument({ margin: 50 });
  const writeStream = fs.createWriteStream(pdfPath);
  doc.pipe(writeStream);

  doc.fontSize(20).text('Confirmación de pedido', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Pedido: ${order.id}`);
  doc.text(`Fecha: ${new Date(order.createdAt).toLocaleString('es-MX')}`);
  if (order.customer?.name) {
    doc.text(`Cliente: ${order.customer.name}`);
  }
  if (order.customer?.email) {
    doc.text(`Correo: ${order.customer.email}`);
  }
  doc.moveDown();

  doc.text('Detalle de artículos:');
  order.items.forEach((item) => {
    doc.text(`- ${item.quantity} x ${item.title} (${item.price} USD)`);
  });
  doc.moveDown();
  doc.text(`Subtotal: ${order.subtotal} USD`);
  doc.text(`Impuestos: ${order.tax} USD`);
  doc.text(`Envío: ${order.shipping} USD`);
  doc.text(`Total: ${order.total} USD`);
  doc.end();

  await new Promise((resolve) => writeStream.on('finish', resolve));

  return pdfPath;
};

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/products', async (_req, res) => {
  try {
    const { data } = await axios.get(PRODUCT_API_URL);
    const normalized = data.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: Number(product.price),
      image: product.image,
      category: product.category
    }));
    res.json(normalized);
  } catch (err) {
    console.error('Error al obtener productos', err);
    res.status(500).json({ message: 'No fue posible obtener productos.' });
  }
});

app.post('/api/create-checkout-session', async (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'El carrito está vacío.' });
  }

  const sanitizedItems = items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description ?? '',
    price: Number(item.price),
    quantity: Math.max(1, Number(item.quantity ?? 1)),
    image: item.image ?? null
  }));

  const order = await createOrder(sanitizedItems);

  try {
    const lineItems = sanitizedItems.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          description: item.description?.slice(0, 200)
        },
        unit_amount: Math.round(item.price * 100)
      },
      quantity: item.quantity
    }));

    const pricing = calculatePricing(sanitizedItems);
    if (pricing.shipping > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: 'Envío' },
          unit_amount: Math.round(pricing.shipping * 100)
        },
        quantity: 1
      });
    }
    if (pricing.tax > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: 'Impuestos' },
          unit_amount: Math.round(pricing.tax * 100)
        },
        quantity: 1
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `${FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/`,
      metadata: {
        orderId: order.id
      }
    });

    await updateOrderById(order.id, { sessionId: session.id });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Error al crear sesión de checkout', err);
    await updateOrderById(order.id, { status: 'failed' });
    res.status(500).json({ message: 'No fue posible crear la sesión de pago.' });
  }
});

app.get('/api/orders/session/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  const orders = await readOrders();
  const order = orders.find((item) => item.sessionId === sessionId || item.id === sessionId);
  if (!order) {
    return res.status(404).json({ message: 'Orden no encontrada.' });
  }

  let confirmationUrl = null;
  const pdfPath = path.join(confirmationsDir, `${order.id}.pdf`);
  if (await fs.pathExists(pdfPath)) {
    confirmationUrl = `${req.protocol}://${req.get('host')}/api/orders/${order.id}/confirmation`;
  }

  res.json({
    ...order,
    confirmationUrl
  });
});

app.get('/api/orders/:orderId/confirmation', async (req, res) => {
  const { orderId } = req.params;
  const pdfPath = path.join(confirmationsDir, `${orderId}.pdf`);
  if (!(await fs.pathExists(pdfPath))) {
    return res.status(404).json({ message: 'Confirmación no disponible.' });
  }
  res.sendFile(pdfPath);
});

app.post(
  '/api/webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      if (STRIPE_WEBHOOK_SECRET) {
        event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
      } else {
        event = JSON.parse(req.body.toString());
      }
    } catch (err) {
      console.error('Webhook signature verification failed.', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const order = await updateOrderBySessionId(session.id, {
        status: 'paid',
        sessionId: session.id,
        customer: {
          name: session.customer_details?.name ?? null,
          email: session.customer_details?.email ?? null
        }
      });
      if (order) {
        const pdfPath = await createConfirmationPdf(order);
        console.log(`PDF generado en ${pdfPath}`);
      }
    }

    res.json({ received: true });
  }
);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
