"use client";

import React, { useState } from 'react';
import { ShoppingBag, Truck, ShieldCheck, Check, Sparkles, Phone, MapPin, User, Gift, CheckCircle2, Loader2, MessageCircle } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import packImage from '../assets/pack-marble-showcase.webp';
import { OLD_PRICE_DH, totalFor } from '../lib/config';
import { submitOrder, whatsappHref, orderErrorText } from '../lib/order';

export default function OrderForm({ id = "formulaire-commande" }: { id?: string }) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);

  // The main form always orders exactly one complete pack.
  const totalPrice = totalFor(1);
  const totalOldPrice = OLD_PRICE_DH;

  const order = { name: formData.fullName.trim(), phone: formData.phone.trim(), city: formData.city.trim(), qty: 1 };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHasError(false);

    const ok = await submitOrder(order, language);
    setIsSubmitting(false);
    if (ok) setIsSubmitted(true);
    else setHasError(true);
  };

  return (
    <section id={id} className="order-form-section">
      <div className="order-form-container">

        {/* Section Header */}
        <div className="order-form-header">
          <span className="order-eyebrow">{t.orderForm.eyebrow}</span>
          <h2 className="order-title font-serif">{t.orderForm.title}</h2>
          <p className="order-subtitle">
            {t.orderForm.subtitle}
          </p>
        </div>

        {!isSubmitted ? (
          <div className="order-grid-layout">

            {/* Left: Complete Pack Visual & Kit Details */}
            <div className="order-pack-showcase-col">

              {/* High Quality Pack Image Container */}
              <div className="pack-image-card">
                <div className="pack-badge-floating">
                  <Sparkles size={14} />
                  <span>{t.orderForm.packBadge}</span>
                </div>
                <img
                  src={packImage.src}
                  alt="Pack Complet Okinso 4 Étapes"
                  className="pack-main-img"
                />
              </div>

              {/* Kit Details Card */}
              <div className="pack-details-box">
                <div className="pack-title-row">
                  <h3 className="pack-name font-serif">{t.orderForm.packName}</h3>
                  <div className="pack-price-pill">
                    <span className="price-old-mini">{totalOldPrice} {t.orderForm.currency}</span>
                    <span className="price-current-main">{totalPrice} {t.orderForm.currency}</span>
                  </div>
                </div>

                <p className="pack-tagline">
                  {t.orderForm.packTagline}
                </p>

                {/* 4 Steps Included List */}
                <ul className="pack-included-list">
                  <li>
                    <CheckCircle2 size={16} className="check-pink" />
                    <span>{t.orderForm.step1}</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="check-pink" />
                    <span>{t.orderForm.step2}</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="check-pink" />
                    <span>{t.orderForm.step3}</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="check-pink" />
                    <span>{t.orderForm.step4}</span>
                  </li>
                  <li className="gift-bonus-item">
                    <Gift size={16} className="gift-gold" />
                    <span>{t.orderForm.gift}</span>
                  </li>
                </ul>

                {/* Guarantees Strip */}
                <div className="order-guarantees-strip">
                  <div className="strip-item">
                    <Truck size={17} className="strip-icon" />
                    <span>{t.orderForm.freeShipping}</span>
                  </div>
                  <div className="strip-item">
                    <ShieldCheck size={17} className="strip-icon" />
                    <span>{t.orderForm.cod}</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Right: Streamlined Checkout Form */}
            <div className="order-fields-col">
              <form onSubmit={handleSubmit} className="order-actual-form">
                <h3 className="form-fields-title font-serif">{t.orderForm.formTitle}</h3>

                <div className="form-input-group">
                  <label>{t.orderForm.nameLabel}</label>
                  <div className="input-with-icon">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      required
                      placeholder={t.orderForm.namePlaceholder}
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-input-group">
                  <label>{t.orderForm.phoneLabel}</label>
                  <div className="input-with-icon">
                    <Phone size={18} className="input-icon" />
                    <input
                      type="tel"
                      required
                      placeholder={t.orderForm.phonePlaceholder}
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-input-group">
                  <label>{t.orderForm.cityLabel}</label>
                  <div className="input-with-icon">
                    <MapPin size={18} className="input-icon" />
                    <input
                      type="text"
                      required
                      placeholder={t.orderForm.cityPlaceholder}
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                </div>

                {/* Total Recap */}
                <div className="order-total-recap">
                  <span>{t.orderForm.totalLabel}</span>
                  <span className="total-amount">{totalPrice} {t.orderForm.currency}</span>
                </div>

                {hasError && (
                  <div className="okinso-order-error" role="alert">
                    <p>{orderErrorText[language].message}</p>
                    <a href={whatsappHref(order, totalPrice)} target="_blank" rel="noopener noreferrer">
                      <MessageCircle size={16} />
                      <span>{orderErrorText[language].cta}</span>
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  className={`btn-submit-order ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>{t.orderForm.submittingBtn}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={20} />
                      <span>{t.orderForm.submitBtn} ({totalPrice} {t.orderForm.currency})</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        ) : (
          /* Confirmation Success Message */
          <div className="order-success-screen animate-fadeIn">
            <div className="success-badge-wrap">
              <Check size={40} color="#ffffff" strokeWidth={3} />
            </div>
            <h3 className="success-headline font-serif">{t.orderForm.successTitle}</h3>
            <p className="success-subtext">
              {t.orderForm.successSubtext(formData.fullName, formData.phone, formData.city)}
            </p>
            <div className="success-summary-box">
              <p>📦 <strong>{t.orderForm.successItemArticle}</strong></p>
              <p>📍 <strong>{t.orderForm.successItemDest(formData.city)}</strong></p>
              <p>💵 <strong>{t.orderForm.successItemAmount(totalPrice)}</strong></p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
