"use client";

import ingredientsBg from '../assets/ingredients-bg.webp';
import { useLanguage } from '../lib/LanguageContext';

export default function IngredientsSection() {
  const { t, isRtl } = useLanguage();

  const icons = [
    // 1. Leaf icon (Neem)
    (
      <svg key="icon-1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    // 2. Rose / Drop icon (Rose de Damas)
    (
      <svg key="icon-2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 0 1 5 5c0 3-5 9-5 9s-5-6-5-9a5 5 0 0 1 5-5z" />
        <circle cx="12" cy="7" r="2" />
      </svg>
    ),
    // 3. Coco drop icon (Huile de coco)
    (
      <svg key="icon-3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        <circle cx="12" cy="14" r="2.5" />
      </svg>
    ),
    // 4. Argan drop sparkle icon (Huile d'argan)
    (
      <svg key="icon-4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        <path d="M12 10v4M10 12h4" strokeWidth="1.6" />
      </svg>
    ),
    // 5. Shield silk icon (Protéines de soie)
    (
      <svg key="icon-5" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" strokeWidth="1.6" />
      </svg>
    ),
    // 6. Vitamines sparkles icon (Vitamines +20)
    (
      <svg key="icon-6" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c0 4.5-3.5 8-8 8 4.5 0 8 3.5 8 8 0-4.5 3.5-8 8-8-4.5 0-8-3.5-8-8z" />
        <path d="M19 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" strokeWidth="1.3" />
      </svg>
    )
  ];

  return (
    <section
      id="ingredients"
      className="ingredients-section"
      style={{
        position: 'relative',
        minHeight: '520px',
        display: 'flex',
        alignItems: 'center',
        padding: '70px 0',
        backgroundColor: '#fae3ec',
        backgroundImage: `url(${ingredientsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundRepeat: 'no-repeat',
        borderTop: '1px solid rgba(182, 93, 126, 0.12)',
        borderBottom: '1px solid rgba(182, 93, 126, 0.12)',
        overflow: 'hidden',
        direction: 'ltr' /* Keep outer layout LTR so text content is always on the left and jar on the right */
      }}
    >
      {/* Readability gradient overlay - Strong on the left over text, transparent on the right over cream jar */}
      <div
        className="ingredients-bg-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, rgba(254, 241, 246, 0.96) 0%, rgba(254, 241, 246, 0.90) 46%, rgba(254, 241, 246, 0.25) 72%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 24px',
        width: '100%',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Content Container - Stays anchored to the left in both languages */}
        <div 
          style={{
            maxWidth: '560px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            direction: 'ltr',
            textAlign: isRtl ? 'right' : 'left'
          }} 
          className="ingredients-content-box"
        >

          {/* Headline */}
          <h2 style={{
            fontFamily: isRtl ? 'var(--font-arabic-heading)' : 'var(--font-serif)',
            fontSize: 'clamp(2rem, 3.2vw, 2.85rem)',
            fontWeight: 700,
            lineHeight: '1.18',
            color: '#651735',
            letterSpacing: isRtl ? '0' : '-0.01em',
            margin: '0 0 14px 0',
            width: '100%'
          }}>
            {t.ingredients.title}
          </h2>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(0.95rem, 1.2vw, 1.06rem)',
            lineHeight: '1.6',
            color: '#6e2b44',
            margin: '0 0 20px 0',
            fontWeight: 400,
            width: '100%'
          }}>
            {t.ingredients.desc}
          </p>

          {/* Ribbon divider */}
          <div style={{ 
            margin: '0 0 24px 0', 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: isRtl ? 'flex-start' : 'flex-start',
            width: '100%'
          }}>
            <svg width="110" height="20" viewBox="0 0 110 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 10C22 10 32 6 46 10C48 10.5 50 11.5 51 13C52.5 15.5 56.5 15.5 58 13C59 11.5 61 10.5 63 10C77 6 87 10 105 10" stroke="#b65f83" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="54.5" cy="10" r="3" stroke="#b65f83" strokeWidth="1.4" fill="#faeaf0" />
            </svg>
          </div>

          {/* Badges Grid - 3 columns, 2 rows with clear vertical separation */}
          <div
            className="ingredients-badges-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              columnGap: '12px',
              rowGap: '26px',
              width: '100%',
              maxWidth: '480px',
              alignItems: 'start'
            }}
          >
            {t.ingredients.items.map((ing, idx) => (
              <div
                key={idx}
                className="ingredient-badge-item"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '0 6px',
                  borderInlineEnd: (idx % 3 !== 2) ? '1px solid rgba(182, 93, 126, 0.24)' : 'none',
                  position: 'relative'
                }}
              >
                {/* Round Mauve Circle Icon */}
                <div
                  className="ingredient-circle-btn"
                  style={{
                    width: '58px',
                    height: '58px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #be5f83 0%, #a4486d 100%)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    boxShadow: '0 8px 20px rgba(164, 72, 109, 0.28), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  {icons[idx % icons.length]}
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: 'clamp(0.88rem, 2.2vw, 1rem)',
                  fontWeight: 700,
                  color: '#651735',
                  margin: '0 0 4px 0',
                  lineHeight: '1.2',
                  minHeight: '2.4em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {ing.title}
                </h3>

                {/* Subtext */}
                <p style={{
                  fontSize: 'clamp(0.74rem, 1.8vw, 0.82rem)',
                  color: '#6e2b44',
                  margin: 0,
                  lineHeight: '1.25',
                  fontWeight: 500
                }}>
                  {ing.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Embedded Styles */}
      <style>{`
        .ingredient-circle-btn:hover {
          transform: translateY(-4px) scale(1.08);
          box-shadow: 0 14px 28px rgba(164, 72, 109, 0.45);
        }
        @media (max-width: 860px) {
          .ingredients-bg-overlay {
            background: rgba(254, 241, 246, 0.94) !important;
          }
          .ingredients-content-box {
            max-width: 100% !important;
            align-items: center !important;
            text-align: center !important;
            margin: 0 auto !important;
          }
          .ingredients-badges-grid {
            margin: 0 auto !important;
            row-gap: 24px !important;
            column-gap: 8px !important;
          }
        }
        @media (max-width: 768px) {
          .ingredients-section {
            display: none !important;
          }
        }
        @media (max-width: 520px) {
          .ingredients-badges-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            row-gap: 24px !important;
            column-gap: 4px !important;
          }
          .ingredient-badge-item {
            padding: 0 3px !important;
          }
          .ingredient-circle-btn {
            width: 48px !important;
            height: 48px !important;
            margin-bottom: 8px !important;
          }
          .ingredient-circle-btn svg {
            width: 20px !important;
            height: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
