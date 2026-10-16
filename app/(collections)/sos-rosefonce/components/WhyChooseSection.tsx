"use client";

import { useLanguage } from '../lib/LanguageContext';

export default function WhyChooseSection() {
  const { t, isRtl } = useLanguage();

  const icons = [
    // 1. Repair icon
    (
      <svg key="icon-1" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="10" rx="5" transform="rotate(-45 12 12)" />
        <line x1="10" y1="10" x2="10" y2="10.01" strokeWidth="2.5" />
        <line x1="14" y1="14" x2="14" y2="14.01" strokeWidth="2.5" />
        <line x1="10" y1="14" x2="10" y2="14.01" strokeWidth="2.5" />
        <line x1="14" y1="10" x2="14" y2="10.01" strokeWidth="2.5" />
        <line x1="8.5" y1="8.5" x2="15.5" y2="15.5" strokeDasharray="1 3" />
      </svg>
    ),
    // 2. Hydrate icon
    (
      <svg key="icon-2" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        <path d="M9.5 13a2.5 2.5 0 0 0 2.5 2.5" strokeWidth="1.5" opacity="0.85" />
      </svg>
    ),
    // 3. Protect icon
    (
      <svg key="icon-3" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" strokeWidth="2" />
      </svg>
    ),
    // 4. Shine icon
    (
      <svg key="icon-4" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c0 4.5-3.5 8-8 8 4.5 0 8 3.5 8 8 0-4.5 3.5-8 8-8-4.5 0-8-3.5-8-8z" />
        <path d="M19 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" strokeWidth="1.3" />
      </svg>
    )
  ];

  return (
    <section 
      id="benefices"
      style={{
        position: 'relative',
        padding: '70px 20px 80px',
        background: 'linear-gradient(180deg, #fdf4f7 0%, #faeaf0 50%, #fef5f8 100%)',
        borderTop: '1px solid rgba(182, 93, 126, 0.12)',
        borderBottom: '1px solid rgba(182, 93, 126, 0.12)',
        overflow: 'hidden',
        direction: 'ltr'
      }}
    >
      <div style={{
        maxWidth: '1180px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>

        {/* Section Title & Subtitle */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{
            fontFamily: isRtl ? 'var(--font-arabic-heading)' : 'var(--font-serif)',
            fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
            fontWeight: 700,
            color: '#651735',
            letterSpacing: isRtl ? '0' : '-0.01em',
            margin: '0 0 10px 0',
            lineHeight: '1.2'
          }}>
            {t.whyChoose.title}
          </h2>

          <p style={{
            fontSize: 'clamp(0.95rem, 1.35vw, 1.1rem)',
            color: '#682e44',
            fontWeight: 500,
            margin: 0,
            opacity: 0.95
          }}>
            {t.whyChoose.subtitle}
          </p>
        </div>

        {/* 4 Pillars Horizontal Row with Dividers */}
        <div 
          className="why-choose-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            alignItems: 'flex-start',
            position: 'relative'
          }}
        >
          {t.whyChoose.items.map((item, index) => (
            <div
              key={index}
              className="why-choose-col"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '10px 16px',
                position: 'relative',
                borderInlineEnd: index < t.whyChoose.items.length - 1 ? '1px solid rgba(182, 93, 126, 0.22)' : 'none',
                transition: 'transform 0.3s ease'
              }}
            >
              {/* Circular Icon Container */}
              <div 
                className="why-choose-icon-wrapper"
                style={{
                  position: 'relative',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #be5f83 0%, #a4486d 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                  boxShadow: '0 10px 25px rgba(164, 72, 109, 0.32), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {icons[index]}
              </div>

              {/* Title */}
              <h3 
                className="why-choose-item-title"
                style={{
                  fontSize: '1.24rem',
                  fontWeight: 700,
                  color: '#651735',
                  margin: '0 0 6px 0'
                }}
              >
                {item.title}
              </h3>

              {/* Subtext description */}
              <p 
                className="why-choose-item-desc"
                style={{
                  fontSize: '0.92rem',
                  color: '#6e2b44',
                  lineHeight: '1.4',
                  margin: 0,
                  maxWidth: '180px',
                  fontWeight: 500
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Responsive & Hover Styles */}
      <style>{`
        .why-choose-icon-wrapper:hover {
          transform: translateY(-5px) scale(1.06);
          box-shadow: 0 16px 32px rgba(164, 72, 109, 0.45), inset 0 2px 6px rgba(255, 255, 255, 0.6);
        }
        @media (max-width: 920px) {
          .why-choose-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            row-gap: 28px;
          }
          .why-choose-col:nth-child(1),
          .why-choose-col:nth-child(3) {
            border-inline-end: 1px solid rgba(182, 93, 126, 0.22) !important;
          }
          .why-choose-col:nth-child(2),
          .why-choose-col:nth-child(4) {
            border-inline-end: none !important;
          }
          .why-choose-col:nth-child(1),
          .why-choose-col:nth-child(2) {
            border-bottom: 1px solid rgba(182, 93, 126, 0.18) !important;
            padding-bottom: 24px !important;
          }
          .why-choose-col:nth-child(3),
          .why-choose-col:nth-child(4) {
            border-bottom: none !important;
            padding-top: 6px !important;
          }
        }
        @media (max-width: 520px) {
          .why-choose-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            row-gap: 18px;
          }
          .why-choose-col {
            padding: 6px 10px !important;
          }
          .why-choose-col:nth-child(1),
          .why-choose-col:nth-child(3) {
            border-inline-end: 1px solid rgba(182, 93, 126, 0.22) !important;
          }
          .why-choose-col:nth-child(2),
          .why-choose-col:nth-child(4) {
            border-inline-end: none !important;
          }
          .why-choose-col:nth-child(1),
          .why-choose-col:nth-child(2) {
            border-bottom: 1px solid rgba(182, 93, 126, 0.18) !important;
            padding-bottom: 18px !important;
          }
          .why-choose-col:nth-child(3),
          .why-choose-col:nth-child(4) {
            border-bottom: none !important;
            padding-top: 6px !important;
          }
          .why-choose-icon-wrapper {
            width: 64px !important;
            height: 64px !important;
            margin-bottom: 10px !important;
          }
          .why-choose-icon-wrapper svg {
            width: 24px !important;
            height: 24px !important;
          }
          .why-choose-item-title {
            font-size: 1.05rem !important;
            margin-bottom: 4px !important;
          }
          .why-choose-item-desc {
            font-size: 0.82rem !important;
            line-height: 1.35 !important;
            max-width: 150px !important;
          }
        }
        @media (max-width: 375px) {
          .why-choose-col {
            padding: 4px 6px !important;
          }
          .why-choose-icon-wrapper {
            width: 56px !important;
            height: 56px !important;
            margin-bottom: 8px !important;
          }
          .why-choose-icon-wrapper svg {
            width: 22px !important;
            height: 22px !important;
          }
          .why-choose-item-title {
            font-size: 0.95rem !important;
          }
          .why-choose-item-desc {
            font-size: 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
}
