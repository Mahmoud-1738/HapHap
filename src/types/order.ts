import type { MenuItem } from "../data/menu";
import type { LanguageCode } from "../i18n";

export type Cart = Record<string, number>;

export type CartItem = MenuItem & {
  quantity: number;
};

export type SubmittedOrder = {
  orderNumber: string;
  languageCode: LanguageCode;
  itemCount: number;
  total: number;
};
