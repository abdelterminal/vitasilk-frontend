"use client";

import bgPourquoi from '../assets/bg-pourquoi-choisir.jpg';
import flourishImg from '../assets/flourish-hd.png';
import { useLanguage } from '../lib/LanguageContext';

export default function PourquoiChoisir() {
  const { t, lang } = useLanguage();

  const points = [
    t.pourquoi.point1,
    t.pourquoi.point2,
    t.pourquoi.point3,
    t.pourquoi.point4,
    t.pourquoi.point5
  ];

  return (
    <section 
      className="section-pourquoi-choisir"
      style={{ backgroundImage: `url(${bgPourquoi.src})` }}
    >
      <div className="pourquoi-lighting-overlay" />

      <div className="container pourquoi-container">
        
        {/* Left Column Spacer */}
        <div className="pourquoi-left-spacer" aria-hidden="true" />

        {/* Right Content Column */}
        <div className="pourquoi-content-col" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          
          <h2 className="pourquoi-title">
            <span className="pourquoi-line-1">{t.pourquoi.titleLine1}</span>
            <span className="pourquoi-line-2">{t.pourquoi.titleLine2}</span>
          </h2>

          <ul className="pourquoi-points-list">
            {points.map((point, index) => (
              <li key={index} className="pourquoi-point-item">
                <span className="pourquoi-check-icon">✓</span>
                <span className="pourquoi-point-text">{point}</span>
              </li>
            ))}
          </ul>

          <div className="pourquoi-flourish-wrapper">
            <img 
              src={flourishImg.src} 
              alt="" 
              className="pourquoi-flourish-img" 
            />
          </div>

          <div className="pourquoi-signature-box">
            <p className="pourquoi-cursive-text">
              {t.pourquoi.cursive}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
