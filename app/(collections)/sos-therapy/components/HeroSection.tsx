import { Fragment } from "react";
import heroBgProduct from "../assets/hero-bg-product.jpg";
import pouchCutout from "../assets/pouch-cutout.webp";
import type { Lang } from "../lib/config";
import type { Translation } from "../lib/translations";

type Props = { onOrderClick: () => void; t: Translation; lang: Lang };

const lines = (text: string) =>
  text.split("\n").map((line, idx, all) => (
    <Fragment key={idx}>
      {line}
      {idx < all.length - 1 && <br />}
    </Fragment>
  ));

export default function HeroSection({ onOrderClick, t, lang }: Props) {
  const h = t.hero;
  const badges = {
    formula: lang === "ar" ? "تركيبة سحرية 10 في 1" : "10 en 1 Formule Magique",
    vitamins: lang === "ar" ? "+20 فيتامين وخلاصة" : "+20 Vitamines & Actifs",
    size: lang === "ar" ? "حجم اقتصادي 400g" : "Format XXL 400g",
  };

  return (
    <section className="hero-section-exact" id="accueil">
      {/* Background artwork with podium and product */}
      <div className="hero-exact-bg" aria-hidden="true">
        <img src={heroBgProduct.src} alt="SOS Hair Therapy Soin Capillaire" className="hero-exact-bg-img" />
        {/* Soft, warm subtle gradient overlay on the left for optimal text readability */}
        <div className="hero-exact-overlay"></div>
      </div>

      <div className="hero-exact-container">
        <div className={`hero-exact-content ${lang === "ar" ? "is-ar" : "is-fr"}`}>
          <div className="exact-badge">
            <span className="exact-badge-sparkle">✨</span>
            <span className="exact-badge-text">{h.badge}</span>
          </div>

          <h1 className="exact-headline">{lines(h.headline)}</h1>

          <div className="exact-promises">
            {h.promises.map((promise, idx) => (
              <Fragment key={idx}>
                <span>{promise}</span>
                {idx < h.promises.length - 1 && <span className="exact-dot">•</span>}
              </Fragment>
            ))}
          </div>

          {/* Luxury 3D Product Showcase for Mobile & Tablet */}
          <div className="hero-mobile-product-stage" aria-label="SOS Hair Therapy 400g Showcase">
            <div className="hero-stage-aura" aria-hidden="true"></div>
            <div className="hero-stage-rings" aria-hidden="true"></div>

            <div className="hero-stage-pill pill-top-left">
              <span className="pill-icon">✨</span>
              <span className="pill-text">{badges.formula}</span>
            </div>

            <div className="hero-stage-pill pill-top-right">
              <span className="pill-icon">🌿</span>
              <span className="pill-text">{badges.vitamins}</span>
            </div>

            <div className="hero-stage-seal">
              <span className="seal-weight">400g</span>
              <span className="seal-label">{lang === "ar" ? "حجم كبير" : "Format XXL"}</span>
            </div>

            <div className="hero-stage-pouch-wrapper">
              <img src={pouchCutout.src} alt="SOS Hair Therapy 400g Pouch" className="hero-stage-pouch-img" />
              <div className="hero-stage-pedestal" aria-hidden="true"></div>
              <div className="hero-stage-shadow" aria-hidden="true"></div>
            </div>
          </div>

          <p className="exact-description">{h.description}</p>

          <div className="exact-cta-row">
            <button type="button" className="exact-btn-decouvrir" onClick={onOrderClick} id="hero-decouvrir-btn">
              <span>{h.cta}</span>
              <span className="btn-arrow-icon">➔</span>
            </button>
          </div>

          {/* 3 Pillars */}
          <div className="exact-pillars">
            <div className="exact-pillar">
              <div className="exact-pillar-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 12" />
                </svg>
              </div>
              <span className="exact-pillar-title">{lines(h.pillars[0].title)}</span>
            </div>

            <div className="exact-pillar">
              <div className="exact-pillar-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <span className="exact-pillar-title">{lines(h.pillars[1].title)}</span>
            </div>

            <div className="exact-pillar">
              <div className="exact-pillar-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3c-1.5 3-3.5 5-6 6.5 2 3 5 4.5 6 10.5 1-6 4-7.5 6-10.5-2.5-1.5-4.5-3.5-6-6.5Z" />
                  <path d="M12 14c-3-1-6.5-1-9 1 1 3 3.5 5.5 9 5" />
                  <path d="M12 14c3-1 6.5-1 9 1-1 3-3.5 5.5-9 5" />
                </svg>
              </div>
              <span className="exact-pillar-title">{lines(h.pillars[2].title)}</span>
            </div>
          </div>
        </div>

        {/* Right Area for spacing and background balance */}
        <div className="hero-exact-right-area"></div>
      </div>
    </section>
  );
}
