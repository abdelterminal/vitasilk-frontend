"use client";

import { useState } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Truck, Clock, ArrowRight, ArrowLeft, LoaderCircle as Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../lib/LanguageContext';
import { submitOrder, isValidMoroccanPhone, whatsappOrderLink } from '../lib/submitOrder';
import type { OfferId } from '../lib/config';

export default function OrderDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedPackId, setSelectedPackId] = useState<OfferId>('pack1');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<'' | 'phone' | 'failed'>('');
  const [orderComplete, setOrderComplete] = useState(false);

  const { t, isRtl, lang } = useLanguage();

  if (!isOpen) return null;

  const packs = t.order.packs;
  const currentPack = packs.find(p => p.id === selectedPackId) || packs[0];
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.city.trim() || !formData.address.trim()) {
      alert(lang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة.' : 'Veuillez remplir tous les champs obligatoires.');
      return;
    }
    if (!isValidMoroccanPhone(formData.phone)) {
      setSubmitError('phone');
      return;
    }

    setIsSubmitting(true);
    const ok = await submitOrder(formData, currentPack.id as OfferId, lang, 'Slide Drawer');
    setIsSubmitting(false);

    if (!ok) {
      setSubmitError('failed');
      return;
    }

    setOrderComplete(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#88254b', '#f6d397', '#e8a598', '#fae4ec']
    });
  };

  const formattedSuccessMessage = t.order.successMessage
    .replace('{name}', formData.name || '')
    .replace('{phone}', formData.phone || '')
    .replace('{city}', formData.city || '');

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2000,
      display: 'flex',
      justifyContent: 'flex-end',
      background: 'rgba(44, 11, 23, 0.5)',
      backdropFilter: 'blur(6px)',
      animation: 'fadeIn 0.2s ease',
      direction: 'ltr'
    }}>
      {/* Background click to close */}
      <div 
        onClick={onClose}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Slide Drawer */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '520px',
        height: '100%',
        background: '#fff9fb',
        boxShadow: '-8px 0 35px rgba(88, 18, 44, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        borderInlineStart: '1px solid rgba(156, 40, 84, 0.15)'
      }}>

        {/* Drawer Header */}
        <div style={{
          padding: '18px 22px',
          background: 'linear-gradient(135deg, #7c1f43 0%, #58122c 100%)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingBag size={20} color="#f6d397" />
              <h3 style={{
                fontFamily: isRtl ? 'var(--font-arabic-heading)' : 'var(--font-serif)',
                fontSize: '1.25rem',
                margin: 0,
                color: '#fff'
              }}>
                {t.order.mainTitle}
              </h3>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#fae4ec', opacity: 0.9 }}>
              {t.hero.cod} • {t.order.freeShippingTag}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Fermer"
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '22px', flex: 1 }}>

          {orderComplete ? (
            /* Order Success Screen */
            <div style={{
              textAlign: 'center',
              padding: '30px 10px',
              animation: 'fadeIn 0.4s ease'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
                color: '#2e7d32',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px',
                boxShadow: '0 8px 24px rgba(46, 125, 50, 0.2)'
              }}>
                <Check size={40} strokeWidth={3} />
              </div>

              <h3 style={{
                fontFamily: isRtl ? 'var(--font-arabic-heading)' : 'var(--font-serif)',
                fontSize: '1.65rem',
                color: '#2c0b17',
                marginBottom: '8px'
              }}>
                {t.order.successTitle}
              </h3>
              <p style={{ color: '#6e2741', fontSize: '0.94rem', lineHeight: '1.55', marginBottom: '22px' }}>
                {formattedSuccessMessage}
              </p>

              <div style={{
                background: '#fff',
                border: '1px solid rgba(156, 40, 84, 0.15)',
                borderRadius: '16px',
                padding: '18px',
                textAlign: 'start',
                marginBottom: '22px'
              }}>
                <div style={{ fontWeight: 700, color: '#88254b', marginBottom: '10px', fontSize: '0.88rem' }}>
                  {t.order.orderSummary}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.88rem' }}>
                  <span>{t.order.productLabel}</span>
                  <strong>{currentPack.drawerTitle || currentPack.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.88rem' }}>
                  <span>{t.order.shippingLabel}</span>
                  <strong style={{ color: '#2e7d32' }}>{t.order.freeShippingValue}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #e8a598', paddingTop: '8px', marginTop: '8px', fontSize: '1.08rem', fontWeight: 800, color: '#761d3e' }}>
                  <span>{t.order.totalLabel}</span>
                  <span>{currentPack.price} {t.order.currency}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setOrderComplete(false);
                  onClose();
                }}
                className="btn-primary-luxury"
                style={{ width: '100%', padding: '14px' }}
              >
                {t.order.backToShop}
              </button>
            </div>
          ) : (
            /* Order Selection & Form */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

              {/* Pack Selector */}
              <div>
                <label style={{
                  display: 'block',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  color: '#2c0b17',
                  marginBottom: '10px'
                }}>
                  {t.order.step1Drawer}
                </label>

                <div 
                  style={{
                    position: 'relative',
                    direction: isRtl ? 'rtl' : 'ltr',
                    textAlign: isRtl ? 'right' : 'left',
                    border: '2px solid #88254b',
                    background: 'linear-gradient(135deg, #fff7fa 0%, #ffffff 100%)',
                    borderRadius: '14px',
                    padding: '14px 16px',
                    boxShadow: '0 6px 18px rgba(136, 37, 75, 0.10)'
                  }}
                >
                  {(currentPack.drawerBadge || currentPack.badge) && (
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '12px',
                      background: 'linear-gradient(135deg, #88254b 0%, #601431 100%)',
                      color: '#fff',
                      fontSize: '0.66rem',
                      fontWeight: 800,
                      padding: '2px 10px',
                      borderRadius: '9999px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
                      whiteSpace: 'nowrap'
                    }}>
                      {currentPack.drawerBadge || currentPack.badge}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.94rem', color: '#2c0b17', marginBottom: '2px' }}>
                        {currentPack.drawerTitle || currentPack.name}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#7a3b53', fontWeight: 600 }}>
                        {currentPack.drawerSub}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#88254b' }}>
                        {currentPack.price} {t.order.currency}
                      </div>
                      {currentPack.oldPrice && (
                        <div style={{ fontSize: '0.76rem', color: '#999', textDecoration: 'line-through' }}>
                          {currentPack.oldPrice} {t.order.currency}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div>
                <label style={{
                  display: 'block',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  color: '#2c0b17',
                  marginBottom: '10px'
                }}>
                  {t.order.step2Drawer}
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input
                    type="text"
                    required
                    placeholder={t.order.placeholders.name}
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(156, 40, 84, 0.25)',
                      background: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      direction: 'ltr'
                    }}
                  />

                  <input
                    type="tel"
                    required
                    placeholder={t.order.placeholders.phone}
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(156, 40, 84, 0.25)',
                      background: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      direction: 'ltr'
                    }}
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="drawer-inputs-row">
                    <input
                      type="text"
                      required
                      placeholder={t.order.placeholders.city}
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid rgba(156, 40, 84, 0.25)',
                        background: '#fff',
                        fontSize: '0.9rem',
                        outline: 'none',
                        direction: 'ltr'
                      }}
                    />

                    <input
                      type="text"
                      required
                      placeholder={t.order.placeholders.address}
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid rgba(156, 40, 84, 0.25)',
                        background: '#fff',
                        fontSize: '0.9rem',
                        outline: 'none',
                        direction: 'ltr'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Guarantee badges */}
              <div style={{
                background: 'rgba(255,255,255,0.7)',
                padding: '10px',
                borderRadius: '12px',
                border: '1px dashed rgba(156, 40, 84, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                fontSize: '0.75rem',
                color: '#6e1a38',
                fontWeight: 600
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Truck size={14} color="#88254b" /> {t.order.freeShippingTag}
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} color="#88254b" /> {t.order.payOnDeliveryTag}
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} color="#88254b" /> {t.order.deliveryTimeTag}
                </span>
              </div>

              {submitError === 'phone' && (
                <p role="alert" style={{ color: '#b3261e', fontSize: '0.84rem', fontWeight: 600, margin: 0 }}>
                  {t.order.phoneError}
                </p>
              )}
              {submitError === 'failed' && (
                <div role="alert" style={{ background: '#fff4f4', border: '1px solid rgba(179, 38, 30, 0.25)', borderRadius: '12px', padding: '12px 14px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 800, color: '#b3261e', fontSize: '0.92rem', marginBottom: '4px' }}>{t.order.errorTitle}</div>
                  <p style={{ fontSize: '0.82rem', color: '#6e2741', lineHeight: 1.5, margin: '0 0 10px', textAlign: 'center' }}>{t.order.errorText}</p>
                  <a
                    href={whatsappOrderLink(formData, currentPack.id as OfferId, lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#25D366', color: '#fff', fontWeight: 700, fontSize: '0.88rem', padding: '9px 18px', borderRadius: '9999px', textDecoration: 'none' }}
                  >
                    {t.order.whatsapp}
                  </a>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary-luxury"
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '1.05rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Loader2 size={18} className="spin-animation" />
                    <span>{t.order.submitting}</span>
                  </span>
                ) : (
                  <>
                    <span>{t.order.drawerSubmitBtn} ({currentPack.price} {t.order.currency})</span>
                    <ArrowIcon size={20} />
                  </>
                )}
              </button>
            </form>
          )}

        </div>
      </div>

      <style>{`
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideRight {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 480px) {
          .drawer-inputs-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
