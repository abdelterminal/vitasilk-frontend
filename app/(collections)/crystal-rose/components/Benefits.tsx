"use client";

import { Shield, Droplets, Sparkles } from "lucide-react";
import { useLanguage } from "../lib/i18n";
import botanicalBranch from "../assets/botanical_branch.webp";

export default function Benefits() {
  const { t } = useLanguage();

  return (
    <section id="bienfaits" className="benefits-section">
      {/* Botanical Leaf Accent on the bottom-left */}
      <img
        src={botanicalBranch.src}
        alt=""
        aria-hidden="true"
        className="benefits-botanical-corner"
      />

      <div className="benefits-container">
        {/* Centered Heading with symmetrical lines */}
        <div className="benefits-header">
          <div className="benefits-tag-row">
            <span className="benefits-tag-line"></span>
            <span className="benefits-tag-text">{t.benefits.tag}</span>
            <span className="benefits-tag-line"></span>
          </div>
          <h2 className="benefits-main-heading">
            {t.benefits.title}
          </h2>
        </div>

        {/* 4 Clean Columns with vertical divider lines */}
        <div className="benefits-columns-grid">
          {/* 1. LISSE */}
          <div className="benefit-col">
            <div className="benefit-icon-ring">
              <svg
                className="benefit-custom-icon"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 4.5c1.5 3.5 -1.5 7.5 0 11s-1.5 3.5 0 4" />
                <path d="M12 4.5c1.5 3.5 -1.5 7.5 0 11s-1.5 3.5 0 4" />
                <path d="M17 4.5c1.5 3.5 -1.5 7.5 0 11s-1.5 3.5 0 4" />
              </svg>
            </div>
            <h3 className="benefit-col-title">{t.benefits.items[0].title}</h3>
            <p className="benefit-col-desc">
              {t.benefits.items[0].desc}
            </p>
          </div>

          {/* 2. RENFORCE */}
          <div className="benefit-col">
            <div className="benefit-icon-ring">
              <Shield size={23} strokeWidth={1.6} />
            </div>
            <h3 className="benefit-col-title">{t.benefits.items[1].title}</h3>
            <p className="benefit-col-desc">
              {t.benefits.items[1].desc}
            </p>
          </div>

          {/* 3. NOURRIT */}
          <div className="benefit-col">
            <div className="benefit-icon-ring">
              <Droplets size={23} strokeWidth={1.6} />
            </div>
            <h3 className="benefit-col-title">{t.benefits.items[2].title}</h3>
            <p className="benefit-col-desc">
              {t.benefits.items[2].desc}
            </p>
          </div>

          {/* 4. PROTÈGE */}
          <div className="benefit-col">
            <div className="benefit-icon-ring">
              <Sparkles size={23} strokeWidth={1.6} />
            </div>
            <h3 className="benefit-col-title">{t.benefits.items[3].title}</h3>
            <p className="benefit-col-desc">
              {t.benefits.items[3].desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
