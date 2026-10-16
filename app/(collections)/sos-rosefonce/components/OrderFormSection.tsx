"use client";

import { useState } from 'react';
import bgHero from '../assets/bg-hero.webp';
import productPouch from '../assets/product-pouch.webp';
import { ArrowRight, ArrowLeft, Truck, CreditCard, ShieldCheck, Check, LoaderCircle as Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../lib/LanguageContext';
import { submitOrder, isValidMoroccanPhone, whatsappOrderLink } from '../lib/submitOrder';
import type { OfferId } from '../lib/config';

export default function OrderFormSection() {
  const [selectedPackId, setSelectedPackId] = useState<OfferId>('pack1');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<'' | 'phone' | 'failed'>('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const { t, isRtl, lang } = useLanguage();

  const packs = t.order.packs;
  const currentPack = packs.find(p => p.id === selectedPackId) || packs[0];

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.city.trim() || !formData.address.trim()) {
      alert(lang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة للتوصيل.' : 'Veuillez remplir tous les champs de livraison.');
      return;
    }
    if (!isValidMoroccanPhone(formData.phone)) {
      setSubmitError('phone');
      return;
    }

    setIsSubmitting(true);
    const ok = await submitOrder(formData, currentPack.id as OfferId, lang, 'Formulaire Page');
    setIsSubmitting(false);

    if (!ok) {
      setSubmitError('failed');
      return;
    }

    setOrderConfirmed(true);
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
    <section
      id="commander"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '620px',
        backgroundColor: '#fae3ec',
        backgroundImage: `url(${bgHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderTop: '1px solid rgba(182, 93, 126, 0.12)',
        padding: '65px 0 45px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        direction: 'ltr'
      }}
    >
      {/* Background radial lighting */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(ellipse at 35% 50%, rgba(255, 245, 248, 0.8) 0%, rgba(253, 235, 241, 0.55) 60%, rgba(250, 220, 230, 0.35) 100%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div style={{
        width: '100%',
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 20px',
        position: 'relative',
        zIndex: 2
      }}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '36px',
            alignItems: 'center',
            marginBottom: '40px'
          }}
          className="order-form-grid"
        >

          {/* LEFT COLUMN: TITLE & CHECKOUT FORM */}
          <div style={{ maxWidth: '620px' }} className="order-form-left">
            
            {/* Cursive Eyebrow */}
            <p 
              className="font-cursive-styled"
              style={{
                fontFamily: isRtl ? 'var(--font-arabic-cursive)' : 'var(--font-cursive)',
                fontSize: isRtl ? 'clamp(1.3rem, 1.8vw, 1.75rem)' : 'clamp(1.7rem, 2.3vw, 2.2rem)',
                color: '#88254b',
                margin: '0 0 6px 0',
                fontStyle: isRtl ? 'normal' : 'italic'
              }}
            >
              {t.order.eyebrow}
            </p>

            {/* Main Headline */}
            <h2 style={{
              fontFamily: isRtl ? 'var(--font-arabic-heading)' : 'var(--font-serif)',
              fontSize: 'clamp(2.1rem, 3.4vw, 3.1rem)',
              fontWeight: 700,
              lineHeight: '1.15',
              color: '#651735',
              letterSpacing: isRtl ? '0' : '-0.01em',
              margin: '0 0 8px 0'
            }}>
              {t.order.mainTitle}
            </h2>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(0.96rem, 1.25vw, 1.08rem)',
              color: '#6e2b44',
              margin: '0 0 20px 0',
              fontWeight: 500
            }}>
              {t.order.subtitle}
            </p>

            {/* Form Container */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '24px',
              padding: '24px 20px',
              border: '1px solid rgba(255, 255, 255, 0.95)',
              boxShadow: '0 12px 35px rgba(120, 29, 62, 0.08)'
            }}>

              {orderConfirmed ? (
                /* Order Success Message */
                <div style={{ textAlign: 'center', padding: '16px 8px' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#e8f5e9',
                    color: '#2e7d32',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    boxShadow: '0 4px 14px rgba(46, 125, 50, 0.2)'
                  }}>
                    <Check size={36} strokeWidth={3} />
                  </div>
                  <h3 style={{
                    fontFamily: isRtl ? 'var(--font-arabic-heading)' : 'var(--font-serif)',
                    fontSize: '1.55rem',
                    color: '#2c0b17',
                    marginBottom: '8px'
                  }}>
                    {t.order.successTitle}
                  </h3>
                  <p style={{ color: '#6e2741', fontSize: '0.94rem', lineHeight: '1.55', marginBottom: '20px' }}>
                    {formattedSuccessMessage}
                  </p>
                  <button
                    onClick={() => {
                      setOrderConfirmed(false);
                      setFormData({ name: '', phone: '', city: '', address: '' });
                    }}
                    className="btn-primary-luxury"
                    style={{ padding: '12px 28px' }}
                  >
                    {t.order.anotherOrder}
                  </button>
                </div>
              ) : (
                /* Order Form */
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Product Offer Card */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#4a1829' }}>
                      {t.order.step1}
                    </span>

                    <div 
                      style={{
                        direction: isRtl ? 'rtl' : 'ltr',
                        textAlign: isRtl ? 'right' : 'left',
                        border: '2px solid #88254b',
                        background: 'linear-gradient(135deg, #fff7fa 0%, #ffffff 100%)',
                        borderRadius: '14px',
                        padding: '14px 18px',
                        position: 'relative',
                        boxShadow: '0 4px 16px rgba(136, 37, 75, 0.10)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '10px'
                      }}
                    >
                      {currentPack.badge && (
                        <div style={{
                          position: 'absolute',
                          top: '-10px',
                          right: '14px',
                          background: 'linear-gradient(135deg, #88254b 0%, #601431 100%)',
                          color: '#fff',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          padding: '2px 10px',
                          borderRadius: '9999px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
                          whiteSpace: 'nowrap',
                          letterSpacing: '0.02em'
                        }}>
                          {currentPack.badge}
                        </div>
                      )}

                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#2c0b17', lineHeight: '1.25', marginBottom: '3px' }}>
                          {currentPack.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#7a2245', fontWeight: 600 }}>
                          {currentPack.drawerSub || (isRtl ? 'توصيل مجاني لجميع المدن' : 'Livraison Gratuite')}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#88254b', lineHeight: '1.1' }}>
                          {currentPack.price} <span style={{ fontSize: '0.95rem' }}>{t.order.currency}</span>
                        </div>
                        {currentPack.oldPrice && (
                          <div style={{ fontSize: '0.8rem', color: '#999', textDecoration: 'line-through', fontWeight: 500 }}>
                            {currentPack.oldPrice} {t.order.currency}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Customer Information Inputs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#4a1829' }}>
                      {t.order.step2}
                    </span>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="form-inputs-grid">
                      <input
                        type="text"
                        required
                        placeholder={t.order.placeholders.name}
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        style={{
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: '1px solid rgba(182, 93, 126, 0.25)',
                          background: '#fff',
                          fontSize: '0.88rem',
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
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: '1px solid rgba(182, 93, 126, 0.25)',
                          background: '#fff',
                          fontSize: '0.88rem',
                          outline: 'none',
                          direction: 'ltr'
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="form-inputs-grid">
                      <input
                        type="text"
                        required
                        placeholder={t.order.placeholders.city}
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        style={{
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: '1px solid rgba(182, 93, 126, 0.25)',
                          background: '#fff',
                          fontSize: '0.88rem',
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
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: '1px solid rgba(182, 93, 126, 0.25)',
                          background: '#fff',
                          fontSize: '0.88rem',
                          outline: 'none',
                          direction: 'ltr'
                        }}
                      />
                    </div>
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

              {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary-luxury"
                    style={{
                      width: '100%',
                      padding: '15px 28px',
                      fontSize: '1.05rem',
                      borderRadius: '9999px',
                      marginTop: '4px',
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
                        <span>{t.order.submitBtn} ({currentPack.price} {t.order.currency})</span>
                        <ArrowIcon size={20} />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>

          </div>

          {/* RIGHT COLUMN: POUCH */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
            className="order-form-right"
          >
            {/* Ambient Aura */}
            <div style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 200, 225, 0.6) 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(30px)',
              pointerEvents: 'none'
            }} />

            <div style={{
              position: 'relative',
              zIndex: 2,
              animation: 'floatAnimation 6s ease-in-out infinite'
            }}>
              <img
                src={productPouch.src}
                alt="VitaPlex SOS 600g Soin Capillaire"
                style={{
                  width: '100%',
                  maxWidth: '380px',
                  height: 'auto',
                  maxHeight: '440px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 35px rgba(110, 20, 50, 0.25))',
                  display: 'block'
                }}
              />
            </div>
          </div>

        </div>

        {/* BOTTOM 3 TRUST GUARANTEES ROW */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '32px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(182, 93, 126, 0.15)'
          }}
          className="order-trust-bar"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#461427', fontSize: '0.92rem', fontWeight: 600 }}>
            <Truck size={20} color="#88254b" />
            <span>{t.order.fastDelivery}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#461427', fontSize: '0.92rem', fontWeight: 600 }}>
            <CreditCard size={20} color="#88254b" />
            <span>{t.order.cod}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#461427', fontSize: '0.92rem', fontWeight: 600 }}>
            <ShieldCheck size={20} color="#88254b" />
            <span>{t.order.satisfaction}</span>
          </div>
        </div>

      </div>

      {/* Responsive Styles */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
        @media (max-width: 900px) {
          .order-form-grid {
            grid-template-columns: 1fr !important;
          }
          .order-form-left {
            max-width: 100% !important;
            margin: 0 auto !important;
          }
          .order-form-right {
            margin-top: 10px;
          }
        }
        @media (max-width: 580px) {
          .form-packs-grid {
            grid-template-columns: 1fr !important;
          }
          .form-inputs-grid {
            grid-template-columns: 1fr !important;
          }
          .order-trust-bar {
            flex-direction: column !important;
            gap: 12px !important;
            align-items: center !important;
          }
        }
      `}</style>
    </section>
  );
}
