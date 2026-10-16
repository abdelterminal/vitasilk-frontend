"use client";

import { useState } from "react";
import { useLanguage } from "../lib/i18n";
import shampooStudio from "../assets/shampoo_studio_v2.jpg";
import maskStudio from "../assets/mask_studio_v2.jpg";
import serumStudio from "../assets/serum_studio_v2.jpg";
import botanicalBranch from "../assets/botanical_branch.webp";

const productImages = {
  shampoo: shampooStudio.src,
  mask: maskStudio.src,
  serum: serumStudio.src,
};

type HoverId = "shampoo" | "mask" | "serum" | null;

export default function ProductSection({ onSelectProduct }: { onSelectProduct?: (id: string) => void }) {
  const { t } = useLanguage();
  const [activeHover, setActiveHover] = useState<HoverId>(null);

  const productsList = [
    { id: "shampoo", ...t.products.items.shampoo, image: productImages.shampoo },
    { id: "mask", ...t.products.items.mask, image: productImages.mask },
    { id: "serum", ...t.products.items.serum, image: productImages.serum },
  ];

  const handleSelect = (productId: string) => {
    if (onSelectProduct) {
      onSelectProduct(productId);
    }
    const orderSection = document.getElementById("commander");
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="produits" className="products-section">
      {/* Decorative Botanical Leaf Accents framing the section */}
      <img
        src={botanicalBranch.src}
        alt=""
        aria-hidden="true"
        className="products-botanical-corner products-botanical-left"
      />
      <img
        src={botanicalBranch.src}
        alt=""
        aria-hidden="true"
        className="products-botanical-corner products-botanical-right"
      />

      <div className="container products-inner-container">
        {/* Section Header */}
        <div className="products-header text-center">
          <div className="products-tag-row">
            <span className="products-tag-line"></span>
            <span className="products-tag-text">{t.products.tag}</span>
            <span className="products-tag-line"></span>
          </div>

          <h2 className="products-main-heading">
            {t.products.title}
          </h2>

          <p className="products-sub-heading">
            {t.products.subtitle}
          </p>
        </div>

        {/* 1. Desktop 3 Large Product Cards */}
        <div className="products-grid-staged">
          {productsList.map((prod) => (
            <div key={prod.id} className="product-staged-card">
              {/* Product Card Image Frame */}
              <div className="product-card-image-wrap">
                <img
                  src={prod.image}
                  alt={`CRYSTAL ${prod.name} ${prod.volume}`}
                  className="product-card-img"
                  loading="lazy"
                />
              </div>

              {/* Product Card Info */}
              <div className="product-card-content">
                <div className="product-step-row">
                  <span className="product-step-num">{prod.number}.</span>
                  <span className="product-step-line"></span>
                </div>

                <h3 className="product-card-title">{prod.name}</h3>

                <p className="product-card-desc">{prod.description}</p>

                {/* 3 Checklist items with thin circular check icons */}
                <div className="product-check-list">
                  {prod.features.map((item, idx) => (
                    <div key={idx} className="product-check-item">
                      <span className="check-bullet-icon">
                        <svg
                          viewBox="0 0 24 24"
                          width="14"
                          height="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      <span className="check-bullet-text">{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Discover Button */}
                <button
                  onClick={() => handleSelect(prod.id)}
                  className="btn-luxury btn-product-discover"
                >
                  <span>{t.products.btnDiscover}</span>
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Mobile Studio Trio Showcase (Replaces 3 cards on phone size) */}
        <div className="products-mobile-trio-showcase">
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
                onClick={() => setActiveHover(activeHover === "serum" ? null : "serum")}
                onPointerEnter={(event) => { if (event.pointerType === "mouse") setActiveHover("serum"); }}
                onPointerLeave={(event) => { if (event.pointerType === "mouse") setActiveHover(null); }}
              >
                <img
                  src={serumStudio.src}
                  alt={t.finalCta.serumAlt}
                  className="studio-card-photo"
                  loading="lazy"
                />
                <span className="studio-card-badge">{t.finalCta.serumBadge}</span>
              </div>

              {/* 2. Shampoo Card (Hero Center) */}
              <div
                className={`studio-trio-card card-shampoo ${activeHover === "shampoo" || activeHover === null ? "is-center" : ""}`}
                onClick={() => setActiveHover(activeHover === "shampoo" ? null : "shampoo")}
                onPointerEnter={(event) => { if (event.pointerType === "mouse") setActiveHover("shampoo"); }}
                onPointerLeave={(event) => { if (event.pointerType === "mouse") setActiveHover(null); }}
              >
                <img
                  src={shampooStudio.src}
                  alt={t.finalCta.shampooAlt}
                  className="studio-card-photo"
                  loading="lazy"
                />
                <span className="studio-card-badge">{t.finalCta.shampooBadge}</span>
              </div>

              {/* 3. Mask Card */}
              <div
                className={`studio-trio-card card-mask ${activeHover === "mask" ? "is-active" : ""}`}
                onClick={() => setActiveHover(activeHover === "mask" ? null : "mask")}
                onPointerEnter={(event) => { if (event.pointerType === "mouse") setActiveHover("mask"); }}
                onPointerLeave={(event) => { if (event.pointerType === "mouse") setActiveHover(null); }}
              >
                <img
                  src={maskStudio.src}
                  alt={t.finalCta.maskAlt}
                  className="studio-card-photo"
                  loading="lazy"
                />
                <span className="studio-card-badge">{t.finalCta.maskBadge}</span>
              </div>
            </div>

            {/* Mobile Action Button */}
            <div className="products-mobile-cta-wrap">
              <button
                onClick={() => handleSelect("pack_complet")}
                className="btn-luxury btn-products-mobile-cta"
              >
                <span>{t.products.btnDiscover}</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
