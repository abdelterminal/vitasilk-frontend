"use client";

import { ArrowRight } from 'lucide-react';
import bgCtaGoldenSatin from '../assets/bg-cta-golden-satin.jpg';
import productPouchNobg from '../assets/product-pouch-nobg.webp';
import { useLanguage } from '../lib/LanguageContext';

export default function CtaRedonnerVie({ onOpenOrder }: { onOpenOrder: () => void }) {
  const { t } = useLanguage();

  return (
    <section className="section-cta-redonner-vie" style={{ backgroundImage: `url(${bgCtaGoldenSatin.src})` }}>
      <div className="container cta-redonner-container">
        
        {/* Left column: Product pouch with background removed */}
        <div className="cta-product-col">
          <div className="cta-pouch-wrapper">
            <img 
              src={productPouchNobg.src} 
              alt="Soin Capillaire Vitasilk Professional" 
              className="cta-product-nobg-img" 
            />
          </div>
        </div>

        {/* Right column: Text & CTA button */}
        <div className="cta-content-col">
          <h2 className="cta-banner-title">
            <span className="cta-title-line-1">{t.ctaBanner.titleLine1}</span>
            <span className="cta-title-line-2">{t.ctaBanner.titleLine2}</span>
          </h2>
          
          <p className="cta-banner-subtitle">
            {t.ctaBanner.subtitleLine1}<br />
            {t.ctaBanner.subtitleLine2}
          </p>

          <button onClick={onOpenOrder} className="cta-banner-btn">
            <span>{t.ctaBanner.btn}</span>
            <ArrowRight size={18} className="cta-arrow-icon" />
          </button>
        </div>

      </div>
    </section>
  );
}
