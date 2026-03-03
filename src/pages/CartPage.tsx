import React from 'react';
import './CartPage.css';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface ExtraItem {
  id: string;
  name: string;
  price: number;
}

interface CartPageProps {
  cartItems: CartItem[];
  extraItems: ExtraItem[];
  total: number;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onDelete: (id: string) => void;
  onAddExtra: (id: string) => void;
  onCancel: () => void;
  onPay: () => void;
}

const CartPage: React.FC<CartPageProps> = ({
  cartItems,
  extraItems,
  total,
  onAdd,
  onRemove,
  onDelete,
  onAddExtra,
  onCancel,
  onPay,
}) => {
  return (
    <div className="cart-page">
      <header className="cart-header">
        <button className="cart-back-btn">←</button>
        <span className="cart-title">UW WINKELWAGEN</span>
        <span className="cart-total">€ {total.toFixed(2)}</span>
      </header>
      <section className="cart-extras">
        <span className="cart-extras-title">🏠 SNELLE EXTRA'S</span>
        <div className="cart-extras-list">
          {extraItems.map((item) => (
            <div className="cart-extra-card" key={item.id}>
              <span>{item.name}</span>
              <span className="cart-extra-price">€ {item.price.toFixed(2)}</span>
              <button className="cart-extra-add" onClick={() => onAddExtra(item.id)}>+</button>
            </div>
          ))}
        </div>
      </section>
      <section className="cart-items-list">
        {cartItems.map((item) => (
          <div className="cart-item-card" key={item.id}>
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-info">
              <span className="cart-item-name">{item.name}</span>
              <span className="cart-item-price">€ {item.price.toFixed(2)}</span>
            </div>
            <div className="cart-item-qty">
              <button className="cart-item-minus" onClick={() => onRemove(item.id)}>-</button>
              <span className="cart-item-qty-value">{item.quantity}</span>
              <button className="cart-item-plus" onClick={() => onAdd(item.id)}>+</button>
            </div>
            <button className="cart-item-delete" onClick={() => onDelete(item.id)}>×</button>
          </div>
        ))}
      </section>
      <footer className="cart-footer">
        <button className="cart-cancel-btn" onClick={onCancel}>×  ANNULEER</button>
        <button className="cart-pay-btn" onClick={onPay}>BETALEN € {total.toFixed(2)}</button>
      </footer>
    </div>
  );
};

export default CartPage;
