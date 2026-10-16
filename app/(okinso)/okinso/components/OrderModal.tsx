"use client";

import React, { useState } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Truck, Loader2, MessageCircle } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import { MAX_QTY, oldTotalFor, totalFor } from '../lib/config';
import { submitOrder, whatsappHref, orderErrorText } from '../lib/order';

export default function OrderModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t, language } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!isOpen) return null;

  // Same formula the API route uses: 10% off each unit when ordering 2+.
  const totalPrice = totalFor(quantity);

  const order = {
    name: formData.fullName.trim(),
    phone: formData.phone.trim(),
    city: formData.city.trim(),
    address: formData.address.trim(),
    qty: quantity,
  };

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
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Fermer">
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div className="modal-content">

            {/* Header */}
            <div className="modal-header">
              <span className="modal-eyebrow font-serif">{t.modal.eyebrow}</span>
              <h2 className="modal-title font-serif">{t.modal.title}</h2>
              <p className="modal-subtitle">
                {t.modal.subtitle}
              </p>
            </div>

            {/* Product Summary Card */}
            <div className="modal-product-card">
              <div className="product-card-details">
                <h3 className="product-card-title font-serif">{t.modal.productTitle}</h3>
                <ul className="product-steps-mini">
                  <li>{t.modal.step1}</li>
                  <li>{t.modal.step2}</li>
                  <li>{t.modal.step3}</li>
                  <li>{t.modal.step4}</li>
                </ul>
              </div>

              {/* Quantity & Price */}
              <div className="product-card-pricing">
                <div className="quantity-selector">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(MAX_QTY, quantity + 1))}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <div className="price-tag">
                  <span className="price-old">{oldTotalFor(quantity)} {t.orderForm.currency}</span>
                  <span className="price-current">{totalPrice} {t.orderForm.currency}</span>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>{t.modal.nameLabel}</label>
                <input
                  type="text"
                  required
                  placeholder={t.modal.namePlaceholder}
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>{t.modal.phoneLabel}</label>
                <input
                  type="tel"
                  required
                  placeholder={t.modal.phonePlaceholder}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>{t.modal.cityLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder={t.modal.cityPlaceholder}
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div className="form-group flex-2">
                  <label>{t.modal.addressLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder={t.modal.addressPlaceholder}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>

              {/* Guarantees */}
              <div className="order-trust-badges">
                <div className="trust-item">
                  <Truck size={16} />
                  <span>{t.modal.freeShipping}</span>
                </div>
                <div className="trust-item">
                  <ShieldCheck size={16} />
                  <span>{t.modal.cod}</span>
                </div>
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
                className="btn-confirm-order"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>{t.modal.submittingBtn}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>{t.modal.submitBtn} ({totalPrice} {t.orderForm.currency})</span>
                  </>
                )}
              </button>
            </form>

          </div>
        ) : (
          /* Confirmation State */
          <div className="modal-success animate-fadeIn">
            <div className="success-icon-wrap">
              <Check size={36} color="#ffffff" strokeWidth={2.5} />
            </div>
            <h2 className="success-title font-serif">{t.modal.successTitle(formData.fullName)}</h2>
            <p className="success-desc">
              {t.modal.successDesc(formData.phone)}
            </p>
            <div className="success-details">
              <p>📍 <strong>{t.modal.successDest(formData.city)}</strong></p>
              <p>💵 <strong>{t.modal.successTotal(totalPrice)}</strong></p>
            </div>
            <button
              className="btn-commander"
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}
            >
              {t.modal.backHome}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
