// Central commercial config — edit prices/contacts here only.
//
// Every price rendered on the page (translations, order summary) and the total
// the API route records are derived from these values, so they can't desync.

export type Lang = "fr" | "ar";

export const PRICE_DH = 649;
export const OLD_PRICE_DH = 890;

export const PRODUCT_NAME = "Pack complet CRYSTAL® (Shampoo + Masque + Sérum)";

// The source page had no WhatsApp number of its own; this is the range default.
export const WHATSAPP_NUMBER = "212661086837";

/**
 * Offer tiers selectable in the order form. The source sells a single pack;
 * `qty` is the number of packs the tier contains.
 */
export const OFFERS = {
  pack_complet: { label: "Pack complet — Shampoo + Masque + Sérum", qty: 1, price: PRICE_DH, oldPrice: OLD_PRICE_DH },
} as const;

export type OfferId = keyof typeof OFFERS;

export const DEFAULT_OFFER: OfferId = "pack_complet";

export const isOfferId = (v: unknown): v is OfferId =>
  typeof v === "string" && Object.prototype.hasOwnProperty.call(OFFERS, v);

const groupDigits = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** "649 DH" in French, "649 د.م" in Arabic — matches the source copy. */
export const formatDh = (amount: number, lang: Lang) =>
  `${groupDigits(amount)} ${lang === "ar" ? "د.م" : "DH"}`;
