// Central commercial config — edit prices/contacts here only.
//
// Every price shown on the page (offer cards, submit buttons, sticky bar,
// success summary) and the total the order API records derive from OFFERS, so
// a price change here can never desync the copy from what the customer pays.

export const PRODUCT_NAME = "SOS Rose Foncé";

// Value of the Sheet's "Source" column. The shared Apps Script's
// normalizeProductName() files anything containing "sos rose" under "SOS Rose".
export const SHEETS_SOURCE = "Landing Page SOS Rose Foncé";

export const WHATSAPP_NUMBER = "212661086837";

export type OfferId = "pack1";

export const OFFERS: Record<OfferId, { qty: number; price: number; oldPrice: number; label: string }> = {
  pack1: { qty: 1, price: 347, oldPrice: 380, label: "1 Sachet SOS Soin Capillaire (600g)" },
};

export const DEFAULT_OFFER: OfferId = "pack1";

export const PRICE_DH = OFFERS.pack1.price;
export const OLD_PRICE_DH = OFFERS.pack1.oldPrice;

export const isOfferId = (v: unknown): v is OfferId =>
  typeof v === "string" && Object.prototype.hasOwnProperty.call(OFFERS, v);

export type Lang = "fr" | "ar";
