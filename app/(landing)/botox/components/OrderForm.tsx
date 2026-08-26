"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "../lib/i18n";
import { Reveal } from "./Reveal";
import { OrnamentFrame } from "./Ornament";
import { PRICE_DH, PRODUCT_NAME, WHATSAPP_NUMBER, formatDh } from "../lib/config";

type FieldErrors = Partial<Record<"name" | "phone" | "city", string>>;

const isValidMoroccanPhone = (raw: string) =>
  /^(?:\+212|0)[5-7]\d{8}$/.test(raw.replace(/[\s-]/g, ""));

export function OrderForm() {
  const { t, lang } = useLang();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [qty, setQty] = useState(1);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const total = qty * PRICE_DH;

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (name.trim().length < 3) next.name = t.form.errors.name;
    if (!isValidMoroccanPhone(phone)) next.phone = t.form.errors.phone;
    if (!city) next.city = t.form.errors.city;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/landing/botox/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, city, qty, total, lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      // a Sheets outage returns 502; keep the lead recoverable via WhatsApp
      setStatus("idle");
    }
  };

  const waMessage = encodeURIComponent(
    lang === "ar"
      ? `سلام، بغيت نطلب ${PRODUCT_NAME} — الكمية: ${qty} — المجموع: ${formatDh(total, lang)}${name ? ` — الاسم: ${name}` : ""}${city ? ` — المدينة: ${city}` : ""}`
      : `Bonjour, je veux commander ${PRODUCT_NAME} — Quantité : ${qty} — Total : ${formatDh(total, lang)}${name ? ` — Nom : ${name}` : ""}${city ? ` — Ville : ${city}` : ""}`
  );

  const inputClass = (error?: string) =>
    `w-full rounded-xl border bg-ink/70 px-4 py-3.5 text-cream placeholder:text-cream-dim/50 outline-none transition focus:border-gold ${
      error ? "border-red-500/70" : "border-gold/25"
    }`;

  return (
    <section id="order" className="mx-auto max-w-2xl scroll-mt-24 px-5 py-20 md:py-28">
      <Reveal className="text-center">
        <h2 className="font-display text-3xl text-cream sm:text-4xl md:text-5xl">{t.form.title}</h2>
        <p className="mx-auto mt-4 max-w-md text-cream-dim">{t.form.subtitle}</p>
      </Reveal>

      <Reveal delay={0.15}>
        <OrnamentFrame className="mt-10 rounded-3xl bg-gradient-to-b from-charcoal to-coal p-7 sm:p-10">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-gold"
                >
                  <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
                <h3 className="font-display text-3xl text-gold-gradient">{t.form.successTitle}</h3>
                <p className="mx-auto mt-3 max-w-sm text-cream-dim">{t.form.successText}</p>
              </motion.div>
            ) : (
              <motion.form key="form" exit={{ opacity: 0, y: -10 }} onSubmit={submit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="order-name" className="mb-1.5 block text-sm text-cream-dim">
                    {t.form.name}
                  </label>
                  <input
                    id="order-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.form.namePh}
                    autoComplete="name"
                    className={inputClass(errors.name)}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="order-phone" className="mb-1.5 block text-sm text-cream-dim">
                    {t.form.phone}
                  </label>
                  <input
                    id="order-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.form.phonePh}
                    inputMode="tel"
                    autoComplete="tel"
                    dir="ltr"
                    className={`${inputClass(errors.phone)} text-start`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="order-city" className="mb-1.5 block text-sm text-cream-dim">
                    {t.form.city}
                  </label>
                  <select
                    id="order-city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={inputClass(errors.city)}
                    required
                  >
                    <option value="" disabled>{t.form.cityPh}</option>
                    {t.form.cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.city && <p className="mt-1 text-xs text-red-400">{errors.city}</p>}
                </div>

                {/* quantity + total */}
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <span className="mb-1.5 block text-sm text-cream-dim">{t.form.qty}</span>
                    <div className="flex items-center rounded-xl border border-gold/25 bg-ink/70">
                      <button
                        type="button"
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        aria-label="-"
                        className="px-4 py-3 text-xl text-gold transition hover:text-gold-light"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-lg text-cream tabular-nums">{qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(Math.min(5, qty + 1))}
                        aria-label="+"
                        className="px-4 py-3 text-xl text-gold transition hover:text-gold-light"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className="block text-sm text-cream-dim">{t.form.total}</span>
                    <span className="font-display text-3xl text-gold-gradient tabular-nums">
                      {formatDh(total, lang)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-deep py-4 text-lg font-semibold text-ink shadow-lg transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60 motion-reduce:transition-none"
                >
                  {status === "sending" ? t.form.sending : t.form.submit}
                </button>

                {/* WhatsApp alternative */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 rounded-full border border-[#25D366]/50 py-3.5 font-medium text-[#4ce280] transition hover:bg-[#25D366]/10"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.62-.93-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.58-.35zM12.05 21.79h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.85 9.85 0 01-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 019.88 9.89c0 5.45-4.43 9.88-9.89 9.88zm8.42-18.3A11.82 11.82 0 0012.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.68 1.45c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.47-8.4z" />
                  </svg>
                  {t.form.whatsapp}
                </a>
              </motion.form>
            )}
          </AnimatePresence>
        </OrnamentFrame>
      </Reveal>
    </section>
  );
}
