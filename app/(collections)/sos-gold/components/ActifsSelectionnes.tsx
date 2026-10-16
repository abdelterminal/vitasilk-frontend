"use client";

import arganImg from '../assets/ingredient-argan-gen.png';
import kariteImg from '../assets/ingredient-karite-gen.png';
import vitamineImg from '../assets/ingredient-vitamine-e-gen.png';
import shadowLeft from '../assets/shadow-left-clean.png';
import shadowRight from '../assets/shadow-right-clean.png';
import { useLanguage } from '../lib/LanguageContext';

export default function ActifsSelectionnes() {
  const { t } = useLanguage();

  const ingredients = [
    {
      name: t.actifs.item1Name,
      benefit: t.actifs.item1Benefit,
      image: arganImg,
      alt: "Huile d'argan"
    },
    {
      name: t.actifs.item2Name,
      benefit: t.actifs.item2Benefit,
      image: kariteImg,
      alt: "Beurre de karité"
    },
    {
      name: t.actifs.item3Name,
      benefit: t.actifs.item3Benefit,
      image: vitamineImg,
      alt: "Vitamine E"
    }
  ];

  return (
    <section id="actifs" className="section-actifs-selectionnes">
      {/* Botanical palm shadow decorations */}
      <img src={shadowLeft.src} alt="" className="botanical-shadow-left" aria-hidden="true" />
      <img src={shadowRight.src} alt="" className="botanical-shadow-right" aria-hidden="true" />

      <div className="container actifs-container">
        
        {/* Centered Section Header */}
        <div className="actifs-header text-center">
          <h2 className="actifs-title">{t.actifs.title}</h2>
          <p className="actifs-subtitle">
            {t.actifs.subtitle}
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="actifs-grid">
          {ingredients.map((item, index) => (
            <div key={index} className="actif-card">
              <div className="actif-image-wrapper">
                <img 
                  src={item.image.src} 
                  alt={item.alt} 
                  className="actif-img"
                />
              </div>
              <h3 className="actif-name">{item.name}</h3>
              <p className="actif-benefit">{item.benefit}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
