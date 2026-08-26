// Central commercial config — edit prices/contacts here only.
//
// Every price rendered anywhere on the page is derived from these two numbers.
// The dictionaries take a formatted price as an argument rather than hardcoding
// it, so changing the price here can never desync the copy.

export const PRICE_DH = 1499;
export const OLD_PRICE_DH = 2000;

// TODO: replace with the real WhatsApp number (international format, no +)
export const WHATSAPP_NUMBER = "212661086837";

export const PRODUCT_NAME = "Vitasilk 24K Gold 1L";

// TODO: swap for the real domain once this landing page is deployed
export const SITE_URL = "http://localhost:3000";

export type Lang = "ar" | "fr";

/**
 * Group thousands with a narrow no-break space.
 *
 * Hand-rolled rather than `toLocaleString` on purpose: ICU data can differ
 * between the Node server and the browser, which produces a hydration mismatch
 * on a string that renders inside the first viewport.
 */
const groupDigits = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** "1 499 DH" in French, "1 499 درهم" in Arabic. */
export const formatDh = (amount: number, lang: Lang) =>
  `${groupDigits(amount)} ${lang === "ar" ? "درهم" : "DH"}`;

export const DISCOUNT_PCT = Math.round((1 - PRICE_DH / OLD_PRICE_DH) * 100);
