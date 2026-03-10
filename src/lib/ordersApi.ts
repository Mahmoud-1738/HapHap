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

let lastOrderApiError = "Onbekende fout.";

const APP_ROUTE_SEGMENTS = new Set(["products", "pay", "order-number"]);

function getAppRootPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && segments[segments.length - 1].includes(".")) {
    segments.pop();
  }

  if (segments.length > 0 && APP_ROUTE_SEGMENTS.has(segments[segments.length - 1])) {
    segments.pop();
  }

  if (segments.length > 0 && segments[segments.length - 1] === "dist") {
    segments.pop();
  }

  return segments.length === 0 ? "" : `/${segments.join("/")}`;
}

function getOrderApiUrl(): string {
  const configuredApiUrl = import.meta.env.VITE_ORDER_API_URL;
  if (typeof configuredApiUrl === "string" && configuredApiUrl.trim().length > 0) {
    return configuredApiUrl.trim();
  }

  const appRoot = getAppRootPath(window.location.pathname);
  return `${appRoot}/api/place-order.php`;
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

export function getLastOrderApiError(): string {
  return lastOrderApiError;
}

export async function persistOrderToDatabase(payload: PersistOrderPayload): Promise<boolean> {
  lastOrderApiError = "Onbekende fout.";
  const orderLines = toOrderLines(payload.items);
  if (orderLines.length === 0) {
    lastOrderApiError = "Geen geldige productregels in winkelmand.";
    console.error("Order payload contained no valid product ids.");
    return false;
  }

  try {
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
      const errorText = await response.text();
      lastOrderApiError = `HTTP ${response.status}: ${errorText || "Lege response"}`;
      console.error("Order API request failed.", response.status, errorText);
      return false;
    }

    const result = (await response.json()) as { ok?: boolean; error?: string; details?: string } | null;
    if (result?.ok !== true) {
      lastOrderApiError = result?.details || result?.error || "API gaf geen succes terug.";
      console.error("Order API responded with failure.", result);
      return false;
    }

    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    lastOrderApiError = `Netwerkfout: ${message}`;
    console.error("Order API network/parsing error.", error);
    return false;
  }
}
