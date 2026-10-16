"use client";

import queenEmblem from '../assets/vitaplex-queen-transparent.png';
import { useLanguage } from '../lib/LanguageContext';

export default function BrandFooter() {
  const { t, isRtl } = useLanguage();

  return (
    <footer
      style={{
        background: '#ffffff',
        borderTop: '1px solid rgba(182, 93, 126, 0.15)',
        padding: '28px 24px',
        color: '#461427',
        direction: 'ltr'
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '14px'
        }}
        className="brand-footer-container"
      >
        {/* Queen Crown Logo */}
        <div
          style={{
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <img
            src={queenEmblem.src}
            alt="VitaPlex Queen Emblem"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* Brand Name & Slogan */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{
            fontFamily: isRtl ? 'var(--font-arabic-heading)' : 'var(--font-serif)',
            fontSize: '1.45rem',
            fontWeight: 700,
            color: '#701c3e',
            lineHeight: '1.1'
          }}>
            VitaPlex
          </span>
          <span style={{
            fontSize: '0.84rem',
            color: '#8a4760',
            fontWeight: 500,
            letterSpacing: isRtl ? '0' : '0.04em'
          }}>
            {t.footer.slogan}
          </span>
        </div>
      </div>
    </footer>
  );
}
