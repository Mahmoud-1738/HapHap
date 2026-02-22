import { useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MENU_ITEMS } from "./data/menu";
import { DEFAULT_LANGUAGE } from "./i18n";
import type { LanguageCode } from "./i18n";
import {
  addItemToCart,
  buildCartItems,
  createOrderNumber,
  deleteItemFromCart,
  getSubtotal,
  getTotalItems,
  removeItemFromCart,
} from "./lib/orderUtils";
import IdlePage from "./pages/IdlePage";
import OrderNumberPage from "./pages/OrderNumberPage";
import PayPage from "./pages/PayPage";
import ProductsPage from "./pages/ProductsPage";
import type { Cart, CartItem, SubmittedOrder } from "./types/order";

function App() {
  const [cart, setCart] = useState<Cart>({});
  const [languageCode, setLanguageCode] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [lastOrder, setLastOrder] = useState<SubmittedOrder | null>(null);

  const cartItems = useMemo<CartItem[]>(() => buildCartItems(MENU_ITEMS, cart), [cart]);

  const subtotal = useMemo(() => getSubtotal(cartItems), [cartItems]);
  const total = subtotal;
  const totalItems = useMemo(() => getTotalItems(cartItems), [cartItems]);

  const addItem = (itemId: string) => {
    setCart((current) => addItemToCart(current, itemId));
  };

  const removeItem = (itemId: string) => {
    setCart((current) => removeItemFromCart(current, itemId));
  };

  const deleteItem = (itemId: string) => {
    setCart((current) => deleteItemFromCart(current, itemId));
  };

  const clearOrderDraft = () => {
    setCart({});
  };

  const startOrder = (selectedLanguageCode: LanguageCode) => {
    setLanguageCode(selectedLanguageCode);
    clearOrderDraft();
    setLastOrder(null);
  };

  const placeOrder = () => {
    if (totalItems === 0) {
      return null;
    }

    const orderNumber = createOrderNumber();
    const submittedOrder: SubmittedOrder = {
      orderNumber,
      languageCode,
      itemCount: totalItems,
      total,
    };

    setLastOrder(submittedOrder);
    clearOrderDraft();
    return orderNumber;
  };

  const cancelOrder = () => {
    clearOrderDraft();
    setLastOrder(null);
  };

  return (
    <div className="kiosk-app">
      <Routes>
        <Route path="/" element={<IdlePage languageCode={languageCode} onStartOrder={startOrder} />} />
        <Route
          path="/products"
          element={
            <ProductsPage
              languageCode={languageCode}
              menuItems={MENU_ITEMS}
              cart={cart}
              total={total}
              totalItems={totalItems}
              onAddItem={addItem}
              onStartOver={cancelOrder}
            />
          }
        />
        <Route
          path="/pay"
          element={
            <PayPage
              languageCode={languageCode}
              cartItems={cartItems}
              total={total}
              onAddItem={addItem}
              onRemoveItem={removeItem}
              onDeleteItem={deleteItem}
              onCancelOrder={cancelOrder}
              onPlaceOrder={placeOrder}
            />
          }
        />
        <Route
          path="/order-number"
          element={
            <OrderNumberPage
              languageCode={languageCode}
              order={lastOrder}
              onStartNewOrder={cancelOrder}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
