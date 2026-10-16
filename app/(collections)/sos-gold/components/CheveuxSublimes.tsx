"use client";

import imgCheveux from '../assets/cheveux-brillants.webp';
import imgApplication from '../assets/application-soin.webp';
import { useLanguage } from '../lib/LanguageContext';

export default function CheveuxSublimes() {
  const { t } = useLanguage();

  const badges = [
    {
      name: t.cheveux.badge1,
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" className="cheveux-badge-svg">
          <path 
            d="M12 25C12 25 8 19 8 13C8 8 12 4.5 17.5 3.5C17.5 9.5 16.5 16.5 12 25Z" 
            strokeWidth="1.4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M13 15C16 13 19.5 12.5 23.5 13C23.5 17 21 21 16.5 23" 
            strokeWidth="1.4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M10 26C12 23 15 20 18 17" 
            strokeWidth="1.4" 
            strokeLinecap="round" 
          />
        </svg>
      )
    },
    {
      name: t.cheveux.badge2,
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" className="cheveux-badge-svg">
          <path 
            d="M16 4C16 4 7 15 7 21C7 25.97 11.03 30 16 30C20.97 30 25 25.97 25 21C25 15 16 4 16 4Z" 
            strokeWidth="1.4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M13 18C13 15.8 14.8 14 17 13.5" 
            strokeWidth="1.4" 
            strokeLinecap="round" 
          />
        </svg>
      )
    },
    {
      name: t.cheveux.badge3,
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" className="cheveux-badge-svg">
          <path 
            d="M16 3.5L26 7.5V15.5C26 22 21.5 27 16 28.5C10.5 27 6 22 6 15.5V7.5L16 3.5Z" 
            strokeWidth="1.4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M12 15.5L15 18.5L20.5 12.5" 
            strokeWidth="1.4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      )
    }
  ];

  return (
    <section className="section-cheveux-sublimes">
      <div className="cheveux-layout-wrapper">
        
        {/* Left Visual: Glossy Hair */}
        <div className="cheveux-visual-col left-visual">
          <img 
            src={imgCheveux.src} 
            alt="Chevelure brillante" 
            className="cheveux-img-cover" 
          />
        </div>

        {/* Center Content Column */}
        <div className="cheveux-center-col">
          <div className="cheveux-center-inner">
            
            <h2 className="cheveux-title">
              <span className="title-line">{t.cheveux.titleLine1}</span>
              <span className="title-line">{t.cheveux.titleLine2}</span>
            </h2>

            <p className="cheveux-subtitle">
              {t.cheveux.subtitle}
            </p>

            <div className="cheveux-badges-row">
              {badges.map((badge, idx) => (
                <div key={idx} className="cheveux-badge-item">
                  <div className="badge-icon-box">
                    {badge.icon}
                  </div>
                  <span className="badge-label">{badge.name}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Visual: Application ritual */}
        <div className="cheveux-visual-col right-visual">
          <img 
            src={imgApplication.src} 
            alt="Application du Soin Capillaire" 
            className="cheveux-img-cover" 
          />
        </div>

      </div>
    </section>
  );
}
