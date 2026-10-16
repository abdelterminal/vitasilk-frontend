import { PRODUCT_NAME, WHATSAPP_NUMBER, type Lang } from "./config";

export type OrderInput = {
  name: string;
  phone: string;
  city: string;
  address?: string;
  qty: number;
};

/**
 * Sends the order to this page's own API route. Only identity, quantity and
 * language go over the wire — the route recomputes the total from config.
 * Resolves true on success, false on any failure (validation, Sheets outage,
 * network), so the form can show its WhatsApp fallback.
 */
export async function submitOrder(order: OrderInput, lang: Lang): Promise<boolean> {
  try {
    const res = await fetch("/api/landing/protein-collagen/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...order, lang }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export const whatsappHref = (order: OrderInput, total: number) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Bonjour, je souhaite commander : ${PRODUCT_NAME} x${order.qty} (${total} DH)\n` +
      `Nom : ${order.name}\nTéléphone : ${order.phone}\nVille : ${order.city}` +
      (order.address ? `\nAdresse : ${order.address}` : ""),
  )}`;

export const orderErrorText: Record<Lang, { message: string; cta: string }> = {
  fr: {
    message:
      "Votre commande n'a pas pu être enregistrée. Vérifiez votre numéro de téléphone, ou commandez directement sur WhatsApp.",
    cta: "Commander sur WhatsApp",
  },
  ar: {
    message: "تعذر تسجيل طلبكِ. تأكدي من رقم الهاتف، أو اطلبي مباشرة عبر واتساب.",
    cta: "اطلبي عبر واتساب",
  },
};
