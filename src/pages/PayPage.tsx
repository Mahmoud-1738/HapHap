import { Navigate, useNavigate } from "react-router-dom";
import { formatPrice } from "../data/menu";
import type { MenuItem } from "../data/menu";
import { getUiText } from "../i18n";
import type { LanguageCode } from "../i18n";
import type { CartItem } from "../types/order";

type PayPageProps = {
  languageCode: LanguageCode;
  menuItems: MenuItem[];
  cartItems: CartItem[];
  total: number;
  onAddItem: (itemId: string) => void;
  onRemoveItem: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
  onCancelOrder: () => void;
  onPlaceOrder: () => string | null;
};

function PayPage({
  languageCode,
  menuItems,
  cartItems,
  total,
  onAddItem,
  onRemoveItem,
  onDeleteItem,
  onCancelOrder,
  onPlaceOrder,
}: PayPageProps) {
  const navigate = useNavigate();
  const text = getUiText(languageCode);
  const quickAddItems = menuItems.filter((item) => item.isCartAddon);

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
          <span>{text.pay.back}</span>
        </button>
        <h1>{text.pay.title}</h1>
        <strong>{formatPrice(total, languageCode)}</strong>
      </header>

      <section className="cart-list">
        {quickAddItems.length > 0 && (
          <section className="cart-extras" aria-label={text.pay.quickAddTitle}>
            <h2>{text.pay.quickAddTitle}</h2>
            <div className="cart-extras__list">
              {quickAddItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="cart-extras__item"
                  onClick={() => onAddItem(item.id)}
                  aria-label={text.pay.increaseAria(item.name)}
                >
                  <span>{item.name}</span>
                  <strong>{formatPrice(item.price, languageCode)}</strong>
                  <span className="cart-extras__plus" aria-hidden="true">
                    +
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {cartItems.map((item) => (
          <article key={item.id} className="cart-row">
            <img src={item.image} alt={item.name} className="cart-row__image" />
            <div className="cart-row__info">
              <h2>{item.name}</h2>
              <p>{formatPrice(item.price, languageCode)}</p>
            </div>
            <div className="cart-row__controls">
              <button
                type="button"
                className="round-control round-control--minus"
                onClick={() => onRemoveItem(item.id)}
                aria-label={text.pay.decreaseAria(item.name)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                type="button"
                className="round-control round-control--plus"
                onClick={() => onAddItem(item.id)}
                aria-label={text.pay.increaseAria(item.name)}
              >
                +
              </button>
              <button
                type="button"
                className="remove-control"
                onClick={() => onDeleteItem(item.id)}
                aria-label={text.pay.removeAria(item.name)}
              >
                x
              </button>
            </div>
          </article>
        ))}
      </section>

      <footer className="cart-screen__footer">
        <button type="button" className="cancel-btn" onClick={cancelOrder}>
          x {text.pay.cancel}
        </button>
        <button type="button" className="pay-btn" onClick={payOrder}>
          {text.pay.pay} {formatPrice(total, languageCode)}
        </button>
      </footer>
    </main>
  );
}

export default PayPage;
