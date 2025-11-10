import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore, { selectCartItems, selectCartTotals } from '../store/cartStore';
import { formatCurrency } from '../utils/pricing';
import api from '../api/client';
import type { CheckoutResponse } from '../types';

const CartSummary = () => {
  const items = useCartStore(selectCartItems);
  const totals = useCartStore(selectCartTotals);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const hasItems = items.length > 0;

  const handleCheckout = async () => {
    setError(null);
    setLoading(true);

    try {
      const { data } = await api.post<CheckoutResponse>('/api/create-checkout-session', {
        items
      });

      if (data.url) {
        clear();
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      setError('No fue posible iniciar el pago. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (!hasItems) {
    return (
      <div className="cart-panel">
        <h2>Carrito</h2>
        <div className="empty-state">
          <p>Tu carrito está vacío. Agrega productos para continuar.</p>
          <button type="button" className="checkout-button" onClick={() => navigate('/')}>Explorar productos</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-panel">
      <h2>Carrito</h2>
      {error ? <p className="status-banner error">{error}</p> : null}
      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="cart-item__info">
            <strong>{item.title}</strong>
            <span>{formatCurrency(item.price)} c/u</span>
          </div>
          <div className="cart-item__controls">
            <button type="button" onClick={() => setQuantity(item.id, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button type="button" onClick={() => setQuantity(item.id, item.quantity + 1)}>+</button>
            <span>{formatCurrency(item.price * item.quantity)}</span>
            <button type="button" onClick={() => removeItem(item.id)} aria-label={`Eliminar ${item.title}`}>
              &times;
            </button>
          </div>
        </div>
      ))}
      <div className="cart-summary__totals">
        <div>Subtotal: <strong>{formatCurrency(totals.subtotal)}</strong></div>
        <div>Impuestos: <strong>{formatCurrency(totals.tax)}</strong></div>
        <div>Envío: <strong>{formatCurrency(totals.shipping)}</strong></div>
        <div>Total: <strong>{formatCurrency(totals.total)}</strong></div>
      </div>
      <button
        type="button"
        className="checkout-button"
        disabled={loading}
        onClick={handleCheckout}
      >
        {loading ? 'Creando pago...' : 'Proceder al pago con Stripe'}
      </button>
    </div>
  );
};

export default CartSummary;
