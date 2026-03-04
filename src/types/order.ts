import type { MenuItem } from "../data/menu";
import type { LanguageCode } from "../i18n";

export type Cart = Record<string, number>;

export type CartItem = MenuItem & {
  quantity: number;
};

export type SubmittedOrderLine = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type SubmittedOrder = {
  orderNumber: string;
  languageCode: LanguageCode;
  itemCount: number;
  total: number;
  createdAt: string;
  items: SubmittedOrderLine[];
};
