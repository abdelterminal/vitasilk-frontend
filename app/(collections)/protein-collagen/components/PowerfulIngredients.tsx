"use client";

import React from 'react';
import { useLanguage } from '../lib/i18n';
import bannerBg from '../assets/powerful-ingredients-banner.webp';
import dropletMobile from '../assets/ingredient-droplet-clean.png';

export default function PowerfulIngredients() {
  const { t } = useLanguage();

  const titleLines = t.powerful.title.split('\n');

  return (
    <section
      id="puissants-ingredients"
      className="powerful-ingredients-section"
      style={{ '--mobile-ingredients-background': `url(${dropletMobile.src})` } as React.CSSProperties}
    >
      {/* Background Banner Image */}
      <div 
        className="powerful-bg-banner" 
        style={{ backgroundImage: `url(${bannerBg.src})` }}
      />

      <div className="powerful-container">
        
        {/* Right Content Area */}
        <div className="powerful-content-area">
          <span className="powerful-eyebrow">
            {t.powerful.eyebrow}
          </span>

          <h2 className="powerful-title font-serif">
            {titleLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>

          <p className="powerful-desc">
            {t.powerful.desc}
          </p>
        </div>

      </div>
    </section>
  );
}
