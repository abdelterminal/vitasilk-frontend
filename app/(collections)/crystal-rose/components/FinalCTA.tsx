"use client";

import { useState } from "react";
import { ArrowRight, Sparkles, Check, ShieldCheck, Truck, Clock } from "lucide-react";
import { useLanguage } from "../lib/i18n";
import shampooImg from "../assets/shampoo_studio_hd.jpg";
import maskImg from "../assets/mask_studio_hd.jpg";
import serumImg from "../assets/serum_studio_hd.webp";

type HoverId = "shampoo" | "mask" | "serum" | null;

export default function FinalCTA() {
  const { t } = useLanguage();
  const [activeHover, setActiveHover] = useState<HoverId>(null);

  const scrollToCommander = () => {
    const el = document.getElementById("commander");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="final-cta-section-v2">
      <div className="final-cta-container">
        <div className="final-cta-luxury-card">
          {/* Ambient Lighting */}
          <div className="final-cta-ambient-glow" aria-hidden="true"></div>

          <div className="final-cta-inner-grid">
            {/* Left Column: Premium Editorial Content */}
            <div className="final-cta-text-content">
              <div className="final-cta-pill-badge">
                <Sparkles size={14} className="pill-sparkle-icon" />
                <span>{t.finalCta.badge}</span>
              </div>

              <h2 className="final-cta-headline">
                {t.finalCta.headline1}<br />
                <span className="final-cta-serif-accent">{t.finalCta.headline2}</span>
              </h2>

              <p className="final-cta-lead-text">
                {t.finalCta.leadText}
              </p>

              {/* Key Benefits Grid */}
              <div className="final-cta-benefits-list">
                {t.finalCta.benefits.map((benefit, idx) => (
                  <div key={idx} className="cta-benefit-item">
                    <div className="benefit-check-icon"><Check size={13} strokeWidth={3} /></div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Action Button & Reassurance */}
              <div className="final-cta-button-group">
                <button onClick={scrollToCommander} className="btn-luxury final-cta-primary-btn">
                  <span>{t.finalCta.btnOrder}</span>
                  <ArrowRight size={17} className="cta-btn-arrow" />
                </button>

                <div className="final-cta-reassurance-row">
                  <div className="reassurance-pill">
                    <Truck size={14} />
                    <span>{t.finalCta.reassurances[0]}</span>
                  </div>
                  <div className="reassurance-pill">
                    <ShieldCheck size={14} />
                    <span>{t.finalCta.reassurances[1]}</span>
                  </div>
                  <div className="reassurance-pill">
                    <Clock size={14} />
                    <span>{t.finalCta.reassurances[2]}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 3 Real Studio Products Showcase */}
            <div className="final-cta-visual-showcase">
              <div className="studio-trio-wrapper">
                {/* Floating Pack Badge */}
                <div className="product-stage-badge">
                  <span className="badge-highlight">{t.finalCta.packBadgeHighlight}</span>
                  <span className="badge-sub">{t.finalCta.packBadgeSub}</span>
                </div>

                <div className="studio-trio-stage">
                  {/* 1. Serum Card */}
                  <div
                    className={`studio-trio-card card-serum ${activeHover === "serum" ? "is-active" : ""}`}
                    onMouseEnter={() => setActiveHover("serum")}
                    onMouseLeave={() => setActiveHover(null)}
                  >
                    <img
                      src={serumImg.src}
                      alt={t.finalCta.serumAlt}
                      className="studio-card-photo"
                      loading="lazy"
                    />
                    <span className="studio-card-badge">{t.finalCta.serumBadge}</span>
                  </div>

                  {/* 2. Shampoo Card (Hero Center) */}
                  <div
                    className={`studio-trio-card card-shampoo ${activeHover === "shampoo" || activeHover === null ? "is-center" : ""}`}
                    onMouseEnter={() => setActiveHover("shampoo")}
                    onMouseLeave={() => setActiveHover(null)}
                  >
                    <img
                      src={shampooImg.src}
                      alt={t.finalCta.shampooAlt}
                      className="studio-card-photo"
                      loading="lazy"
                    />
                    <span className="studio-card-badge">{t.finalCta.shampooBadge}</span>
                  </div>

                  {/* 3. Mask Card */}
                  <div
                    className={`studio-trio-card card-mask ${activeHover === "mask" ? "is-active" : ""}`}
                    onMouseEnter={() => setActiveHover("mask")}
                    onMouseLeave={() => setActiveHover(null)}
                  >
                    <img
                      src={maskImg.src}
                      alt={t.finalCta.maskAlt}
                      className="studio-card-photo"
                      loading="lazy"
                    />
                    <span className="studio-card-badge">{t.finalCta.maskBadge}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
