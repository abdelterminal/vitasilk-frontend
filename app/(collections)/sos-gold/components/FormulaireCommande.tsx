"use client";

import { Check, ShieldCheck, Truck, Sparkles, Lock } from 'lucide-react';
import productPouchNobg from '../assets/product-pouch-nobg.webp';
import { useLanguage } from '../lib/LanguageContext';
import { useOrder } from '../lib/useOrder';
import { OLD_PRICE_DH, PRICE_DH, formatDh, formatDiscount } from '../lib/config';
import OrderError from './OrderError';

export default function FormulaireCommande() {
  const { t, lang } = useLanguage();
  const { formData, setFormData, status, phoneInvalid, submit, whatsappHref, reset } = useOrder(lang, {
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 }
  });
  const loading = status === 'sending';

  const priceText = formatDh(PRICE_DH, lang);
  const oldPriceText = formatDh(OLD_PRICE_DH, lang);
  const discountText = formatDiscount(lang);
  const productName = t.orderForm.productName;

  return (
    <section id="commander" className="section-formulaire">
      <div className="container">

        {/* Section Header */}
        <div className="formulaire-header text-center">
          <span className="section-tag">{t.orderForm.tag}</span>
          <h2 className="formulaire-title">{t.orderForm.title}</h2>
          <p className="formulaire-subtitle">
            {t.orderForm.subtitle}
          </p>
        </div>

        <div className="formulaire-main-card">
          {status === 'error' ? (
            <OrderError whatsappHref={whatsappHref} onRetry={reset} />
          ) : status !== 'success' ? (
            <div className="formulaire-grid">

              {/* Left Column: Product Showcase & Trust */}
              <div className="formulaire-left-summary">

                <h3 className="summary-section-title">
                  <Sparkles size={20} className="gold-icon" /> <span>{t.orderForm.step1}</span>
                </h3>

                {/* Single Product Showcase Card */}
                <div className="product-showcase-card">
                  {/* Top Badge */}
                  <div className="product-showcase-badge">
                    <Sparkles size={13} />
                    <span>{t.orderForm.productBadge}</span>
                  </div>

                  {/* Visual Image Showcase */}
                  <div className="product-showcase-visual">
                    <div className="product-visual-glow" />
                    <img
                      src={productPouchNobg.src}
                      alt={productName}
                      className="product-showcase-img"
                    />
                  </div>

                  {/* Product Info & Highlights */}
                  <div className="product-showcase-details">
                    <h4 className="product-showcase-title">{productName}</h4>
                    <p className="product-showcase-subtitle">{t.orderForm.productSubtitle}</p>

                    <ul className="product-showcase-features">
                      <li>
                        <Check size={16} className="feature-check-icon" />
                        <span>{t.orderForm.feature1}</span>
                      </li>
                      <li>
                        <Check size={16} className="feature-check-icon" />
                        <span>{t.orderForm.feature2}</span>
                      </li>
                      <li>
                        <Check size={16} className="feature-check-icon" />
                        <span>{t.orderForm.feature3}</span>
                      </li>
                    </ul>

                    {/* Pricing Box */}
                    <div className="product-showcase-price-box">
                      <div className="price-tag-wrap">
                        <span className="price-current">{priceText}</span>
                        <span className="price-old">{oldPriceText}</span>
                        <span className="price-discount-pill">{discountText}</span>
                      </div>
                      <div className="price-shipping-badge">
                        <Truck size={14} />
                        <span>{t.orderForm.shippingFree}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guarantee Features Box */}
                <div className="formulaire-trust-box">
                  <div className="trust-row">
                    <Truck size={18} className="trust-icon" />
                    <span><strong>{t.orderForm.trust1}</strong></span>
                  </div>
                  <div className="trust-row">
                    <ShieldCheck size={18} className="trust-icon" />
                    <span><strong>{t.orderForm.trust2}</strong></span>
                  </div>
                  <div className="trust-row">
                    <Lock size={18} className="trust-icon" />
                    <span><strong>{t.orderForm.trust3}</strong></span>
                  </div>
                </div>

              </div>

              {/* Right Column: Customer Details Form */}
              <div className="formulaire-right-form">

                <h3 className="summary-section-title">
                  <span>{t.orderForm.step2}</span>
                </h3>

                <form onSubmit={submit} className="checkout-form">

                  <div className="form-field-group">
                    <label htmlFor="client-name">{t.orderForm.nameLabel}</label>
                    <input
                      id="client-name"
                      type="text"
                      required
                      minLength={3}
                      placeholder={t.orderForm.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="client-phone">{t.orderForm.phoneLabel}</label>
                    <input
                      id="client-phone"
                      type="tel"
                      required
                      placeholder={t.orderForm.phonePlaceholder}
                      value={formData.phone}
                      aria-invalid={phoneInvalid}
                      style={phoneInvalid ? { borderColor: '#B3261E' } : undefined}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    {phoneInvalid && (
                      <span role="alert" style={{ color: '#B3261E', fontSize: 13, marginTop: 6, display: 'block' }}>
                        {t.orderForm.phoneError}
                      </span>
                    )}
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="client-address">{t.orderForm.addressLabel}</label>
                    <input
                      id="client-address"
                      type="text"
                      required
                      placeholder={t.orderForm.addressPlaceholder}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="client-city">{t.orderForm.cityLabel}</label>
                    <input
                      id="client-city"
                      type="text"
                      required
                      minLength={2}
                      placeholder={t.orderForm.cityPlaceholder}
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>

                  {/* Order Total Recap */}
                  <div className="order-final-recap">
                    <div className="recap-line">
                      <span>{t.orderForm.recapArticle}</span>
                      <strong>{productName}</strong>
                    </div>
                    <div className="recap-line">
                      <span>{t.orderForm.recapShipping}</span>
                      <strong style={{color: '#2E7D32'}}>{t.orderForm.recapFree}</strong>
                    </div>
                    <div className="recap-total-line">
                      <span>{t.orderForm.recapTotal}</span>
                      <span className="total-amount">{priceText}</span>
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    className="form-submit-cta"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>{t.orderForm.submitting}</span>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        <span>{t.orderForm.submitBtn} ({priceText})</span>
                      </>
                    )}
                  </button>

                  <p className="form-disclaimer">
                    {t.orderForm.disclaimer}
                  </p>

                </form>

              </div>

            </div>
          ) : (
            /* Order Success State */
            <div className="formulaire-success-card text-center">
              <div className="success-check-badge">
                <Check size={42} color="#FFFFFF" strokeWidth={3} />
              </div>
              <h3 className="success-heading">{t.orderForm.successTitle} {formData.name} !</h3>
              <p className="success-subheading">
                {t.orderForm.successSub}
              </p>

              <div className="success-details-box">
                <div className="success-line">
                  <span>{t.orderForm.recapArticle}</span>
                  <strong>{productName}</strong>
                </div>
                <div className="success-line">
                  <span>{t.orderForm.recapTotal}</span>
                  <strong>{priceText} ({t.orderForm.paymentCod})</strong>
                </div>
                <div className="success-line">
                  <span>{t.orderForm.addressLabel}</span>
                  <span>{formData.address}, {formData.city}</span>
                </div>
                <div className="success-line">
                  <span>{t.orderForm.phoneLabel}</span>
                  <span>{formData.phone}</span>
                </div>
              </div>

              <p className="success-footer-note">
                📦 {t.orderForm.successDetails}
              </p>

              <button
                onClick={reset}
                className="btn-new-order"
              >
                {t.orderForm.newOrderBtn}
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
