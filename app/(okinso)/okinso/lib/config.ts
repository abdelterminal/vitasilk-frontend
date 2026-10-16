// Central commercial config — edit prices/contacts here only.
//
// Every price rendered on the page and every total written to the order log is
// derived from these values. The API route imports this same file, so the
// server recomputes totals and never trusts a price sent by the browser.

export const PRICE_DH = 299;
export const OLD_PRICE_DH = 499;

// From the source: ordering more than one pack in the quick-order modal takes
// 10% off every unit. The main form always orders a single pack.
export const MULTI_PACK_DISCOUNT = 0.1;

export const MAX_QTY = 5;

export const PRODUCT_NAME = "Coffret Rituel Complet Okinso® (4 Étapes)";

// The source page has no WhatsApp number; this is the shared Vitasilk line.
export const WHATSAPP_NUMBER = "212661086837";

export type Lang = "fr" | "ar";

/** Total in DH for `qty` packs — the one formula used by client and server. */
export const totalFor = (qty: number) =>
  qty > 1 ? Math.round(PRICE_DH * (1 - MULTI_PACK_DISCOUNT) * qty) : PRICE_DH;

export const oldTotalFor = (qty: number) => OLD_PRICE_DH * qty;
