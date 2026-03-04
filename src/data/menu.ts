import { getLocaleForLanguage } from "../i18n";
import type { LanguageCode } from "../i18n";
import kioskSql from "../../assets/database/kiosk.sql?raw";

const CATEGORY_ORDER = [
  "Breakfast",
  "Lunch&Dinner",
  "Handhelds",
  "Sides&Small Plates",
  "Signature Dips",
  "Drinks",
] as const;

export type Category = (typeof CATEGORY_ORDER)[number];

export type MenuItem = {
  id: string;
  name: string;
  category: Category;
  description: string;
  kcal: number;
  price: number;
  image: string;
  isCartAddon?: boolean;
};

type SqlScalar = string | number | null;
type SqlRow = Record<string, SqlScalar>;

const CATEGORY_BY_DB_NAME: Record<string, Category> = {
  breakfast: "Breakfast",
  "lunch & dinner": "Lunch&Dinner",
  handhelds: "Handhelds",
  drinks: "Drinks",
  "sides & small plates": "Sides&Small Plates",
  "signature dips": "Signature Dips",
};

const ADDON_CATEGORY_NAMES = new Set(["signature dips"]);
const CATEGORY_BY_FOLDER_TOKEN: Record<string, Category> = {
  breakfast: "Breakfast",
  lunchdinner: "Lunch&Dinner",
  handhelds: "Handhelds",
  sidessmallplates: "Sides&Small Plates",
  signaturedips: "Signature Dips",
  drinks: "Drinks",
};

const imageModules = import.meta.glob(
  [
    "../../assets/images/**/*.webp",
    "../../assets/images/**/*.png",
    "../../assets/images/**/*.jpg",
    "../../assets/images/**/*.jpeg",
  ],
  { eager: true, import: "default" },
) as Record<string, string>;

