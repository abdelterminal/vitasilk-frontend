"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import confetti from "canvas-confetti";
import pouchCutout from "../assets/pouch-cutout.webp";
import { WHATSAPP_NUMBER, type Lang } from "../lib/config";
import type { Translation } from "../lib/translations";

const moroccanCities = [
  "Casablanca", "Rabat", "Marrakech", "Tanger", "Agadir", "Fès",
  "Meknès", "Oujda", "Kénitra", "Tétouan", "Salé", "Mohammédia",
  "El Jadida", "Nador", "Béni Mellal", "Laâyoune", "Dakhla", "Autre ville...",
];

const isValidMoroccanPhone = (raw: string) => /^(?:\+212|0)[5-7]\d{8}$/.test(raw.replace(/[\s-]/g, ""));

// Not in the source page, which had no failure path: shown when the server
// rejects the order, so the customer can still reach us.
const ERRORS = {
  fr: {
    phone: "Veuillez saisir un numéro marocain valide (ex : 0612345678).",
    name: "Veuillez saisir votre nom complet.",
    failed: "L'envoi de votre commande a échoué. Réessayez ou commandez directement sur WhatsApp :",
    whatsapp: "Commander sur WhatsApp",
  },
  ar: {
    phone: "المرجو إدخال رقم هاتف مغربي صحيح (مثال: 0612345678).",
    name: "المرجو إدخال الاسم الكامل.",
    failed: "تعذر إرسال طلبك. حاولي مرة أخرى أو اطلبي مباشرة عبر واتساب :",
    whatsapp: "اطلبي عبر واتساب",
  },
};

type FormState = { fullName: string; phone: string; city: string; address: string; notes: string };

const emptyForm: FormState = { fullName: "", phone: "", city: "Casablanca", address: "", notes: "" };

