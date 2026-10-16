"use client";

import routineBg from '../assets/routine-banner-composite.webp';
import { useLanguage } from '../lib/LanguageContext';

export default function HowToUse() {
  const { t, isRtl } = useLanguage();

  const stepIcons = [
    // Step 1: Woman applying hair mask
    (
      <svg key="icon-1" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#be5f83" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4a5 5 0 0 0-5 5c0 3 2 6 5 6s5-3 5-6a5 5 0 0 0-5-5z"/>
        <path d="M7 9c-1.5 2-2 5-1 8"/>
        <path d="M17 9c1.5 2 2 5 1 8"/>
        <path d="M9 19c1.5 1.5 4.5 1.5 6 0"/>
        <path d="M10 2c1 0 2 1 2 2"/>
      </svg>
    ),
    // Step 2: Timer
    (
      <svg key="icon-2" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#be5f83" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="13" r="8"/>
        <polyline points="12 9 12 13 15 15"/>
        <path d="M12 5V3"/>
        <path d="M10 3h4"/>
      </svg>
    ),
    // Step 3: Water Rinse
    (
      <svg key="icon-3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#be5f83" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3c0 4-2 6-2 10s2 6 2 8"/>
        <path d="M12 3c0 4-2 6-2 10s2 6 2 8"/>
        <path d="M16 3c0 4-2 6-2 10s2 6 2 8"/>
        <path d="M7 6c2-1 4-1 6 0"/>
      </svg>
    )
  ];

  return (
    <section
      id="routine"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '440px',
        backgroundColor: '#fae3ec',
        backgroundImage: `url(${routineBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundRepeat: 'no-repeat',
        borderTop: '1px solid rgba(182, 93, 126, 0.12)',
        borderBottom: '1px solid rgba(182, 93, 126, 0.12)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: '55px 0',
        direction: 'ltr'
      }}
      className="routine-banner-section"
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}
        className="routine-section-grid"
      >
        {/* LTR Content on Left */}
        {(
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              maxWidth: '680px'
            }}
            className="routine-left-content"
          >
            {/* Main Title */}
            <h2 style={{
              fontFamily: isRtl ? 'var(--font-arabic-heading)' : 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.2vw, 2.9rem)',
              fontWeight: 700,
              lineHeight: '1.18',
              color: '#651735',
              letterSpacing: isRtl ? '0' : '-0.01em',
              margin: '0 0 30px 0'
            }}>
              {t.howToUse.titleLine1}<br />
              {t.howToUse.titleLine2}
            </h2>

            {/* 3 Step Icons Row */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                width: '100%',
                maxWidth: '560px',
                alignItems: 'flex-start'
              }}
              className="routine-steps-row"
            >
              {t.howToUse.steps.map((s, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '0 12px',
                    borderInlineEnd: idx < t.howToUse.steps.length - 1 ? '1px solid rgba(182, 93, 126, 0.22)' : 'none',
                    position: 'relative',
                    transition: 'transform 0.3s ease'
                  }}
                  className="routine-step-col"
                >
                  {/* Number Badge */}
                  <div style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '-6px',
                      insetInlineStart: '-14px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#be5f83',
                      color: '#fff',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(190, 95, 131, 0.3)'
                    }}>
                      {s.num}
                    </div>

                    <div style={{
                      width: '54px',
                      height: '54px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {stepIcons[idx]}
                    </div>
                  </div>

                  <h3 style={{
                    fontSize: 'clamp(0.98rem, 1.15vw, 1.1rem)',
                    fontWeight: 700,
                    color: '#651735',
                    margin: '0 0 4px 0',
                    lineHeight: '1.25'
                  }}>
                    {s.title}
                  </h3>

                  <p style={{
                    fontSize: '0.82rem',
                    color: '#6e2b44',
                    margin: 0,
                    lineHeight: '1.35',
                    fontWeight: 500,
                    maxWidth: '140px'
                  }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Keep the same image space for both languages. */}
        <div className="routine-right-spacer" style={{ height: '100%' }} />

      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 899px) {
          .routine-banner-section {
            display: none !important;
          }
        }
        @media (max-width: 860px) {
          .routine-banner-section {
            background-position: 70% center !important;
          }
          .routine-section-grid {
            grid-template-columns: 1fr !important;
            padding: 30px 20px !important;
          }
          .routine-right-spacer {
            display: none !important;
          }
          .routine-left-content {
            padding: 24px !important;
            background: rgba(254, 241, 246, 0.92) !important;
            backdrop-filter: blur(8px) !important;
            border-radius: 20px !important;
            border: 1px solid rgba(182, 93, 126, 0.2) !important;
            margin: 0 auto !important;
            text-align: center !important;
            align-items: center !important;
          }
          .routine-steps-row {
            margin: 0 auto !important;
          }
        }
        @media (max-width: 520px) {
          .routine-steps-row {
            grid-template-columns: 1fr !important;
            row-gap: 18px !important;
          }
          .routine-step-col {
            border-inline-end: none !important;
            border-bottom: 1px solid rgba(182, 93, 126, 0.15) !important;
            padding-bottom: 14px !important;
          }
          .routine-step-col:last-child {
            border-bottom: none !important;
            padding-bottom: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
