"use client";

import bgFormule from '../assets/bg-formule-puissante.webp';
import iconRepare from '../assets/icon-repare-hd.png';
import iconHydrate from '../assets/icon-hydrate-hd.png';
import iconProtege from '../assets/icon-protege-hd.png';
import iconBrillance from '../assets/icon-brillance-hd.png';
import flourishImg from '../assets/flourish-hd.png';
import { useLanguage } from '../lib/LanguageContext';

export default function FormulePuissante() {
  const { t, lang } = useLanguage();

  const points = [
    {
      title: t.formule.point1Title,
      subtitle: t.formule.point1Sub,
      icon: iconRepare,
    },
    {
      title: t.formule.point2Title,
      subtitle: t.formule.point2Sub,
      icon: iconHydrate,
    },
    {
      title: t.formule.point3Title,
      subtitle: t.formule.point3Sub,
      icon: iconProtege,
    },
    {
      title: t.formule.point4Title,
      subtitle: t.formule.point4Sub,
      icon: iconBrillance,
    }
  ];

  return (
    <section 
      id="formule"
      className="section-formule-puissante"
      style={{ backgroundImage: `url(${bgFormule.src})` }}
    >
      <div className="container formule-container">
        
        {/* Left Column: Heading, description, handwriting, flourish */}
        <div className="formule-left-col" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <h2 className="formule-heading">
            <span className="heading-line-1">{t.formule.titleLine1}</span>
            <span className="heading-line-2">{t.formule.titleLine2}</span>
          </h2>

          <p className="formule-desc">
            {t.formule.description}
          </p>

          <div className="formule-signature-box">
            <p className="formule-cursive-text">
              {t.formule.cursive}
            </p>
            <img 
              src={flourishImg.src} 
              alt="" 
              className="formule-flourish-img" 
            />
          </div>
        </div>

        {/* Middle Column: 4 Circular Points */}
        <div className="formule-center-col" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="formule-points-list">
            {points.map((point, index) => (
              <div key={index} className="formule-point-item" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <div className="point-icon-wrapper">
                  <img 
                    src={point.icon.src} 
                    alt={point.title} 
                    className="point-icon-img" 
                  />
                </div>
                <div className="point-text">
                  <h3 className="point-title">{point.title}</h3>
                  <p className="point-subtitle">{point.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column empty spacer reserved for the background droplet */}
        <div className="formule-right-space" aria-hidden="true" />

      </div>
    </section>
  );
}
