import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/client';
import { formatCurrency } from '../utils/pricing';
import type { CartItem } from '../types';

interface OrderDetails {
  id: string;
  status: string;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  items: CartItem[];
  customer?: {
    name?: string | null;
    email?: string | null;
  };
  confirmationUrl?: string;
}

const CheckoutSuccessPage = () => {
  const [params] = useSearchParams();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = params.get('session_id');
    if (!sessionId) {
      setError('No se encontró la sesión de pago.');
      return;
    }

    const fetchOrder = async () => {
      try {
        const { data } = await api.get<OrderDetails>(`/api/orders/session/${sessionId}`);
        setOrder(data);
      } catch (err) {
        console.error(err);
        setError('No fue posible obtener la información del pedido.');
      }
    };

    fetchOrder();
  }, [params]);

  return (
    <div className="app-container">
      <header>
        <div>
          <h1>¡Gracias por tu compra!</h1>
          <p style={{ color: '#6b7280' }}>
            Hemos recibido tu pago. Recibirás una confirmación con el resumen del pedido.
          </p>
        </div>
      </header>
      {error ? <p className="status-banner error">{error}</p> : null}
      {order ? (
        <div className="cart-panel">
          <h2>Pedido {order.id}</h2>
          <p>Estado: <strong>{order.status}</strong></p>
          {order.customer?.email ? <p>Enviado a: {order.customer.email}</p> : null}
          <div className="cart-summary__totals">
            <div>Subtotal: <strong>{formatCurrency(order.subtotal)}</strong></div>
            <div>Impuestos: <strong>{formatCurrency(order.tax)}</strong></div>
            <div>Envío: <strong>{formatCurrency(order.shipping)}</strong></div>
            <div>Total pagado: <strong>{formatCurrency(order.total)}</strong></div>
          </div>
          <h3>Productos</h3>
          {order.items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item__info">
                <strong>{item.title}</strong>
                <span>{item.quantity} x {formatCurrency(item.price)}</span>
              </div>
              <div>{formatCurrency(item.price * item.quantity)}</div>
            </div>
          ))}
          {order.confirmationUrl ? (
            <a
              href={order.confirmationUrl}
              className="checkout-button"
              style={{ display: 'inline-block', textAlign: 'center', marginTop: '1.5rem' }}
            >
              Descargar confirmación (PDF)
            </a>
          ) : null}
        </div>
      ) : (
        !error && <p>Cargando detalles del pedido...</p>
      )}
    </div>
  );
};

export default CheckoutSuccessPage;
