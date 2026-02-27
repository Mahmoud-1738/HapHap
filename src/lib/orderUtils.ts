type CartProduct = {
  id: string;
  price: number;
};

export type Cart = Record<string, number>;

export function addItemToCart(cart: Cart, itemId: string): Cart {
  return {
    ...cart,
    [itemId]: (cart[itemId] ?? 0) + 1,
  };
}

export function removeItemFromCart(cart: Cart, itemId: string): Cart {
  const nextQuantity = (cart[itemId] ?? 0) - 1;
  if (nextQuantity <= 0) {
    const nextCart = { ...cart };
    delete nextCart[itemId];
    return nextCart;
  }

  return {
    ...cart,
    [itemId]: nextQuantity,
  };
}

export function deleteItemFromCart(cart: Cart, itemId: string): Cart {
  const nextCart = { ...cart };
  delete nextCart[itemId];
  return nextCart;
}

export function buildCartItems<T extends CartProduct>(
  menuItems: T[],
  cart: Cart,
): Array<T & { quantity: number }> {
  return menuItems.filter((item) => cart[item.id] > 0).map((item) => ({
    ...item,
    quantity: cart[item.id],
  }));
}

export function getSubtotal<T extends { price: number; quantity: number }>(cartItems: T[]): number {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getTotalItems<T extends { quantity: number }>(cartItems: T[]): number {
  return cartItems.reduce((sum, item) => sum + item.quantity, 0);
}

export function createOrderNumber(random = Math.random, timestamp = Date.now()): string {
  const randomPart = Math.floor(random() * 10_000)
    .toString()
    .padStart(4, "0");
  const timePart = (timestamp % 10_000).toString().padStart(4, "0");
  return `${timePart}${randomPart}`;
}
