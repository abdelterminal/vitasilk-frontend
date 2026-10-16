"use client";

import { X, Check, ShieldCheck, Truck } from 'lucide-react';
import brandLogo from '../assets/logo-vitasilk.png';
import productPouchNobg from '../assets/product-pouch-nobg.webp';
import { useLanguage } from '../lib/LanguageContext';
import { useOrder } from '../lib/useOrder';
import { OLD_PRICE_DH, PRICE_DH, formatDh, formatDiscount } from '../lib/config';
import OrderError from './OrderError';

export default function OrderModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t, lang } = useLanguage();
  const { formData, setFormData, status, phoneInvalid, submit, whatsappHref, reset } = useOrder(lang, {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
  const loading = status === 'sending';

  if (!isOpen) return null;

  const priceText = formatDh(PRICE_DH, lang);
  const oldPriceText = formatDh(OLD_PRICE_DH, lang);
  const discountText = formatDiscount(lang);
  const productName = t.orderForm.productName;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Fermer">
          <X size={20} />
        </button>

        {status === 'error' ? (
          <OrderError whatsappHref={whatsappHref} onRetry={reset} />
        ) : status !== 'success' ? (
          <>
            {/* Modal Header */}
            <div className="modal-header">
              <img src={brandLogo.src} alt="Vitasilk Professional" className="modal-logo" />
              <h3 className="modal-title">{t.orderForm.title}</h3>
              <p className="modal-subtitle">{t.orderForm.subtitle}</p>
            </div>

            {/* Product Card */}
            <div className="modal-product-card">
              <div className="modal-product-thumb">
                <img src={productPouchNobg.src} alt={productName} className="pack-pouch-img" />
              </div>

              <div className="modal-product-info">
                <div className="modal-product-title-row">
                  <span className="modal-product-name">{productName}</span>
                  <span className="pack-discount-pill">{discountText}</span>
                </div>
                <p className="modal-product-sub">
                  {lang === 'ar' ? 'توصيل مجاني • الدفع عند الاستلام' : 'Livraison Gratuite • Paiement à la livraison'}
                </p>
              </div>

              <div className="modal-product-pricing">
                <span className="pack-current-price">{priceText}</span>
                <span className="pack-old-price">{oldPriceText}</span>
              </div>
            </div>

            {/* Simple Fast Checkout Form */}
            <form onSubmit={submit} className="order-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>{t.orderForm.nameLabel}</label>
                  <input
                    type="text"
                    required
                    minLength={3}
                    placeholder={t.orderForm.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>{t.orderForm.phoneLabel}</label>
                  <input
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
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>{t.orderForm.addressLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder={t.orderForm.addressPlaceholder}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>{t.orderForm.cityLabel}</label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    placeholder={t.orderForm.cityPlaceholder}
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button type="submit" className="modal-submit-btn" disabled={loading}>
                <span>{loading ? t.orderForm.submitting : `${t.orderForm.submitBtn} (${priceText})`}</span>
              </button>
            </form>

            {/* Trust Footnotes */}
            <div className="modal-trust-footer">
              <div className="trust-item">
                <Truck size={15} /> <span>{t.orderForm.trust3}</span>
              </div>
              <div className="trust-item">
                <ShieldCheck size={15} /> <span>{t.orderForm.trust2}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="order-success-view">
            <div className="success-icon-box">
              <Check size={36} color="#FFFFFF" />
            </div>
            <h3>{t.orderForm.successTitle} {formData.name} !</h3>
            <p>{t.orderForm.successSub}</p>
            <div className="success-recap">
              <p>📍 {formData.address}, {formData.city}</p>
              <p>📞 {formData.phone}</p>
              <p>📦 {t.orderForm.successDetails}</p>
            </div>
            <button className="modal-submit-btn" onClick={() => { reset(); onClose(); }}>
              {t.orderForm.newOrderBtn}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
