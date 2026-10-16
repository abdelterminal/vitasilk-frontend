"use client";

import { useState } from 'react';
import detailsBg from '../assets/details-bg.webp';
import productPouch from '../assets/product-pouch.webp';
import detailTexture from '../assets/detail-texture.png';
import detailHair from '../assets/detail-hair.png';
import detailDrops from '../assets/detail-drops.png';
import { useLanguage } from '../lib/LanguageContext';

export default function ProductDetailsSection({ onOpenOrder }: { onOpenOrder: () => void }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { t, isRtl } = useLanguage();

  const images = [detailTexture, detailHair, detailDrops];

  return (
    <section
      id="puissance-soin"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '460px',
        backgroundColor: '#fae3ec',
        backgroundImage: `url(${detailsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderTop: '1px solid rgba(182, 93, 126, 0.12)',
        borderBottom: '1px solid rgba(182, 93, 126, 0.12)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: '50px 0',
        direction: 'ltr'
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: '1.25fr 0.75fr',
          alignItems: 'center',
          gap: '30px',
          position: 'relative',
          zIndex: 2
        }}
        className="details-section-grid"
      >

        {/* LEFT COLUMN: TITLE & 3 CIRCULAR DETAIL CARDS */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: '680px'
          }}
          className="details-left-content"
        >
          {/* Main Title */}
          <h2 style={{
            fontFamily: isRtl ? 'var(--font-arabic-heading)' : 'var(--font-serif)',
            fontSize: 'clamp(2rem, 3.2vw, 2.9rem)',
            fontWeight: 700,
            lineHeight: '1.18',
            color: '#651735',
            letterSpacing: isRtl ? '0' : '-0.01em',
            margin: '0 0 32px 0'
          }}>
            {t.details.titleLine1}<br />
            {t.details.titleLine2}
          </h2>

          {/* 3 Photographic Circle Details Row */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '18px',
              width: '100%',
              maxWidth: '600px',
              alignItems: 'flex-start'
            }}
            className="details-cards-row"
          >
            {t.details.items.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                className="detail-item-col"
              >
                {/* Photographic Circle Thumbnail */}
                <div 
                  style={{
                    width: '104px',
                    height: '104px',
                    borderRadius: '50%',
                    padding: '3px',
                    background: hoveredIdx === idx 
                      ? 'linear-gradient(135deg, #c7678d 0%, #a4486d 100%)' 
                      : 'rgba(255, 255, 255, 0.95)',
                    boxShadow: hoveredIdx === idx 
                      ? '0 12px 28px rgba(164, 72, 109, 0.35)' 
                      : '0 8px 20px rgba(120, 29, 62, 0.12)',
                    marginBottom: '12px',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: hoveredIdx === idx ? 'scale(1.08) translateY(-4px)' : 'scale(1)',
                    overflow: 'hidden'
                  }}
                  className="detail-circle-thumb"
                >
                  <img
                    src={images[idx].src}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>

                {/* Title */}
                <h3 
                  style={{
                    fontSize: 'clamp(0.95rem, 1.15vw, 1.08rem)',
                    fontWeight: 700,
                    color: '#651735',
                    margin: '0 0 4px 0',
                    lineHeight: '1.25'
                  }}
                  className="detail-item-title"
                >
                  {item.title}
                </h3>

                {/* Subtitle description */}
                <p 
                  style={{
                    fontSize: '0.84rem',
                    color: '#6e2b44',
                    margin: 0,
                    lineHeight: '1.35',
                    fontWeight: 500,
                    maxWidth: '150px'
                  }}
                  className="detail-item-desc"
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: 600G POUCH */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}
          className="details-right-product"
        >
          {/* Ambient Glow */}
          <div style={{
            position: 'absolute',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 200, 220, 0.6) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(25px)',
            pointerEvents: 'none'
          }} />

          {/* Product Pouch */}
          <div 
            style={{
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onClick={onOpenOrder}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
          >
            <img
              src={productPouch.src}
              alt="VitaPlex SOS Soin Capillaire 600g Pouch"
              style={{
                width: '100%',
                maxWidth: '360px',
                height: 'auto',
                maxHeight: '420px',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 18px 30px rgba(110, 20, 50, 0.22))'
              }}
            />
          </div>
        </div>

      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 900px) {
          .details-section-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .details-left-content {
            align-items: center !important;
            margin: 0 auto;
          }
          .details-cards-row {
            margin: 0 auto;
          }
          .details-right-product {
            margin-top: 15px;
          }
        }
        @media (max-width: 600px) {
          .details-cards-row {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 10px !important;
            width: 100% !important;
          }
          .detail-circle-thumb {
            width: 76px !important;
            height: 76px !important;
            margin-bottom: 8px !important;
          }
          .detail-item-title {
            font-size: 0.82rem !important;
            line-height: 1.2 !important;
          }
          .detail-item-desc {
            font-size: 0.72rem !important;
            line-height: 1.25 !important;
            max-width: 100% !important;
          }
        }
        @media (max-width: 380px) {
          .details-cards-row {
            gap: 6px !important;
          }
          .detail-circle-thumb {
            width: 66px !important;
            height: 66px !important;
          }
          .detail-item-title {
            font-size: 0.74rem !important;
          }
          .detail-item-desc {
            font-size: 0.67rem !important;
          }
        }
      `}</style>
    </section>
  );
}
