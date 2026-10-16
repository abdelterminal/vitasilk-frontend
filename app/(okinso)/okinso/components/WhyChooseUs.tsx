"use client";

import React from 'react';
import { useLanguage } from '../lib/i18n';

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const features = [
    {
      id: 1,
      title: t.whyUs.item1Title,
      description: t.whyUs.item1Desc,
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="feature-svg-icon">
          {/* Hexagonal molecule structure */}
          <circle cx="24" cy="14" r="3" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="34" cy="20" r="3" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="34" cy="32" r="3" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="24" cy="38" r="3" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="14" cy="32" r="3" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="14" cy="20" r="3" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="24" cy="26" r="3.2" fill="currentColor" />
          
          {/* Bonds */}
          <line x1="24" y1="17" x2="24" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="29" x2="24" y2="35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="26.5" y1="24.5" x2="31.5" y2="21.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="26.5" y1="27.5" x2="31.5" y2="30.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="21.5" y1="24.5" x2="16.5" y2="21.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="21.5" y1="27.5" x2="16.5" y2="30.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          
          {/* Outer branches */}
          <line x1="24" y1="11" x2="24" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="24" cy="6" r="1.5" fill="currentColor" />
          <line x1="36.5" y1="18.5" x2="40" y2="16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="41" cy="16" r="1.5" fill="currentColor" />
          <line x1="36.5" y1="33.5" x2="40" y2="35.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="41" cy="36" r="1.5" fill="currentColor" />
          <line x1="11.5" y1="18.5" x2="8" y2="16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="7" cy="16" r="1.5" fill="currentColor" />
          <line x1="11.5" y1="33.5" x2="8" y2="35.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="7" cy="36" r="1.5" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 2,
      title: t.whyUs.item2Title,
      description: t.whyUs.item2Desc,
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="feature-svg-icon">
          {/* Elegant water drop with smooth curves */}
          <path 
            d="M24 10C24 10 14 23.5 14 30.5C14 36.0228 18.4772 40.5 24 40.5C29.5228 40.5 34 36.0228 34 30.5C34 23.5 24 10 24 10Z" 
            stroke="currentColor" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Inner droplet shine reflection */}
          <path 
            d="M20 28C20 25.5 22 23 24 22" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
          />
        </svg>
      )
    },
    {
      id: 3,
      title: (
        <>
          {t.whyUs.item3Title.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < t.whyUs.item3Title.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </>
      ),
      description: t.whyUs.item3Desc,
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="feature-svg-icon">
          {/* Sparkles & Star bursts */}
          <path 
            d="M24 12C24 18 20 22 14 22C20 22 24 26 24 32C24 26 28 22 34 22C28 22 24 18 24 12Z" 
            stroke="currentColor" 
            strokeWidth="2.2" 
            strokeLinejoin="round" 
          />
          <path 
            d="M36 12C36 14.5 34 16.5 31.5 16.5C34 16.5 36 18.5 36 21C36 18.5 38 16.5 40.5 16.5C38 16.5 36 14.5 36 12Z" 
            stroke="currentColor" 
            strokeWidth="1.8" 
            strokeLinejoin="round" 
          />
          <path 
            d="M17 33C17 34.5 15.5 36 14 36C15.5 36 17 37.5 17 39C17 37.5 18.5 36 20 36C18.5 36 17 34.5 17 33Z" 
            stroke="currentColor" 
            strokeWidth="1.6" 
            strokeLinejoin="round" 
          />
        </svg>
      )
    },
    {
      id: 4,
      title: t.whyUs.item4Title,
      description: t.whyUs.item4Desc,
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="feature-svg-icon">
          {/* 3 Silky hair strands flowing */}
          <path 
            d="M17 12C17 22 25 24 25 36" 
            stroke="currentColor" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
          />
          <path 
            d="M23 12C23 22 31 24 31 36" 
            stroke="currentColor" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
          />
          <path 
            d="M12 16C13.5 22 18 25 18 34" 
            stroke="currentColor" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
          />
          <path 
            d="M28 14C29.5 20 35 23 35 34" 
            stroke="currentColor" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
          />
        </svg>
      )
    }
  ];

  return (
    <section id="ingredients" className="why-vitasilk-section">
      <div className="why-vitasilk-container">
        
        {/* Section Header */}
        <div className="why-header">
          <span className="why-eyebrow">{t.whyUs.eyebrow}</span>
          <h2 className="why-title font-serif">{t.whyUs.title}</h2>
        </div>

        {/* 4 Feature Columns */}
        <div className="why-grid">
          {features.map((item, index) => (
            <div key={item.id} className={`why-card ${index !== features.length - 1 ? 'has-divider' : ''}`}>
              
              {/* Circle Badge with Pink Outline */}
              <div className="why-icon-circle">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="why-card-title font-serif">
                {item.title}
              </h3>

              {/* Description */}
              <p className="why-card-desc">
                {item.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
