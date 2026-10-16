"use client";

import { ShoppingBag } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function StickyBottomCTA({ onOpenOrder }: { onOpenOrder: () => void }) {
  const { t } = useLanguage();

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 900,
      background: 'rgba(255, 245, 248, 0.96)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      padding: '10px 18px',
      borderTop: '1px solid rgba(156, 40, 84, 0.15)',
      boxShadow: '0 -8px 24px rgba(120, 29, 62, 0.1)',
      display: 'none',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      direction: 'ltr'
    }} className="sticky-mobile-cta">
      <div>
        <div style={{ fontSize: '0.74rem', color: '#855367', fontWeight: 600 }}>
          {t.stickyCta.tag}
        </div>
        <div style={{ fontWeight: 800, fontSize: '1.02rem', color: '#761d3e' }}>
          {t.stickyCta.price}{' '}
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#999', textDecoration: 'line-through' }}>
            {t.stickyCta.oldPrice}
          </span>
        </div>
      </div>

      <button
        onClick={onOpenOrder}
        className="btn-primary-luxury"
        style={{
          padding: '10px 22px',
          fontSize: '0.92rem'
        }}
      >
        <ShoppingBag size={16} />
        <span>{t.stickyCta.orderBtn}</span>
      </button>

      <style>{`
        @media (max-width: 768px) {
          .sticky-mobile-cta {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
