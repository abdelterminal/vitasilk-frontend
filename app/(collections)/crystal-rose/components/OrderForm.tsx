"use client";

import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Truck,
  Sparkles,
  Phone,
  User,
  MapPin,
  Mail,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useLanguage } from "../lib/i18n";
import { DEFAULT_OFFER, OFFERS, WHATSAPP_NUMBER, formatDh, isOfferId, type OfferId } from "../lib/config";
import packImg from "../assets/order_pack_hd.webp";

type FormState = {
  fullName: string;
  phone: string;
  city: string;
  email: string;
  routine: OfferId;
  quantity: number;
};

type FieldErrors = Partial<Record<"fullName" | "phone" | "city" | "email", string>>;

// Same rule the API route enforces — checking it here too means the customer
// sees the field error instead of a generic failure from the server.
const isValidMoroccanPhone = (raw: string) =>
  /^(?:\+212|0)[5-7]\d{8}$/.test(raw.replace(/[\s-]/g, ""));

const emptyForm: FormState = {
  fullName: "",
  phone: "",
  city: "",
  email: "",
  routine: DEFAULT_OFFER,
  quantity: 1,
};

export default function OrderForm({ selectedRoutine }: { selectedRoutine?: OfferId }) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<FormState>(emptyForm);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [orderReference, setOrderReference] = useState("");

  useEffect(() => {
    if (selectedRoutine) {
      setFormData((prev) => ({ ...prev, routine: DEFAULT_OFFER }));
    }
  }, [selectedRoutine]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "routine" ? (isOfferId(value) ? value : DEFAULT_OFFER) : value,
    }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: FieldErrors = {};
    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = t.order.errors.fullName;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t.order.errors.phone;
    } else if (!isValidMoroccanPhone(formData.phone.trim())) {
      newErrors.phone = t.order.errors.phoneInvalid;
    }
    if (formData.city.trim().length < 2) {
      newErrors.city = t.order.errors.city;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = t.order.errors.emailInvalid;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !validate()) {
      return;
    }

    setLoading(true);
    setFailed(false);

    try {
      const res = await fetch("/api/landing/crystal-rose/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName.trim(),
          phone: formData.phone.trim(),
          city: formData.city.trim(),
          email: formData.email.trim(),
          qty: formData.quantity || 1,
          offer: formData.routine,
          lang: language,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json().catch(() => ({}))) as { ref?: string };
      setOrderReference(data.ref || "");
      setSuccess(true);

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#4E5848", "#C49782", "#C29B38", "#FAF7F2"],
      });
    } catch (err) {
      // Never pretend it worked: the order may not exist anywhere. Offer
      // WhatsApp so the lead isn't lost.
      console.error("Order submission error:", err);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setFailed(false);
    setFormData(emptyForm);
  };

  const routineOptions = t.order.routineOptions;
  const currentOption = routineOptions.find((o) => o.id === formData.routine) || routineOptions[0];
  const offer = OFFERS[formData.routine];
  const totalLabel = formatDh(offer.price * (formData.quantity || 1), language);

  const waText = t.order.failure.waMessage
    .replace("{product}", currentOption?.label || "")
    .replace("{total}", totalLabel)
    .replace("{name}", formData.fullName.trim())
    .replace("{city}", formData.city.trim());
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

  return (
    <section id="commander" className="order-section">
      <div className="container-wide">
        <div className="section-heading text-center">
          <div className="section-tag">
            <span>{t.order.tag}</span>
          </div>
          <h2 className="section-title">
            {t.order.title}
          </h2>
          <p className="section-subtitle">
            {t.order.subtitle}
          </p>
        </div>

        <div className="order-grid">
          {/* Left Column: Product Showcase & Guarantees */}
          <div className="order-summary-col">
            <div className="order-pack-card">
              <div className="order-pack-image-frame">
                <img
                  src={packImg.src}
                  alt={t.order.packImgAlt}
                  className="order-pack-img"
                  loading="lazy"
                />
              </div>

              <div className="order-pack-info">
                <h3 className="pack-title">{t.order.packTitle}</h3>
                <p className="pack-subtitle">{t.order.packSubtitle}</p>
                <div className="pack-pricing-row">
                  <span className="pack-current-price">{t.order.packPrice}</span>
                  {t.order.packOldPrice && (
                    <span className="pack-old-price">{t.order.packOldPrice}</span>
                  )}
                </div>
                <div className="pack-tag-pill">
                  <Sparkles size={16} />
                  <span>{t.order.packTag}</span>
                </div>
              </div>

              {/* Guarantees List */}
              <div className="order-guarantees-list">
                <div className="guarantee-item">
                  <div className="guarantee-icon"><Truck size={22} /></div>
                  <div className="guarantee-text">
                    <strong>{t.order.guarantees[0].title}</strong>
                    <span>{t.order.guarantees[0].desc}</span>
                  </div>
                </div>

                <div className="guarantee-item">
                  <div className="guarantee-icon"><ShieldCheck size={22} /></div>
                  <div className="guarantee-text">
                    <strong>{t.order.guarantees[1].title}</strong>
                    <span>{t.order.guarantees[1].desc}</span>
                  </div>
                </div>

                <div className="guarantee-item">
                  <div className="guarantee-icon"><CheckCircle2 size={22} /></div>
                  <div className="guarantee-text">
                    <strong>{t.order.guarantees[2].title}</strong>
                    <span>{t.order.guarantees[2].desc}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Order Form */}
          <div className="order-form-col">
            <div className="order-form-card">
              {success ? (
                <div className="order-success-state">
                  <div className="success-icon-wrapper">
                    <CheckCircle2 size={56} className="success-icon" />
                  </div>
                  <h3 className="success-title">{t.order.success.title}</h3>
                  {orderReference && (
                    <div className="success-ref-badge">
                      <span>{t.order.success.refLabel} <strong>{orderReference}</strong></span>
                    </div>
                  )}
                  <p className="success-message" style={{ whiteSpace: "pre-line" }}>
                    {t.order.success.message}
                  </p>

                  <div className="success-summary-box">
                    <div className="summary-row">
                      <span>{t.order.success.chosenProduct}</span>
                      <strong>{currentOption?.label}</strong>
                    </div>
                    <div className="summary-row">
                      <span>{t.order.success.priceLabel}</span>
                      <strong className="summary-price-highlight">{totalLabel}</strong>
                    </div>
                    <div className="summary-row">
                      <span>{t.order.success.recipient}</span>
                      <strong>{formData.fullName} ({formData.city})</strong>
                    </div>
                  </div>

                  <div className="success-actions">
                    <button onClick={resetForm} className="btn-luxury">
                      {t.order.success.btnNewOrder}
                    </button>
                  </div>
                </div>
              ) : failed ? (
                <div className="order-success-state" role="alert">
                  <h3 className="success-title">{t.order.failure.title}</h3>
                  <p className="success-message">{t.order.failure.message}</p>

                  <div className="success-actions" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-luxury"
                      style={{ background: "#25D366", borderColor: "#25D366", color: "#fff", justifyContent: "center" }}
                    >
                      <span>{t.order.failure.btnWhatsApp}</span>
                    </a>
                    <button type="button" onClick={() => setFailed(false)} className="btn-luxury-outline">
                      <span>{t.order.failure.btnRetry}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="order-form-body" noValidate>
                  {/* Routine Selection */}
                  <div className="form-group">
                    <label className="form-label">
                      {t.order.routineLabel} <span className="req">*</span>
                    </label>
                    <div className="routine-options-list">
                      {routineOptions.map((opt) => (
                        <label
                          key={opt.id}
                          className={`routine-option-card ${formData.routine === opt.id ? "is-selected" : ""}`}
                        >
                          <input
                            type="radio"
                            name="routine"
                            value={opt.id}
                            checked={formData.routine === opt.id}
                            onChange={handleChange}
                            className="routine-radio-input"
                          />
                          <div className="radio-custom-indicator">
                            <span className="radio-inner-dot"></span>
                          </div>
                          <div className="routine-opt-content">
                            <div className="opt-header">
                              <span className="opt-label">{opt.label}</span>
                              <div className="opt-meta-group">
                                {opt.price && <span className="opt-price">{opt.price}</span>}
                                {opt.tag && <span className={`opt-tag ${opt.badgeClass || ""}`}>{opt.tag}</span>}
                              </div>
                            </div>
                            <span className="opt-subtext">{opt.subtext}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="form-row">
                    <div className="form-group flex-1">
                      <label className="form-label" htmlFor="fullName">
                        {t.order.fullNameLabel} <span className="req">*</span>
                      </label>
                      <div className="input-with-icon">
                        <User size={18} className="input-icon" />
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder={t.order.fullNamePlaceholder}
                          className={`form-input ${errors.fullName ? "has-error" : ""}`}
                          autoComplete="name"
                        />
                      </div>
                      {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
                    </div>

                    <div className="form-group flex-1">
                      <label className="form-label" htmlFor="phone">
                        {t.order.phoneLabel} <span className="req">*</span>
                      </label>
                      <div className="input-with-icon">
                        <Phone size={18} className="input-icon" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={t.order.phonePlaceholder}
                          className={`form-input ${errors.phone ? "has-error" : ""}`}
                          autoComplete="tel"
                        />
                      </div>
                      {errors.phone && <span className="error-msg">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group flex-1">
                      <label className="form-label" htmlFor="city">
                        {t.order.cityLabel} <span className="req">*</span>
                      </label>
                      <div className="input-with-icon">
                        <MapPin size={18} className="input-icon" />
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder={t.order.cityPlaceholder}
                          className={`form-input ${errors.city ? "has-error" : ""}`}
                          autoComplete="address-level2"
                        />
                      </div>
                      {errors.city && <span className="error-msg">{errors.city}</span>}
                    </div>

                    <div className="form-group flex-1">
                      <label className="form-label" htmlFor="email">
                        {t.order.emailLabel}
                      </label>
                      <div className="input-with-icon">
                        <Mail size={18} className="input-icon" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t.order.emailPlaceholder}
                          className={`form-input ${errors.email ? "has-error" : ""}`}
                          autoComplete="email"
                        />
                      </div>
                      {errors.email && <span className="error-msg">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-luxury btn-submit-order"
                  >
                    {loading ? (
                      <span className="btn-loading-spinner">{t.order.submitting}</span>
                    ) : (
                      <>
                        <span>{t.order.submitBtn}</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  <div className="form-footer-note">
                    <ShieldCheck size={16} />
                    <span>{t.order.confidentiality}</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
