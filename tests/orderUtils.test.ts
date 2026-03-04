import assert from "node:assert/strict";
import test from "node:test";
import {
  addItemToCart,
  buildCartItems,
  type Cart,
  createOrderNumber,
  deleteItemFromCart,
  getSubtotal,
  getTotalItems,
  resetOrderNumberCounter,
  removeItemFromCart,
} from "../src/lib/orderUtils.js";

test("addItemToCart increments existing quantity", () => {
  const cart: Cart = { soup: 1 };
  const next = addItemToCart(cart, "soup");

  assert.deepEqual(next, { soup: 2 });
});

test("removeItemFromCart decrements quantity and removes empty items", () => {
  const decremented = removeItemFromCart({ soup: 3 }, "soup");
  const removed = removeItemFromCart({ soup: 1, tea: 2 }, "soup");

  assert.deepEqual(decremented, { soup: 2 });
  assert.deepEqual(removed, { tea: 2 });
});

test("deleteItemFromCart always removes selected item id", () => {
  const next = deleteItemFromCart({ soup: 2, tea: 1 }, "tea");

  assert.deepEqual(next, { soup: 2 });
});

test("buildCartItems and cart totals only include selected menu items", () => {
  const menu = [
    { id: "soup", price: 4.5, name: "Soup" },
    { id: "tea", price: 2.2, name: "Tea" },
    { id: "salad", price: 7.1, name: "Salad" },
  ];

  const cartItems = buildCartItems(menu, { soup: 2, salad: 1 });

  assert.deepEqual(cartItems, [
    { id: "soup", price: 4.5, name: "Soup", quantity: 2 },
    { id: "salad", price: 7.1, name: "Salad", quantity: 1 },
  ]);
  assert.equal(getSubtotal(cartItems), 16.1);
  assert.equal(getTotalItems(cartItems), 3);
});

test("createOrderNumber starts at 0 and increments by 1", () => {
  resetOrderNumberCounter(0);

  assert.equal(createOrderNumber(), "0");
  assert.equal(createOrderNumber(), "1");
  assert.equal(createOrderNumber(), "2");
});
