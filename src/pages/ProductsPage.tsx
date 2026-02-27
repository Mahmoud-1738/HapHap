import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Category, MenuItem } from "../data/menu";
import { CATEGORIES, formatPrice } from "../data/menu";
import { getUiText } from "../i18n";
import type { LanguageCode } from "../i18n";
import breakfastIcon from "../../assets/images/Breakfast/Morning_Boost.webp";
import drinkIcon from "../../assets/images/Breakfast/Overnight_Oats.webp";
import etenIcon from "../../assets/images/Lunch&Dinner/Warm_Teriyaki_Tempeh_Bowl.webp";
import gebakIcon from "../../assets/images/Breakfast/Peanut_Butter&Cacao_Toast.webp";
import brandLogo from "../../assets/disgen/logo.webp";

type ProductsPageProps = {
  languageCode: LanguageCode;
  menuItems: MenuItem[];
  cart: Record<string, number>;
  total: number;
  totalItems: number;
  onAddItem: (itemId: string) => void;
  onStartOver: () => void;
};

const CATEGORY_ICONS: Record<Category, string> = {
  Ontbijt: breakfastIcon,
  "Lunch & Dinner": etenIcon,
  Handhelds: gebakIcon,
  Drinken: drinkIcon,
};

function ProductsPage({
  languageCode,
  menuItems,
  cart,
  total,
  totalItems,
  onAddItem,
  onStartOver,
}: ProductsPageProps) {
  const navigate = useNavigate();
  const text = getUiText(languageCode);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  const filteredItems = useMemo(
    () => menuItems.filter((item) => item.category === selectedCategory && !item.isCartAddon),
    [menuItems, selectedCategory],
  );

  return (
    <main className="products-screen">
      <header className="products-header">
        <button
          type="button"
          className="logo-pill logo-pill--back"
          aria-label={text.products.backToStartAria}
          onClick={() => {
            onStartOver();
            navigate("/");
          }}
        >
          <span className="logo-pill__arrow" aria-hidden="true">
            &lt;
          </span>
          <span>{text.pay.back}</span>
        </button>
        <span className="logo-pill logo-pill--tiny" role="img" aria-label={text.products.brandIconAria}>
          <img src={brandLogo} alt="" className="logo-pill__image" />
        </span>
        <div className="products-header__title">
          <h1>HAPPY HERBIVORE</h1>
          <p>{text.products.healthyMenu}</p>
        </div>
      </header>

      <section className="products-content">
        <aside className="category-rail">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                className={isActive ? "category-rail__item category-rail__item--active" : "category-rail__item"}
                onClick={() => setSelectedCategory(category)}
              >
                <img
                  src={CATEGORY_ICONS[category]}
                  alt={text.products.categoryLabels[category]}
                  className="category-rail__icon"
                />
                <span>{text.products.categoryLabels[category]}</span>
              </button>
            );
          })}
          <button type="button" className="category-rail__checkout" onClick={() => navigate("/pay")}>
            {text.products.continueButton}
          </button>
        </aside>

        <section className="product-grid">
          {filteredItems.map((item) => (
            <article key={item.id} className="product-card">
              <img src={item.image} alt={item.name} className="product-card__image" />
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <span className="product-card__kcal">{item.kcal} kcal</span>
              <div className="product-card__footer">
                <strong>
                  {formatPrice(item.price, languageCode)}
                </strong>
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
        <strong>{formatPrice(total, languageCode)}</strong>
        <button
          type="button"
          className="btn btn--primary"
          disabled={totalItems === 0}
          onClick={() => navigate("/pay")}
        >
          {text.products.cartButton}
        </button>
      </footer>
    </main>
  );
}

export default ProductsPage;
