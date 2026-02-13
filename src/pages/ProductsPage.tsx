import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MenuItem } from "../data/menu";
import { CATEGORIES, formatPrice } from "../data/menu";
import breakfastIcon from "../../assets/images/Breakfast/Morning_Boost.webp";
import drinkIcon from "../../assets/images/Breakfast/Overnight_Oats.webp";
import etenIcon from "../../assets/images/Lunch&Dinner/Warm_Teriyaki_Tempeh_Bowl.webp";
import gebakIcon from "../../assets/images/Breakfast/Peanut_Butter&Cacao_Toast.webp";

type ProductsPageProps = {
  menuItems: MenuItem[];
  cart: Record<string, number>;
  total: number;
  totalItems: number;
  onAddItem: (itemId: string) => void;
  onStartOver: () => void;
};

const SIDE_MENU = [
  { label: "HAPPY DAYS", icon: breakfastIcon, category: "Ontbijt" as const },
  { label: "KOFFIE", icon: drinkIcon, category: "Drinken" as const },
  { label: "ETEN", icon: etenIcon, category: "Lunch & Dinner" as const },
  { label: "GEBAK", icon: gebakIcon, category: "Handhelds" as const },
  { label: "DRINKEN", icon: drinkIcon, category: "Drinken" as const },
];

function ProductsPage({ menuItems, cart, total, totalItems, onAddItem, onStartOver }: ProductsPageProps) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  const filteredItems = useMemo(
    () => menuItems.filter((item) => item.category === selectedCategory),
    [menuItems, selectedCategory],
  );

  return (
    <main className="products-screen">
      <header className="products-header">
        <button
          type="button"
          className="logo-pill"
          aria-label="Terug naar start"
          onClick={() => {
            onStartOver();
            navigate("/");
          }}
        >
          HH
        </button>
        <button type="button" className="logo-pill logo-pill--tiny" aria-label="Merkicoon">
          HH
        </button>
        <div className="products-header__title">
          <h1>HAPPY HERBIVORE</h1>
          <p>Healthy menu</p>
        </div>
      </header>

      <section className="products-content">
        <aside className="category-rail">
          {SIDE_MENU.map((entry) => {
            const isActive = selectedCategory === entry.category;
            return (
              <button
                key={`${entry.label}-${entry.category}`}
                type="button"
                className={isActive ? "category-rail__item category-rail__item--active" : "category-rail__item"}
                onClick={() => setSelectedCategory(entry.category)}
              >
                <img src={entry.icon} alt={entry.label} className="category-rail__icon" />
                <span>{entry.label}</span>
              </button>
            );
          })}
          <button type="button" className="category-rail__checkout" onClick={() => navigate("/pay")}>
            CONTINU
          </button>
        </aside>

        <section className="product-grid">
          {filteredItems.map((item) => (
            <article key={item.id} className="product-card">
              <img src={item.image} alt={item.name} className="product-card__image" />
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <div className="product-card__footer">
                <strong>vanaf {formatPrice(item.price)}</strong>
                <button type="button" className="add-circle" onClick={() => onAddItem(item.id)}>
                  +
                </button>
              </div>
              {(cart[item.id] ?? 0) > 0 && <span className="qty-pill">{cart[item.id]}</span>}
            </article>
          ))}
        </section>
      </section>

      <footer className="products-footer">
        <strong>{formatPrice(total)}</strong>
        <button
          type="button"
          className="btn btn--primary"
          disabled={totalItems === 0}
          onClick={() => navigate("/pay")}
        >
          Winkelwagen
        </button>
      </footer>
    </main>
  );
}

export default ProductsPage;
