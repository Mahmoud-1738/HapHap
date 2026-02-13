import { useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MENU_ITEMS } from "./data/menu";
import IdlePage from "./pages/IdlePage";
import OrderNumberPage from "./pages/OrderNumberPage";
import PayPage from "./pages/PayPage";
import ProductsPage from "./pages/ProductsPage";
import type { Cart, CartItem, SubmittedOrder } from "./types/order";

function App() {
  const [cart, setCart] = useState<Cart>({});
  const [languageCode, setLanguageCode] = useState("nl");
  const [lastOrder, setLastOrder] = useState<SubmittedOrder | null>(null);

  const cartItems = useMemo<CartItem[]>(
    () =>
      MENU_ITEMS.filter((item) => cart[item.id] > 0).map((item) => ({
        ...item,
        quantity: cart[item.id],
      })),
    [cart],
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );
  const total = subtotal;
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const addItem = (itemId: string) => {
    setCart((current) => ({
      ...current,
      [itemId]: (current[itemId] ?? 0) + 1,
    }));
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
  };

  const deleteItem = (itemId: string) => {
    setCart((current) => {
      const { [itemId]: _, ...rest } = current;
      return rest;
    });
  };

  const clearOrderDraft = () => {
    setCart({});
  };

  const startOrder = (selectedLanguageCode: string) => {
    setLanguageCode(selectedLanguageCode);
    clearOrderDraft();
    setLastOrder(null);
  };

  const placeOrder = () => {
    if (totalItems === 0) {
      return null;
    }

    const orderNumber = Math.floor(10 + Math.random() * 90);
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
        <Route path="/" element={<IdlePage onStartOrder={startOrder} />} />
        <Route
          path="/products"
          element={
            <ProductsPage
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
          element={<OrderNumberPage order={lastOrder} onStartNewOrder={cancelOrder} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