function normalizeToken(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function decodeMojibake(value: string): string {
  if (!/[ÃÂ]/.test(value)) {
    return value;
  }

  const bytes = Uint8Array.from(value, (character) => character.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

function parseSqlValue(rawValue: string): SqlScalar {
  const value = rawValue.trim();
  if (value.toUpperCase() === "NULL") {
    return null;
  }

  if (value.startsWith("'") && value.endsWith("'")) {
    const content = value.slice(1, -1);
    return decodeMojibake(content.replace(/\\'/g, "'").replace(/''/g, "'").replace(/\\\\/g, "\\"));
  }

  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : value;
}

function parseTuples(valuesBlock: string): SqlScalar[][] {
  const rows: SqlScalar[][] = [];
  let index = 0;

  while (index < valuesBlock.length) {
    if (valuesBlock[index] !== "(") {
      index += 1;
      continue;
    }

    index += 1;
    const fields: SqlScalar[] = [];
    let field = "";
    let inQuotedString = false;

    while (index < valuesBlock.length) {
      const character = valuesBlock[index];
      const nextCharacter = valuesBlock[index + 1];

      if (inQuotedString) {
        field += character;

        if (character === "\\" && nextCharacter !== undefined) {
          field += nextCharacter;
          index += 2;
          continue;
        }

        if (character === "'" && nextCharacter === "'") {
          field += nextCharacter;
          index += 2;
          continue;
        }

        if (character === "'") {
          inQuotedString = false;
        }

        index += 1;
        continue;
      }

      if (character === "'") {
        inQuotedString = true;
        field += character;
        index += 1;
        continue;
      }

      if (character === ",") {
        fields.push(parseSqlValue(field));
        field = "";
        index += 1;
        continue;
      }

      if (character === ")") {
        fields.push(parseSqlValue(field));
        rows.push(fields);
        index += 1;
        break;
      }

      field += character;
      index += 1;
    }
  }

  return rows;
}

function parseInsertRows(sql: string, tableName: string): SqlRow[] {
  const statementPattern = new RegExp(
    `INSERT INTO \\\`${tableName}\\\` \\(([^)]+)\\) VALUES\\s*([\\s\\S]*?);`,
    "g",
  );

  const rows: SqlRow[] = [];
  for (const match of sql.matchAll(statementPattern)) {
    const columns = [...match[1].matchAll(/`([^`]+)`/g)].map((columnMatch) => columnMatch[1]);
    const values = parseTuples(match[2]);

    values.forEach((tuple) => {
      const row: SqlRow = {};
      columns.forEach((column, columnIndex) => {
        row[column] = tuple[columnIndex] ?? null;
      });
      rows.push(row);
    });
  }

  return rows;
}

function toNumber(value: SqlScalar): number | null {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : null;
  }
  return null;
}

function toStringValue(value: SqlScalar): string {
  return typeof value === "string" ? value.trim() : "";
}

type ImageMeta = {
  folderName: string;
  url: string;
};

function buildImageIndex(): Map<string, ImageMeta> {
  const imageIndex = new Map<string, ImageMeta>();

  Object.entries(imageModules).forEach(([path, url]) => {
    const segments = path.split(/[\\/]/);
    const fileName = segments[segments.length - 1];
    const folderName = segments[segments.length - 2] ?? "";
    imageIndex.set(normalizeToken(fileName), { folderName, url });
  });

  return imageIndex;
}

function resolveCategory(dbCategoryName: string): Category | null {
  return CATEGORY_BY_DB_NAME[dbCategoryName.toLowerCase()] ?? null;
}

function resolveCategoryFromFolder(folderName: string): Category | null {
  return CATEGORY_BY_FOLDER_TOKEN[normalizeToken(folderName)] ?? null;
}

function buildMenuItems(): MenuItem[] {
  const categoryRows = parseInsertRows(kioskSql, "categories");
  const imageRows = parseInsertRows(kioskSql, "images");
  const productRows = parseInsertRows(kioskSql, "products");

  const categoriesById = new Map<number, string>();
  categoryRows.forEach((row) => {
    const categoryId = toNumber(row.category_id);
    const categoryName = toStringValue(row.name);
    if (categoryId !== null && categoryName.length > 0) {
      categoriesById.set(categoryId, categoryName);
    }
  });

  const imageFileNamesById = new Map<number, string>();
  imageRows.forEach((row) => {
    const imageId = toNumber(row.image_id);
    const fileName = toStringValue(row.filename);
    if (imageId !== null && fileName.length > 0) {
      imageFileNamesById.set(imageId, fileName);
    }
  });

  const imageIndex = buildImageIndex();
  const fallbackImage = Object.values(imageModules)[0] ?? "";

  return productRows
    .sort((first, second) => (toNumber(first.product_id) ?? 0) - (toNumber(second.product_id) ?? 0))
    .flatMap((row) => {
      const productId = toNumber(row.product_id);
      const categoryId = toNumber(row.category_id);
      const imageId = toNumber(row.image_id);
      const available = toNumber(row.available) ?? 0;
      const name = toStringValue(row.name);
      const price = toNumber(row.price);

      if (productId === null || categoryId === null || price === null || available !== 1 || name.length === 0) {
        return [];
      }

      const dbCategoryName = categoriesById.get(categoryId);
      if (!dbCategoryName) {
        return [];
      }

      const categoryFromDb = resolveCategory(dbCategoryName);
      if (!categoryFromDb) {
        return [];
      }

      const imageFileName = imageId === null ? "" : imageFileNamesById.get(imageId) ?? "";
      const imageKey = normalizeToken(imageFileName);
      const imageMeta = imageIndex.get(imageKey);
      const categoryFromFolder = imageMeta ? resolveCategoryFromFolder(imageMeta.folderName) : null;
      const category = categoryFromFolder ?? categoryFromDb;
      if (!category) {
        return [];
      }

      const image = imageMeta?.url ?? fallbackImage;
      const isCartAddon = ADDON_CATEGORY_NAMES.has(dbCategoryName.toLowerCase());
      const description = toStringValue(row.description);
      const kcal = toNumber(row.kcal) ?? 0;

      return [
        {
          id: `product-${productId}`,
          name,
          category,
          description,
          kcal,
          price,
          image,
          ...(isCartAddon ? { isCartAddon: true } : {}),
        },
      ];
    });
}

export const MENU_ITEMS: MenuItem[] = buildMenuItems();

export const CATEGORIES: Category[] = [...CATEGORY_ORDER];

export function formatPrice(value: number, languageCode: LanguageCode = "nl") {
  return new Intl.NumberFormat(getLocaleForLanguage(languageCode), {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