export default function OrderFormSection({ t, lang }: { t: Translation; lang: Lang }) {
  const o = t.order;
  const e = ERRORS[lang] || ERRORS.fr;
  const [selectedPackIndex, setSelectedPackIndex] = useState(0); // Default 1 pack
  const [formData, setFormData] = useState<FormState>(emptyForm);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showWhatsapp, setShowWhatsapp] = useState(false);

  const selectedPack = o.packs[selectedPackIndex] || o.packs[0];

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (ev: FormEvent) => {
    ev.preventDefault();
    if (submitting) return;
    setErrorMsg(null);
    setShowWhatsapp(false);

    if (formData.fullName.trim().length < 3) {
      setErrorMsg(e.name);
      return;
    }
    if (!isValidMoroccanPhone(formData.phone)) {
      setErrorMsg(e.phone);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/landing/sos-therapy/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName.trim(),
          phone: formData.phone.trim(),
          city: formData.city,
          address: formData.address.trim(),
          offer: String(selectedPack.id),
          qty: 1,
          lang,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
    } catch {
      setSubmitting(false);
      setErrorMsg(e.failed);
      setShowWhatsapp(true);
      return;
    }

    // Trigger celebratory confetti
    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    } catch {
      // purely decorative
    }

    setSubmitting(false);
    setOrderSubmitted(true);
  };

  const handleResetOrder = () => {
    setOrderSubmitted(false);
    setFormData(emptyForm);
  };

  const waMessage = encodeURIComponent(
    `${o.productName} — ${selectedPack.title}\n${formData.fullName}\n${formData.phone}\n${formData.city} — ${formData.address}`,
  );

  return (
    <section className="order-form-section" id="commander">
      <div className="order-form-container">
        {/* Section Header */}
        <div className="order-form-header">
          <span className="order-form-eyebrow">{o.eyebrow}</span>
          <h2 className="order-form-title">{o.title}</h2>
          <p className="order-form-subtitle">{o.subtitle}</p>
        </div>

        <div className="order-form-grid">
          {/* Left Column: Product Showcase & Reassurance */}
          <div className="order-product-col">
            <div className="order-product-card">
              <div className="order-badge-pill">
                <span>{o.badgePill}</span>
              </div>

              <div className="order-product-visual">
                <img src={pouchCutout.src} alt="SOS Hair Therapy Pouch 400g" className="order-product-img" />
              </div>

              <div className="order-product-info">
                <h3 className="order-product-name">{o.productName}</h3>
                <p className="order-product-sub">{o.productSub}</p>

                <div className="order-highlights-list">
                  {o.highlights.map((h, i) => (
                    <div key={i} className="highlight-item">
                      <span className="highlight-icon">✓</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Trust Badges */}
                <div className="order-trust-grid">
                  <div className="trust-item">
                    <div className="trust-icon">🚚</div>
                    <div className="trust-text">
                      <strong>{o.trustFreeShipping}</strong>
                      <span>{o.trustFreeShippingSub}</span>
                    </div>
                  </div>
                  <div className="trust-item">
                    <div className="trust-icon">💵</div>
                    <div className="trust-text">
                      <strong>{o.trustCod}</strong>
                      <span>{o.trustCodSub}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form or Success State */}
          <div className="order-form-col">
            {!orderSubmitted ? (
              <form onSubmit={handleSubmitOrder} className="checkout-form-card">
                {/* 1. Pack Offer Selection */}
                <div className="pack-selection-group">
                  <label className="section-label">
                    <span className="label-num">1</span>
                    <span>{o.step1Label}</span>
                  </label>

                  <div className="pack-options-grid">
                    {o.packs.map((pack, idx) => (
                      <div
                        key={pack.id}
                        className={`pack-option-card ${selectedPackIndex === idx ? "selected" : ""}`}
                        onClick={() => setSelectedPackIndex(idx)}
                      >
                        {pack.badge && <div className="pack-popular-badge">{pack.badge}</div>}
                        <div className="pack-radio-circle">
                          {selectedPackIndex === idx && <div className="pack-radio-inner" />}
                        </div>
                        <div className="pack-info">
                          <strong className="pack-title">{pack.title}</strong>
                          <span className="pack-tag">{pack.tag}</span>
                          {pack.gift && <span className="pack-gift">{pack.gift}</span>}
                        </div>
                        <div className="pack-pricing">
                          <span className="pack-price">{pack.price} DH</span>
                          <span className="pack-old-price">{pack.oldPrice} DH</span>
                          <span className="pack-savings">{pack.savings}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Customer Contact Inputs */}
                <div className="form-fields-group">
                  <label className="section-label">
                    <span className="label-num">2</span>
                    <span>{o.step2Label}</span>
                  </label>

                  <div className="input-field-wrapper">
                    <span className="input-icon">👤</span>
                    <input
                      type="text"
                      name="fullName"
                      placeholder={o.namePlaceholder}
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="checkout-input"
                    />
                  </div>

                  <div className="input-field-wrapper">
                    <span className="input-icon">📱</span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder={o.phonePlaceholder}
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="checkout-input"
                    />
                  </div>

                  <div className="input-row-split">
                    <div className="input-field-wrapper flex-1">
                      <span className="input-icon">🏙️</span>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="checkout-input checkout-select"
                        required
                      >
                        {moroccanCities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="input-field-wrapper flex-2">
                      <span className="input-icon">📍</span>
                      <input
                        type="text"
                        name="address"
                        placeholder={o.addressPlaceholder}
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="checkout-input"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Order Summary & Submit Button */}
                <div className="order-summary-box">
                  <div className="summary-row">
                    <span>{o.summaryChosen}</span>
                    <strong>{selectedPack.title}</strong>
                  </div>
                  <div className="summary-row">
                    <span>{o.summaryShipping}</span>
                    <span className="free-shipping-tag">{o.freeTag}</span>
                  </div>
                  <div className="summary-divider" />
                  <div className="summary-row total-row">
                    <span>{o.summaryTotal}</span>
                    <span className="final-total">{selectedPack.price} DH</span>
                  </div>
                </div>

                {errorMsg && (
                  <div
                    role="alert"
                    style={{
                      marginBottom: 14,
                      padding: "12px 14px",
                      borderRadius: 12,
                      background: "#fdecee",
                      border: "1px solid #f3c2ca",
                      color: "#7a2032",
                      fontSize: 14,
                      lineHeight: 1.5,
                    }}
                  >
                    <p>{errorMsg}</p>
                    {showWhatsapp && (
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          marginTop: 10,
                          padding: "10px 18px",
                          borderRadius: 9999,
                          background: "#25D366",
                          color: "#fff",
                          fontWeight: 700,
                          textDecoration: "none",
                        }}
                      >
                        {e.whatsapp}
                      </a>
                    )}
                  </div>
                )}

                <button type="submit" disabled={submitting} className="btn-submit-order">
                  {submitting ? (
                    <span>{o.submittingBtn}</span>
                  ) : (
                    <>
                      <span>{o.submitBtn}</span>
                      <span className="btn-arrow-icon">➔</span>
                    </>
                  )}
                </button>

                <div className="form-guarantee-footer">
                  <span>{o.securityNote}</span>
                </div>
              </form>
            ) : (
              /* Success Confirmation Card */
              <div className="order-success-card">
                <div className="success-icon-circle">✓</div>
                <h3 className="success-title">{o.successTitle}</h3>
                <p className="success-subtitle">{o.successSubtitle}</p>

                <div className="success-order-recap">
                  <div className="recap-row">
                    <span>{o.recapPack}</span>
                    <strong>{selectedPack.title}</strong>
                  </div>
                  <div className="recap-row">
                    <span>{o.recapTotal}</span>
                    <strong>{selectedPack.price} DH</strong>
                  </div>
                  <div className="recap-row">
                    <span>{o.recapCity}</span>
                    <span>{formData.city}</span>
                  </div>
                  <div className="recap-row">
                    <span>{o.recapPhone}</span>
                    <span>{formData.phone}</span>
                  </div>
                </div>

                <div className="success-callout-note">{o.calloutNote}</div>

                <button type="button" onClick={handleResetOrder} className="btn-new-order">
                  {o.newOrderBtn}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
