"use client";

import bgHero from '../assets/bg-hero.jpg';
import { ArrowRight, Star } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Hero({ onOpenOrder }: { onOpenOrder: () => void }) {
  const { t, lang } = useLanguage();

  return (
    <section id="accueil" className="hero-section">
      {/* Background Image Container */}
      <div 
        className="hero-background"
        style={{ backgroundImage: `url(${bgHero.src})` }}
      >
        <div className="hero-lighting-overlay" />
      </div>

      <div className="container hero-container">
        {/* Main Content Column */}
        <div className="hero-content" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          
          {/* Top Header Block */}
          <div className="hero-header-block">
            {/* Trust Rating Badge */}
            <div className="hero-trust-badge">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="#C59853" color="#C59853" />
                ))}
              </div>
              <span className="trust-text">{t.hero.trust}</span>
            </div>

            {/* Overline Tag */}
            {t.hero.overline && (
              <p className="hero-overline">
                {t.hero.overline}
              </p>
            )}

            {/* Main Hero Heading */}
            <h1 className="hero-title">
              <span className="title-primary">{t.hero.title1}</span>
              {t.hero.title2 && (
                <span className="title-secondary">{t.hero.title2}</span>
              )}
            </h1>
          </div>

          {/* Description / Subtitle (Desktop only) */}
          <p className="hero-description">
            {t.hero.description}
          </p>

          {/* Mobile Product Visual Spacer & Floating Luxury Badges */}
          <div className="hero-mobile-product-spacer" aria-hidden="true">
            <div className="hero-floating-pill pill-left">
              <span className="pill-dot" />
              <span>{t.hero.pillLeft}</span>
            </div>
            <div className="hero-floating-pill pill-right">
              <span className="pill-star">✨</span>
              <span>{t.hero.pillRight}</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hero-cta-wrapper">
            <button 
              onClick={onOpenOrder} 
              className="hero-cta-btn"
              id="hero-order-button"
            >
              <span>{t.hero.cta}</span>
              <div className="arrow-circle">
                <ArrowRight size={18} className="arrow-icon" />
              </div>
            </button>
          </div>

          {/* 3 Feature Badges */}
          <div className="hero-features-grid">
            
            {/* Feature 1: Sans sulfate */}
            <div className="feature-badge-item">
              <div className="feature-icon-wrapper">
                <svg 
                  className="feature-svg" 
                  viewBox="0 0 32 32" 
                  fill="none" 
                  stroke="currentColor"
                >
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
              </div>
              <div className="feature-label">
                <span>{t.hero.badge1Title}</span>
                <span>{t.hero.badge1Sub}</span>
              </div>
            </div>

            {/* Feature 2: Hydrate */}
            <div className="feature-badge-item">
              <div className="feature-icon-wrapper">
                <svg 
                  className="feature-svg" 
                  viewBox="0 0 32 32" 
                  fill="none" 
                  stroke="currentColor"
                >
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
              </div>
              <div className="feature-label">
                <span>{t.hero.badge2Title}</span>
                <span>{t.hero.badge2Sub}</span>
              </div>
            </div>

            {/* Feature 3: Protège */}
            <div className="feature-badge-item">
              <div className="feature-icon-wrapper">
                <svg 
                  className="feature-svg" 
                  viewBox="0 0 32 32" 
                  fill="none" 
                  stroke="currentColor"
                >
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
              </div>
              <div className="feature-label">
                <span>{t.hero.badge3Title}</span>
                <span>{t.hero.badge3Sub}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Right Product Space (clean hero background) */}
        <div className="hero-product-highlights" aria-hidden="true" />
      </div>
    </section>
  );
}
