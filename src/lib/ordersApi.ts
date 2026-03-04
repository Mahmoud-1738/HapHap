import type { CartItem } from "../types/order";

type PersistOrderPayload = {
  orderNumber: string;
  total: number;
  items: CartItem[];
};

type ApiOrderLine = {
  productId: number;
  quantity: number;
  unitPrice: number;
};

const APP_ROUTE_SEGMENTS = new Set(["", "products", "pay", "order-number"]);

function getAppBasePath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && APP_ROUTE_SEGMENTS.has(segments[segments.length - 1])) {
    segments.pop();
  }

  return segments.length === 0 ? "" : `/${segments.join("/")}`;
}

function getOrderApiUrl(): string {
  const configuredApiUrl = import.meta.env.VITE_ORDER_API_URL;
  if (typeof configuredApiUrl === "string" && configuredApiUrl.trim().length > 0) {
    return configuredApiUrl.trim();
  }

  const basePath = getAppBasePath(window.location.pathname);
  return `${basePath}/api/place-order.php`;
}

function toOrderLines(items: CartItem[]): ApiOrderLine[] {
  return items.flatMap((item) => {
    const match = /^product-(\d+)$/.exec(item.id);
    if (!match) {
      return [];
    }

    return [
      {
        productId: Number(match[1]),
        quantity: Math.max(1, Math.floor(item.quantity)),
        unitPrice: item.price,
      },
    ];
  });
}

export async function persistOrderToDatabase(payload: PersistOrderPayload): Promise<boolean> {
  const orderLines = toOrderLines(payload.items);
  if (orderLines.length === 0) {
    return false;
  }

  const response = await fetch(getOrderApiUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderNumber: payload.orderNumber,
      total: payload.total,
      items: orderLines,
    }),
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as { ok?: boolean } | null;
  return result?.ok === true;
}
