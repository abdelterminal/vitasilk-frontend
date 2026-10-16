"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import brandLogo from '../assets/brand-logo.png';

export default function TransformedHair({ onOrderClick }: { onOrderClick: () => void }) {
  const { t } = useLanguage();

return (
    <section className="transformed-hair-section">
      
      {/* Bottom Black CTA Bar */}
      <div className="transformed-bottom-bar">
        <div className="bottom-bar-container">
          
          {/* Brand Logo */}
          <div className="bar-brand">
            <img 
              src={brandLogo.src} 
              alt="Vitasilk Professional" 
              className="bar-brand-logo" 
            />
          </div>

          {/* Center Message */}
          <div className="bar-message">
            <h4 className="bar-heading">{t.transformed.barHeading}</h4>
            <p className="bar-subheading">{t.transformed.barSubheading}</p>
          </div>

          {/* Right CTA Button */}
          <div className="bar-action">
            <button 
              className="btn-bar-commander"
              onClick={onOrderClick}
            >
              <span>{t.transformed.barCta}</span>
              <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}
