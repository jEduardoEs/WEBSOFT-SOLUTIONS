import ProductList from '../components/ProductList';
import CartSummary from '../components/CartSummary';
import useCartStore, { selectCartCount } from '../store/cartStore';

const HomePage = () => {
  const itemCount = useCartStore(selectCartCount);

  return (
    <div className="app-container">
      <header>
        <div>
          <h1>Tienda jEduardoEs</h1>
          <p style={{ color: '#6b7280' }}>
            Descubre productos y paga con Stripe en modo de prueba.
          </p>
        </div>
        <div>
          <strong>{itemCount}</strong> productos en carrito
        </div>
      </header>
      <ProductList />
      <CartSummary />
    </div>
  );
};

export default HomePage;
