"use client";

import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../lib/i18n";
import step1Img from "../assets/routine_circle_step1.webp";
import step2Img from "../assets/routine_circle_step2.webp";
import step3Img from "../assets/routine_circle_step3.webp";
import botanicalCorner from "../assets/routine_botanical_corner.png";
import flowerWatermark from "../assets/routine_flower_watermark.svg";

const stepImages = [step1Img.src, step2Img.src, step3Img.src];

export default function Routine() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="routine" className="routine-section-banner">
      {/* Botanical watercolor top-left branch */}
      <div className="routine-bg-decor decor-top-left" aria-hidden="true">
        <img src={botanicalCorner.src} alt="" className="routine-botanical-img" />
      </div>

      {/* Flower watermark accents in corners */}
      <div className="routine-bg-decor decor-bottom-left" aria-hidden="true">
        <img src={flowerWatermark.src} alt="" className="routine-flower-img" />
      </div>
      <div className="routine-bg-decor decor-top-right" aria-hidden="true">
        <img src={flowerWatermark.src} alt="" className="routine-flower-img small" />
      </div>
      <div className="routine-bg-decor decor-bottom-right" aria-hidden="true">
        <img src={flowerWatermark.src} alt="" className="routine-flower-img" />
      </div>

      <div className="container routine-container">
        <div className="routine-banner-layout">
          {/* Left Column: Heading, Subtitle & Dark Olive Pill Button */}
          <div className="routine-left-content">
            <h2 className="routine-banner-title">
              {t.routine.title}
            </h2>
            <p className="routine-banner-subtitle">
              {t.routine.subtitle}
            </p>
            <button
              onClick={() => scrollToSection("commander")}
              className="btn-routine-pill"
              aria-label={t.routine.btnRoutine}
            >
              <span>{t.routine.btnRoutine}</span>
              <ArrowRight size={16} strokeWidth={2.2} />
            </button>
          </div>

          {/* Right Column: 3 Step Circles with Arrows & Labels */}
          <div className="routine-steps-flow">
            {t.routine.steps.map((step, index) => (
              <Fragment key={step.stepNumber}>
                <div className="routine-step-item">
                  {/* Circular Product Photo */}
                  <div className="routine-circle-frame">
                    <img
                      src={stepImages[index]}
                      alt={step.alt}
                      className="routine-circle-img"
                      loading="lazy"
                    />
                  </div>

                  {/* Step Number Badge Centered Under Circle */}
                  <div className="routine-step-badge">
                    <span>{step.stepNumber}</span>
                  </div>

                  {/* Step Action & Product Title */}
                  <div className="routine-step-meta">
                    <span className="routine-step-action">{step.action}</span>
                    <span className="routine-step-name">{step.product}</span>
                  </div>
                </div>

                {/* Horizontal Flow Arrow between Circles */}
                {index < t.routine.steps.length - 1 && (
                  <div className="routine-flow-arrow" aria-hidden="true">
                    <span>→</span>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
