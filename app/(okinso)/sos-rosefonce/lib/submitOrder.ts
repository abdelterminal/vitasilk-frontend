import { OFFERS, PRODUCT_NAME, WHATSAPP_NUMBER, type Lang, type OfferId } from "./config";

export type OrderFields = { name: string; phone: string; city: string; address: string };

export const isValidMoroccanPhone = (raw: string) =>
  /^(?:\+212|0)[5-7]\d{8}$/.test(raw.replace(/[\s-]/g, ""));

/**
 * Posts the order to this page's own API route. The total is recomputed on the
 * server from lib/config.ts, so no price is sent from the browser.
 */
export async function submitOrder(fields: OrderFields, offer: OfferId, lang: Lang, source: string) {
  try {
    const res = await fetch("/api/landing/sos-rosefonce/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fields.name.trim(),
        phone: fields.phone.trim(),
        city: fields.city.trim(),
        address: fields.address.trim(),
        qty: OFFERS[offer].qty,
        offer,
        lang,
        source,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** WhatsApp fallback link shown when the order could not be recorded. */
export function whatsappOrderLink(fields: OrderFields, offer: OfferId, lang: Lang) {
  const { price } = OFFERS[offer];
  const text =
    lang === "ar"
      ? `سلام، بغيت نطلب ${PRODUCT_NAME} — المجموع: ${price} درهم${fields.name ? ` — الاسم: ${fields.name}` : ""}${fields.city ? ` — المدينة: ${fields.city}` : ""}${fields.address ? ` — العنوان: ${fields.address}` : ""}`
      : `Bonjour, je veux commander ${PRODUCT_NAME} — Total : ${price} DH${fields.name ? ` — Nom : ${fields.name}` : ""}${fields.city ? ` — Ville : ${fields.city}` : ""}${fields.address ? ` — Adresse : ${fields.address}` : ""}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
