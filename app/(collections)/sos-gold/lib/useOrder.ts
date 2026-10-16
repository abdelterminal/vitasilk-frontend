"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { ORDER_QTY, PRICE_DH, PRODUCT_NAME, WHATSAPP_NUMBER, formatDh, type Lang } from "./config";

export type OrderFields = { name: string; phone: string; address: string; city: string };
export type OrderStatus = "idle" | "sending" | "success" | "error";

const isValidMoroccanPhone = (raw: string) =>
  /^(?:\+212|0)[5-7]\d{8}$/.test(raw.replace(/[\s-]/g, ""));

/**
 * Shared submit logic for the inline form and the modal: posts to this page's
 * own order route, which recomputes the price server-side and forwards to the
 * Sheet. The client never sends a price.
 */
export function useOrder(lang: Lang, confettiOpts: confetti.Options) {
  const [formData, setFormData] = useState<OrderFields>({ name: "", phone: "", address: "", city: "" });
  const [status, setStatus] = useState<OrderStatus>("idle");
  const [phoneInvalid, setPhoneInvalid] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!isValidMoroccanPhone(formData.phone)) {
      setPhoneInvalid(true);
      return;
    }
    setPhoneInvalid(false);
    setStatus("sending");
    try {
      const res = await fetch("/api/landing/sos-gold/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          qty: ORDER_QTY,
          lang,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      confetti(confettiOpts);
    } catch {
      // Never fall back to a fake success: the customer must know the order
      // didn't go through, and gets the WhatsApp route instead.
      setStatus("error");
    }
  };

  const total = ORDER_QTY * PRICE_DH;
  const { name, city, address } = formData;
  const waMessage = encodeURIComponent(
    lang === "ar"
      ? `سلام، بغيت نطلب ${PRODUCT_NAME} — الكمية: ${ORDER_QTY} — المجموع: ${formatDh(total, lang)}${name ? ` — الاسم: ${name}` : ""}${city ? ` — المدينة: ${city}` : ""}${address ? ` — العنوان: ${address}` : ""}`
      : `Bonjour, je veux commander ${PRODUCT_NAME} — Quantité : ${ORDER_QTY} — Total : ${formatDh(total, lang)}${name ? ` — Nom : ${name}` : ""}${city ? ` — Ville : ${city}` : ""}${address ? ` — Adresse : ${address}` : ""}`
  );
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  const reset = () => {
    setStatus("idle");
  };

  return { formData, setFormData, status, phoneInvalid, submit, whatsappHref, reset };
}
