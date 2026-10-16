"use client";

import hairBg from '../assets/hair-results-bg.webp';
import girlImg from '../assets/girl-shiny-hair.webp';
import { Check } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function ResultsSection() {
  const { t, isRtl } = useLanguage();

  return (
    <section
      id="resultats"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#fae3ec',
        backgroundImage: `url(${hairBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center left',
        backgroundRepeat: 'no-repeat',
        borderTop: '1px solid rgba(182, 93, 126, 0.14)',
        borderBottom: '1px solid rgba(182, 93, 126, 0.14)',
        overflow: 'hidden',
        minHeight: '560px',
        display: 'flex',
        alignItems: 'center',
        direction: 'ltr'
      }}
      className="results-banner-section"
    >
      {/* Background Soft Overlay for Text Readability */}
      <div 
        className="results-mobile-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0
        }}
      />

      {/* Girl Image Layer - Full High Quality Image with Natural Head and Long Hair */}
      <div 
        className="results-girl-layer"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 'max(0px, calc(50% - 660px))',
          right: 'auto',
          height: '96%',
          maxHeight: '550px',
          width: '52%',
          maxWidth: '650px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          paddingTop: '20px',
          boxSizing: 'border-box',
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <img
          src={girlImg.src}
          alt={isRtl ? "شعر قوي ولامع" : "Cheveux visiblement plus forts et plus brillants"}
          style={{
            height: '100%',
            maxHeight: '530px',
            width: 'auto',
            objectFit: 'contain',
            objectPosition: 'bottom left',
            transform: 'none',
            display: 'block',
            filter: 'drop-shadow(0 14px 28px rgba(160, 60, 95, 0.14))'
          }}
          className="results-girl-img"
        />
      </div>

      {/* Container holding the text - Always Girl on Left, Text on Right */}
      <div 
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '30px 24px',
          display: 'grid',
          gridTemplateColumns: '48% 52%',
          alignItems: 'center',
          minHeight: '560px',
          position: 'relative',
          zIndex: 2,
          direction: 'ltr'
        }}
        className="results-banner-grid"
      >
        {/* Left Spacer - Reserves left column for the Girl */}
        <div className="results-left-spacer" style={{ height: '100%' }} />

        {/* Text, Bullets, and Signature on Right (both French & Arabic) */}
        <div 
          className="results-right-content"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '24px 20px',
            maxWidth: '560px',
            direction: 'ltr',
            textAlign: isRtl ? 'right' : 'left'
          }}
        >
          {/* Headline */}
          <h2 
            className="results-headline"
            style={{
              fontFamily: isRtl ? 'var(--font-arabic-heading)' : 'var(--font-serif)',
              fontSize: 'clamp(2.1rem, 3.1vw, 2.9rem)',
              fontWeight: 700,
              lineHeight: '1.25',
              color: '#701c3e',
              letterSpacing: isRtl ? '0' : '-0.01em',
              margin: '0 0 24px 0',
              textShadow: '0 1px 4px rgba(255, 255, 255, 0.9)'
            }}
          >
            {t.results.titleLine1}<br />
            {t.results.titleLine2}
          </h2>

          {/* 4 Checkmark Bullets */}
          <div 
            className="results-bullets-list"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              alignItems: isRtl ? 'flex-end' : 'stretch',
              marginBottom: '26px'
            }}
          >
            {t.results.bullets.map((text, idx) => (
              <div
                key={idx}
                className="results-bullet-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  direction: isRtl ? 'rtl' : 'ltr',
                  width: '100%',
                  textAlign: isRtl ? 'right' : 'left'
                }}
              >
                {/* Circular Mauve Checkmark Icon */}
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    minWidth: '30px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #b95d80 0%, #9e4468 100%)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 3px 10px rgba(158, 68, 104, 0.28)',
                    flexShrink: 0
                  }}
                >
                  <Check size={16} strokeWidth={2.8} />
                </div>

                {/* Bullet text */}
                <span 
                  className="results-bullet-text"
                  style={{
                    fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                    fontWeight: 600,
                    color: '#461427'
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Cursive Tagline Signature */}
          <div 
            style={{
              alignSelf: 'flex-end',
              marginInlineEnd: '20px',
              marginInlineStart: '0',
              textAlign: isRtl ? 'right' : 'right',
              transform: isRtl ? 'rotate(-2deg)' : 'rotate(-3deg)'
            }}
            className="results-tagline-box"
          >
            <p 
              className="font-cursive-styled"
              style={{
                fontFamily: isRtl ? 'var(--font-arabic-cursive)' : 'var(--font-cursive)',
                fontSize: isRtl ? 'clamp(1.45rem, 2.2vw, 2rem)' : 'clamp(1.85rem, 2.5vw, 2.45rem)',
                color: '#933d60',
                lineHeight: '1.25',
                margin: 0,
                fontStyle: isRtl ? 'normal' : 'italic',
                textShadow: '0 2px 4px rgba(255, 255, 255, 0.95)'
              }}
            >
              {t.results.tagline1}<br />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                {t.results.tagline2} <span style={{ fontSize: '1.2rem', color: '#933d60' }}>♥</span>
              </span>
            </p>
          </div>

        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (min-width: 900px) {
          .results-banner-section {
            display: none !important;
          }
        }
        @media (max-width: 960px) {
          .results-banner-section {
            min-height: 480px !important;
          }
          .results-banner-grid {
            min-height: 480px !important;
            padding: 30px 20px !important;
          }
          .results-girl-layer {
            height: 100% !important;
            max-height: 480px !important;
          }
          .results-girl-img {
            max-height: 480px !important;
          }
        }
        @media (max-width: 860px) {
          .results-banner-section {
            min-height: 480px !important;
            padding: 35px 18px !important;
          }
          .results-mobile-overlay {
            opacity: 1 !important;
            background: linear-gradient(90deg, rgba(254, 241, 246, 0.4) 0%, rgba(254, 241, 246, 0.88) 45%, rgba(254, 241, 246, 0.98) 100%) !important;
          }
          .results-banner-grid {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
            padding: 0 !important;
          }
          /* Girl stays crisp and visible in the background on the left */
          .results-girl-layer {
            position: absolute !important;
            bottom: 0 !important;
            left: -15px !important;
            right: auto !important;
            width: 70% !important;
            max-width: 360px !important;
            height: 100% !important;
            max-height: 460px !important;
            display: flex !important;
            align-items: flex-end !important;
            justifyContent: flex-start !important;
            z-index: 1 !important;
            opacity: 1 !important;
          }
          .results-girl-img {
            height: 100% !important;
            width: auto !important;
            max-height: 450px !important;
            object-fit: contain !important;
            object-position: bottom left !important;
          }
          .results-left-spacer {
            display: none !important;
          }
          /* Clean transparent layout on mobile */
          .results-right-content {
            background: transparent !important;
            backdrop-filter: none !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
          .results-bullet-row {
            background: rgba(255, 255, 255, 0.76) !important;
            backdrop-filter: blur(8px) !important;
            padding-block: 6px !important;
            padding-inline: 6px 14px !important;
            border-radius: 9999px !important;
            border: 1px solid rgba(255, 255, 255, 0.9) !important;
            box-shadow: 0 3px 10px rgba(120, 29, 62, 0.06) !important;
            width: fit-content !important;
            max-width: 90% !important;
          }
        }
        @media (max-width: 500px) {
          .results-banner-section {
            min-height: 470px !important;
            padding: 30px 16px !important;
          }
          .results-girl-layer {
            width: 78% !important;
            max-width: 310px !important;
            height: 100% !important;
            max-height: 440px !important;
            left: -20px !important;
            right: auto !important;
          }
          .results-girl-img {
            max-height: 430px !important;
          }
          .results-headline {
            font-size: 1.85rem !important;
            margin-bottom: 18px !important;
          }
          .results-bullet-row {
            gap: 10px !important;
            padding-block: 5px !important;
            padding-inline: 5px 12px !important;
            max-width: 90% !important;
          }
          .results-bullet-text {
            font-size: 0.92rem !important;
          }
        }
      `}</style>
    </section>
  );
}

