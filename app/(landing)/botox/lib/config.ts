// Central commercial config — edit prices/contacts here only.
export const PRICE_DH = 649;
export const OLD_PRICE_DH = 1149;

// TODO: replace with the real WhatsApp number (international format, no +)
export const WHATSAPP_NUMBER = "212600000000";

export const PRODUCT_NAME = "Vitasilk Botox Capillaire 1000ml";

export type Lang = "ar" | "fr";

/**
 * Group thousands with a narrow no-break space.
 *
 * Hand-rolled rather than `toLocaleString` on purpose: ICU data can differ
 * between the Node server and the browser, which produces a hydration mismatch
 * on a string that renders inside the first viewport.
 */
const groupDigits = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/**
 * "649 DH" in French, "649 درهم" in Arabic.
 *
 * The currency has to travel with the number. Rendering a bare `… DH` suffix in
 * an RTL paragraph made the browser reorder it to "DH 649", which is what the
 * copy review flagged on the order form.
 */
export const formatDh = (amount: number, lang: Lang) =>
  `${groupDigits(amount)} ${lang === "ar" ? "درهم" : "DH"}`;
