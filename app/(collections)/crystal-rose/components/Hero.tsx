"use client";

import { useLanguage } from "../lib/i18n";
import heroBg from "../assets/hero_bg_full.webp";

export default function Hero() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="hero-section hero-full-bg"
      style={{ "--hero-background": `url(${heroBg.src})` } as React.CSSProperties}
    >
      <div className="hero-mobile-visual" aria-hidden="true">
        <img src={heroBg.src} alt="" fetchPriority="high" />
      </div>
      <div className="hero-overlay-gradient"></div>
      <div className="container-hero hero-inner-container">
        {/* Left Column: Headline, Subtitle & CTAs */}
        <div className="hero-left-content">
          <div className="hero-brand-tag">
            <span className="hero-tag-text">{t.hero.brandTag1}</span>
            <span className="hero-tag-dash">——</span>
            <span className="hero-tag-text">{t.hero.brandTag2}</span>
          </div>

          <h1 className="hero-main-title">
            <span className="hero-title-dark">{t.hero.titleLine1}</span><br />
            <span className="italic-serif hero-serif-sage">{t.hero.titleLine2}</span>
          </h1>

          <p className="hero-description">
            {t.hero.description}
          </p>

          <div className="hero-cta-group">
            <button
              onClick={() => scrollToSection("produits")}
              className="btn-luxury hero-btn-primary"
            >
              <span>{t.hero.btnDiscover}</span>
              <span className="btn-arrow">→</span>
            </button>
            <button
              onClick={() => scrollToSection("routine")}
              className="btn-luxury-outline hero-btn-secondary"
            >
              <span>{t.hero.btnRoutine}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
