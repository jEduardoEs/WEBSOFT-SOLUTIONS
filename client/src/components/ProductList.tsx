import useProducts from '../hooks/useProducts';
import useCartStore from '../store/cartStore';
import { selectCartItems } from '../store/cartStore';
import { formatCurrency } from '../utils/pricing';

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore(selectCartItems);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p className="status-banner error">{error}</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => {
        const inCart = cartItems.find((item) => item.id === product.id)?.quantity ?? 0;
        return (
          <article key={product.id} className="product-card">
            <img src={product.image ?? 'https://via.placeholder.com/200'} alt={product.title} loading="lazy" />
            <h3>{product.title}</h3>
            <p>{formatCurrency(product.price)}</p>
            {product.category ? (
              <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>{product.category}</p>
            ) : null}
            <button type="button" onClick={() => addItem(product)}>
              Agregar al carrito {inCart > 0 ? `(${inCart})` : ''}
            </button>
          </article>
        );
      })}
    </div>
  );
};

export default ProductList;
