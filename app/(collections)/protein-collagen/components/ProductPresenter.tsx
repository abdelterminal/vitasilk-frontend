"use client";

import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ShoppingBag, 
  Droplets, 
  Zap 
} from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import girlPresenter1 from '../assets/girl-presenter.webp';

export default function ProductPresenter({ onOpenOrder, onDiscoverSteps }: { onOpenOrder: () => void; onDiscoverSteps?: () => void }) {
  const { t } = useLanguage();
  const highlights = [
    {
      id: 1,
      icon: <Droplets size={20} className="highlight-icon" />,
      title: t.presenter.highlight1Title,
      desc: t.presenter.highlight1Desc
    },
    {
      id: 2,
      icon: <Sparkles size={20} className="highlight-icon" />,
      title: t.presenter.highlight2Title,
      desc: t.presenter.highlight2Desc
    },
    {
      id: 3,
      icon: <ShieldCheck size={20} className="highlight-icon" />,
      title: t.presenter.highlight3Title,
      desc: t.presenter.highlight3Desc
    },
    {
      id: 4,
      icon: <Zap size={20} className="highlight-icon" />,
      title: t.presenter.highlight4Title,
      desc: t.presenter.highlight4Desc
    }
  ];

  const handleStepScroll = () => {
    if (onDiscoverSteps) {
      onDiscoverSteps();
    } else {
      const el = document.getElementById('etapes-rituel') || document.getElementById('puissants-ingredients');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="presentation-produit" className="presenter-section">
      {/* Background soft ambient shapes */}
      <div className="presenter-bg-ambient" aria-hidden="true">
        <div className="ambient-circle ambient-1" />
        <div className="ambient-circle ambient-2" />
      </div>

      <div className="presenter-container">
        
        {/* Section Top Header */}
        <div className="presenter-header">
          <div className="presenter-badge-top">
            <Sparkles size={15} className="sparkle-icon" />
            <span>{t.presenter.badge}</span>
          </div>

          <h2 className="presenter-main-title font-serif">
            {t.presenter.title}<br />
            <span className="title-gradient">{t.presenter.titleGradient}</span>
          </h2>

          <p className="presenter-subtitle">
            {t.presenter.subtitle}
          </p>
        </div>

        {/* Main Grid: Left Visual Showcase | Right Presentation Details */}
        <div className="presenter-grid">
          
          {/* LEFT COLUMN: Visual Showcase */}
          <div className="presenter-visual-col">
            <div className="presenter-card-frame">
              
              {/* Main Photo with smooth transition */}
              <div className="presenter-image-container">
                <img 
                  src={girlPresenter1.src} 
                  alt={t.presenter.photo1Caption}
                  className="presenter-hero-img"
                  
                />
                <div className="presenter-img-overlay" />

                {/* Floating Top Pill Badge */}
                <div className="presenter-floating-pill">
                  <span className="pill-pulse" />
                  <span className="pill-text">{t.presenter.photo1Tag}</span>
                </div>
              </div>



            </div>
          </div>

          {/* RIGHT COLUMN: Presentation Content & Highlights */}
          <div className="presenter-content-col">
            
            {/* 4 Feature Cards */}
            <div className="presenter-highlights-grid">
              {highlights.map((item) => (
                <div key={item.id} className="presenter-highlight-item">
                  <div className="highlight-icon-wrap">
                    {item.icon}
                  </div>
                  <div className="highlight-text-wrap">
                    <h3 className="highlight-item-title">{item.title}</h3>
                    <p className="highlight-item-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="presenter-trust-row">
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-check" />
                <span>{t.presenter.trust1}</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-check" />
                <span>{t.presenter.trust2}</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-check" />
                <span>{t.presenter.trust3}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="presenter-actions-wrapper">
              <button 
                className="btn-presenter-order" 
                onClick={onOpenOrder}
                id="presenter-commander-cta"
              >
                <ShoppingBag size={18} />
                <span>{t.presenter.ctaOrder}</span>
                <ArrowRight size={18} className="btn-arrow" />
              </button>

              <button 
                className="btn-presenter-steps" 
                onClick={handleStepScroll}
                id="presenter-decouvrir-rituel-btn"
              >
                <span>{t.presenter.ctaSteps}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
