// Central commercial config — edit prices/contacts here only.
//
// The translations and the order API both read from here, so a price change
// can never leave the page, the order total and the sheet disagreeing.

export const PRICE_DH = 249;
export const OLD_PRICE_DH = 350;

export const PRODUCT_NAME = "SOS Hair Therapy 400g";

// No number in the source page; this is the range-wide default.
export const WHATSAPP_NUMBER = "212661086837";

export type Lang = "fr" | "ar";

export type Offer = {
  id: string;
  qty: number;
  price: number;
  oldPrice: number;
};

// The source page offers a single pack. Its label/tag copy lives in the
// translations under the same id; price always comes from here.
export const OFFERS: Offer[] = [{ id: "1", qty: 1, price: PRICE_DH, oldPrice: OLD_PRICE_DH }];

export const getOffer = (id: unknown) => OFFERS.find((o) => o.id === String(id));
