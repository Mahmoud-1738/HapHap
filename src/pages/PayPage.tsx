import { Navigate, useNavigate } from "react-router-dom";
import { formatPrice } from "../data/menu";
import type { CartItem } from "../types/order";

type PayPageProps = {
  cartItems: CartItem[];
  total: number;
  onAddItem: (itemId: string) => void;
  onRemoveItem: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
  onCancelOrder: () => void;
  onPlaceOrder: () => number | null;
};

function PayPage({
  cartItems,
  total,
  onAddItem,
  onRemoveItem,
  onDeleteItem,
  onCancelOrder,
  onPlaceOrder,
}: PayPageProps) {
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return <Navigate to="/products" replace />;
  }

  const payOrder = () => {
    const orderNumber = onPlaceOrder();
    if (orderNumber !== null) {
      navigate("/order-number");
    }
  };

  const cancelOrder = () => {
    onCancelOrder();
    navigate("/");
  };

  return (
    <main className="cart-screen">
      <header className="cart-screen__header">
        <button type="button" className="circle-nav" onClick={() => navigate("/products")}>
          <span className="circle-nav__arrow" aria-hidden="true">
            &lt;
          </span>
          <span>Terug</span>
        </button>
        <h1>UW WINKELWAGEN</h1>
        <strong>{formatPrice(total)}</strong>
      </header>

      <section className="cart-list">
        {cartItems.map((item) => (
          <article key={item.id} className="cart-row">
            <img src={item.image} alt={item.name} className="cart-row__image" />
            <div className="cart-row__info">
              <h2>{item.name}</h2>
              <p>{formatPrice(item.price)}</p>
            </div>
            <div className="cart-row__controls">
              <button type="button" className="round-control round-control--minus" onClick={() => onRemoveItem(item.id)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button type="button" className="round-control round-control--plus" onClick={() => onAddItem(item.id)}>
                +
              </button>
              <button type="button" className="remove-control" onClick={() => onDeleteItem(item.id)}>
                x
              </button>
            </div>
          </article>
        ))}
      </section>

      <footer className="cart-screen__footer">
        <button type="button" className="cancel-btn" onClick={cancelOrder}>
          x ANNULEREN
        </button>
        <button type="button" className="pay-btn" onClick={payOrder}>
          BETALEN {formatPrice(total)}
        </button>
      </footer>
    </main>
  );
}

export default PayPage;
