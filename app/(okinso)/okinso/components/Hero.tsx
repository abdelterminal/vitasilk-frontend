"use client";

import React from 'react';
import { ArrowRight, Sparkles, Droplets, Leaf, Star } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import heroBg from '../assets/hero-bg.webp';
import heroProductImg from '../assets/pack-marble-showcase.webp';

export default function Hero({ onOpenOrder, onDiscoverClick }: { onOpenOrder: () => void; onDiscoverClick?: () => void }) {
  const { t } = useLanguage();

  const titleLines = t.hero.title.split('\n');

  return (
    <section id="hero" className="vitasilk-hero-section">
      {/* Background Image Container for desktop */}
      <div 
        className="hero-background" 
        style={{ backgroundImage: `url(${heroBg.src})` }}
      >
        <div className="hero-gradient-overlay" />
      </div>

      {/* Main Content Container */}
      <div className="hero-container">
        <div className="hero-content-col">
          
          {/* Eyebrow / Tagline */}
          <div className="hero-eyebrow">
            <span className="eyebrow-text">
              {t.hero.eyebrow}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-title font-serif">
            {titleLines.map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < titleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>

          {/* Subtitle / Description */}
          <p className="hero-description">
            {t.hero.description}
          </p>

          {/* Hero Product Image Showcase on Mobile */}
          <div className="hero-product-image-wrap">
            <div className="hero-product-image-card">
              <img 
                src={heroProductImg.src} 
                alt="Pack Rituel Okinso Protein Collagen 4 Étapes" 
                className="hero-product-img"
              />
            </div>
          </div>

          {/* CTA Actions */}
          <div className="hero-cta-wrapper">
            <button 
              className="btn-hero-primary" 
              onClick={onDiscoverClick || onOpenOrder}
              id="hero-decouvrir-btn"
            >
              <span>{t.hero.ctaDiscover}</span>
              <ArrowRight size={20} className="btn-arrow" />
            </button>

            <button 
              className="btn-hero-secondary"
              onClick={onOpenOrder}
              id="hero-order-pack-btn"
            >
              <span>{t.hero.ctaOrder}</span>
            </button>
          </div>

          {/* 3 Key Benefits / Pillars */}
          <div className="hero-features-grid">
            
            {/* Feature 1: Shine & Strength */}
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Sparkles className="feature-icon" size={22} strokeWidth={1.8} />
              </div>
              <div className="feature-text">
                <span className="feature-title">{t.hero.feature1Title}</span>
                <span className="feature-subtitle">{t.hero.feature1Subtitle}</span>
              </div>
            </div>

            {/* Feature 2: Deep Repair */}
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Droplets className="feature-icon" size={22} strokeWidth={1.8} />
              </div>
              <div className="feature-text">
                <span className="feature-title">{t.hero.feature2Title}</span>
                <span className="feature-subtitle">{t.hero.feature2Subtitle}</span>
              </div>
            </div>

            {/* Feature 3: Clean Formula */}
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Leaf className="feature-icon" size={22} strokeWidth={1.8} />
              </div>
              <div className="feature-text feature-stacked">
                <span className="feature-line">{t.hero.feature3Line1}</span>
                <span className="feature-line">{t.hero.feature3Line2}</span>
                <span className="feature-line">{t.hero.feature3Line3}</span>
              </div>
            </div>

          </div>

          {/* Social Proof Mini Bar */}
          <div className="hero-social-proof">
            <div className="rating-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="star-filled" fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <span className="rating-text">
              <strong>{t.hero.socialProofScore}</strong> {t.hero.socialProofText}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
