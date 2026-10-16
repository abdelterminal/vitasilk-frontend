// Central commercial config — edit prices/contacts here only.
//
// Every price rendered on the page (promo badge, buttons, sticky bar, cart) and
// the total the server records are derived from these numbers, so a price
// change here can never desync the copy or the order sheet.

export const PRICE_DH = 649;
export const OLD_PRICE_DH = 899;

// The page sells a single pack (Trio Royal: shampoo + mask + serum).
export const PACK_TITLE = {
  fr: "Pack Crystal Organic Hair Care (Trio Royal)",
  ar: "باقة كريستال أورجانيك هير كير (التريو الملكي)",
} as const;

export const PRODUCT_NAME = "Crystal Mauve";

// No number in the source page — this is the shared Vitasilk WhatsApp line.
export const WHATSAPP_NUMBER = "212661086837";

export type Lang = "fr" | "ar";

/** "649 DH" in French, "649 درهم" in Arabic. */
export const formatDh = (amount: number, lang: Lang) =>
  `${amount} ${lang === "ar" ? "درهم" : "DH"}`;
