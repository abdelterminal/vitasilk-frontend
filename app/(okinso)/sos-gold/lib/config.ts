// Central commercial config — edit prices/contacts here only.
//
// Every price rendered on the page (product card, recap, submit button, mobile
// bar) and the total the order route records are derived from these numbers.

export const PRICE_DH = 397;
export const OLD_PRICE_DH = 550;

// The page sells a single 400g pouch; the forms always order one unit.
export const ORDER_QTY = 1;

// Not present in the source page — falls back to the shared Vitasilk number.
export const WHATSAPP_NUMBER = "212661086837";

export const PRODUCT_NAME = "Soin Capillaire SOS Gold (400g)";

export type Lang = "fr" | "ar";

/** Hand-rolled grouping (not toLocaleString) to avoid server/client ICU hydration drift. */
const groupDigits = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** "397 DH" in French, "397 درهم" in Arabic — matching the source copy. */
export const formatDh = (amount: number, lang: Lang) =>
  `${groupDigits(amount)} ${lang === "ar" ? "درهم" : "DH"}`;

export const DISCOUNT_PCT = Math.round((1 - PRICE_DH / OLD_PRICE_DH) * 100);

/** "-28%" in French, "خصم 28%" in Arabic. */
export const formatDiscount = (lang: Lang) =>
  lang === "ar" ? `خصم ${DISCOUNT_PCT}%` : `-${DISCOUNT_PCT}%`;
