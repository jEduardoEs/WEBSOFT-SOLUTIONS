# jEduardoEs – Tienda demo con Stripe

Este repositorio ahora incluye una tienda de ejemplo de extremo a extremo para practicar un flujo de comercio electrónico:

- **Frontend (React + Vite + Zustand):** permite explorar productos, añadirlos a un carrito global y disparar el flujo de checkout.
- **Backend (Express + Stripe):** expone la API para consultar productos externos, crear sesiones de pago, generar PDF de confirmación y registrar órdenes.

## Requisitos

- Node.js 18+
- Cuenta de Stripe (modo test) y Stripe CLI para manejar webhooks.

## Configuración

1. Clona el repositorio y entra al proyecto:
   ```bash
   git clone https://github.com/jEduardoEs/jEduardoEs.git
   cd jEduardoEs
   ```
2. Instala las dependencias del frontend y backend:
   ```bash
   cd client && npm install && cd ..
   cd server && npm install && cd ..
   ```

### Variables de entorno

Copia los archivos `.env.example` de cada paquete y actualiza los valores necesarios:

- `client/.env.example` → `client/.env`
- `server/.env.example` → `server/.env`

Variables clave del backend (`server/.env`):

- `STRIPE_SECRET_KEY`: clave secreta de Stripe (modo test).
- `STRIPE_WEBHOOK_SECRET`: firma del webhook generado con Stripe CLI.
- `PRODUCT_API_URL`: endpoint para obtener productos (por defecto usa [Fake Store API](https://fakestoreapi.com/)).
- `FRONTEND_URL`: URL pública del frontend (por defecto `http://localhost:5173`).

## Ejecución en modo desarrollo

### Backend

```bash
cd server
npm run dev
```

El servidor levanta en `http://localhost:4000` y expone los endpoints:

- `GET /api/products`: productos externos normalizados.
- `POST /api/create-checkout-session`: crea una sesión de pago con impuestos/envío.
- `GET /api/orders/session/:sessionId`: recupera la orden asociada a una sesión de Stripe.
- `GET /api/orders/:orderId/confirmation`: descarga el PDF generado.
- `POST /api/webhook`: webhook para eventos de Stripe.

Para procesar los webhooks en local:

```bash
stripe login
stripe listen --forward-to localhost:4000/api/webhook
```

### Frontend

```bash
cd client
npm run dev
```

Vite abrirá la aplicación en `http://localhost:5173`. Desde ahí podrás:

1. Cargar productos desde el backend.
2. Agregar/quitar artículos usando el estado global de Zustand.
3. Iniciar el flujo de pago de Stripe (en modo test).
4. Tras el pago, volver a la pantalla de éxito donde se consulta la orden y se muestra el enlace al PDF de confirmación.

## Scripts adicionales

- `npm run build` (frontend): genera la versión de producción del cliente.
- `npm run lint`: ejecuta ESLint en cada paquete.

## Notas

- Los precios se calculan en USD con un IVA del 16 % y envío plano de 12 USD cuando el subtotal es menor a 150 USD.
- Los archivos PDF de confirmación se guardan en `server/orders/confirmations` (ignorado por Git).
- Ajusta los estilos o integra una API propia de productos según tus necesidades.
