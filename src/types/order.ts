import type { MenuItem } from "../data/menu";

export type Cart = Record<string, number>;

export type CartItem = MenuItem & {
  quantity: number;
};

export type SubmittedOrder = {
  orderNumber: number;
  languageCode: string;
  itemCount: number;
  total: number;
};
