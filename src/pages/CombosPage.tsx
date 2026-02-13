import { useMemo, useState } from "react";

type Category = "Breakfast" | "Lunch & Dinner" | "Handhelds" | "Drinks";

type MenuItem = {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
};

const MENU_ITEMS: MenuItem[] = [
  {
    id: "breakfast-wrap",
    name: "Garden Breakfast Wrap",
    category: "Breakfast",
    description: "Tofu scramble, spinach, tomato salsa, and herb aioli.",
    price: 8.5,
  },
  {
    id: "overnight-oats",
    name: "Overnight Oats",
    category: "Breakfast",
    description: "Rolled oats, almond milk, berries, and chia seeds.",
    price: 6.25,
  },
  {
    id: "tempeh-bowl",
    name: "Warm Teriyaki Tempeh Bowl",
    category: "Lunch & Dinner",
    description: "Brown rice, glazed tempeh, cucumber, and sesame greens.",
    price: 12.95,
  },
  {
    id: "falafel-bowl",
    name: "Mediterranean Falafel Bowl",
    category: "Lunch & Dinner",
    description: "Falafel, tabbouleh, hummus, pickled onion, and tahini.",
    price: 11.75,
  },
  {
    id: "bbq-slider",
    name: "Smoky BBQ Jackfruit Slider",
    category: "Handhelds",
    description: "Braised jackfruit, slaw, and chipotle mayo in brioche.",
    price: 7.8,
  },
  {
    id: "hummus-wrap",
    name: "Zesty Chickpea Hummus Wrap",
    category: "Handhelds",
    description: "Roasted peppers, hummus, cucumber ribbons, and rocket.",
    price: 8.9,
  },
  {
    id: "cold-brew",
    name: "House Cold Brew",
    category: "Drinks",
    description: "Slow-brewed coffee, served over ice.",
    price: 3.9,
  },
  {
    id: "green-juice",
    name: "Morning Boost Juice",
    category: "Drinks",
    description: "Apple, kale, cucumber, lemon, and mint.",
    price: 4.75,
  },
];

const CATEGORIES: Array<"All" | Category> = [
  "All",
  "Breakfast",
  "Lunch & Dinner",
  "Handhelds",
  "Drinks",
];

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function CombosPage() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | Category>("All");
  const [customerName, setCustomerName] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [ticketNumber, setTicketNumber] = useState<number | null>(null);

  const filteredItems = useMemo(
    () =>
      selectedCategory === "All"
        ? MENU_ITEMS
        : MENU_ITEMS.filter((item) => item.category === selectedCategory),
    [selectedCategory],
  );

  const cartItems = useMemo(
    () =>
      MENU_ITEMS.filter((item) => cart[item.id] > 0).map((item) => ({
        ...item,
        quantity: cart[item.id],
      })),
    [cart],
  );

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);

  const addItem = (itemId: string) => {
    setCart((current) => ({
      ...current,
      [itemId]: (current[itemId] ?? 0) + 1,
    }));
    setTicketNumber(null);
  };

  const removeItem = (itemId: string) => {
    setCart((current) => {
      const nextQuantity = (current[itemId] ?? 0) - 1;
      if (nextQuantity <= 0) {
        const { [itemId]: _, ...rest } = current;
        return rest;
      }
      return { ...current, [itemId]: nextQuantity };
    });
    setTicketNumber(null);
  };

  const clearOrder = () => {
    setCart({});
    setTicketNumber(null);
    setCustomerName("");
  };

  const placeOrder = () => {
    if (totalItems === 0) {
      return;
    }
    const ticket = Math.floor(100 + Math.random() * 900);
    setTicketNumber(ticket);
    setCart({});
  };

  return (
    <main className="kiosk">
      <header className="kiosk__header">
        <div>
          <p className="kiosk__brand">HapHap Self-Order</p>
          <h1>Build your meal</h1>
        </div>
        <div className="kiosk__badge">{totalItems} item(s)</div>
      </header>

      <section className="kiosk__layout">
        <section className="menu">
          <div className="menu__categories">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={selectedCategory === category ? "chip chip--active" : "chip"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="menu__grid">
            {filteredItems.map((item) => {
              const quantity = cart[item.id] ?? 0;
              return (
                <article key={item.id} className="menu-card">
                  <p className="menu-card__category">{item.category}</p>
                  <h2>{item.name}</h2>
                  <p className="menu-card__description">{item.description}</p>
                  <div className="menu-card__footer">
                    <strong>{formatPrice(item.price)}</strong>
                    {quantity === 0 ? (
                      <button type="button" className="action" onClick={() => addItem(item.id)}>
                        Add
                      </button>
                    ) : (
                      <div className="counter">
                        <button
                          type="button"
                          className="counter__button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove one ${item.name}`}
                        >
                          -
                        </button>
                        <span className="counter__value">{quantity}</span>
                        <button
                          type="button"
                          className="counter__button"
                          onClick={() => addItem(item.id)}
                          aria-label={`Add one ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <aside className="cart">
          <h2>Your order</h2>

          {cartItems.length === 0 ? (
            <p className="cart__empty">Select a menu item to start your order.</p>
          ) : (
            <ul className="cart__list">
              {cartItems.map((item) => (
                <li key={item.id} className="cart__item">
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.quantity} x {formatPrice(item.price)}</p>
                  </div>
                  <strong>{formatPrice(item.quantity * item.price)}</strong>
                </li>
              ))}
            </ul>
          )}

          <label className="cart__field">
            Name (optional)
            <input
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              placeholder="Guest name"
            />
          </label>

          <div className="cart__totals">
            <p>
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </p>
            <p>
              <span>Tax (8%)</span>
              <strong>{formatPrice(tax)}</strong>
            </p>
            <p className="cart__grand-total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </p>
          </div>

          <div className="cart__actions">
            <button type="button" className="ghost" onClick={clearOrder}>
              Clear
            </button>
            <button
              type="button"
              className="checkout"
              onClick={placeOrder}
              disabled={totalItems === 0}
            >
              Place order
            </button>
          </div>

          {ticketNumber !== null && (
            <p className="cart__ticket">
              Order #{ticketNumber} confirmed for {customerName.trim() || "Guest"}.
            </p>
          )}
        </aside>
      </section>
    </main>
  );
}

export default CombosPage;
