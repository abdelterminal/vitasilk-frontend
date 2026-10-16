"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import step1Img from '../assets/step1-nobg.png';
import step2Img from '../assets/step2-nobg.webp';
import step3Img from '../assets/step3-nobg.png';
import step4Img from '../assets/step4-nobg.png';

export default function ProductSteps() {
  const { t } = useLanguage();

  const routineSteps = [
    {
      step: 1,
      title: t.steps.step1Title,
      image: step1Img,
      description: t.steps.step1Desc,
      volume: t.steps.volume
    },
    {
      step: 2,
      title: t.steps.step2Title,
      image: step2Img,
      description: t.steps.step2Desc,
      volume: t.steps.volume
    },
    {
      step: 3,
      title: t.steps.step3Title,
      image: step3Img,
      description: t.steps.step3Desc,
      volume: t.steps.volume
    },
    {
      step: 4,
      title: t.steps.step4Title,
      image: step4Img,
      description: t.steps.step4Desc,
      volume: t.steps.volume
    }
  ];

  return (
    <section id="produits" className="routine-steps-section">
      <div className="routine-container">
        
        {/* Section Header */}
        <div className="routine-header">
          <span className="routine-eyebrow">
            {t.steps.eyebrow}
          </span>
          <h2 className="routine-title font-serif">
            {t.steps.title}
          </h2>
        </div>

        {/* 4 Steps Row */}
        <div className="routine-cards-row">
          {routineSteps.map((item, index) => (
            <React.Fragment key={item.step}>
              
              {/* Step Item Column */}
              <div className="routine-step-col">
                
                {/* Product Cushion Container */}
                <div className="routine-cushion-container">
                  <img 
                    src={item.image.src} 
                    alt={`Étape ${item.step} - ${item.title}`} 
                    className="routine-studio-img"
                  />
                </div>

                {/* Step Header: Number Badge + Title */}
                <div className="routine-header-row">
                  <span className="step-badge-circle">{item.step}</span>
                  <h3 className="step-title-text">{item.title}</h3>
                </div>

                {/* Description */}
                <p className="routine-desc-text">
                  {item.description}
                </p>

                {/* Volume */}
                <span className="routine-vol-text">
                  {item.volume}
                </span>

              </div>

              {/* Pink Forward Chevron Between Steps */}
              {index < routineSteps.length - 1 && (
                <div className="routine-arrow-wrap" aria-hidden="true">
                  <ChevronRight size={22} strokeWidth={2} />
                </div>
              )}

            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}
