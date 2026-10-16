
import type { Translation } from "../lib/translations";
import step1Img from '../assets/step-1.webp';
import step2Img from '../assets/step-2.webp';
import step3Img from '../assets/step-3.webp';
import step4Img from '../assets/step-4.webp';

const stepImages = [step1Img, step2Img, step3Img, step4Img];

const UsageStepsSection = ({ t }: { t: Translation; lang?: unknown }) => {
  const u = t.usage;

  return (
    <section className="usage-steps-section" id="utilisation">
      {/* Background palm shadow & ambient lighting overlays */}
      <div className="usage-bg-overlay" />

      <div className="usage-steps-container">
        {/* Centered Section Header */}
        <div className="usage-header">
          <span className="usage-eyebrow">{u.eyebrow}</span>
          <h2 className="usage-title">{u.title}</h2>
          <p className="usage-subtitle">
            {u.subtitle}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="usage-steps-grid">
          {u.steps.map((item, index) => (
            <div key={item.step} className="usage-step-card">
              {/* Circular Image Container with Step Number Badge */}
              <div className="step-circle-wrapper">
                <div className="step-number-badge">
                  {item.step}
                </div>
                <div className="step-circle-frame">
                  <img
                    src={stepImages[index].src}
                    alt={item.title}
                    className="step-circle-img"
                  />
                </div>
              </div>

              {/* Step Title & Instructions */}
              <h3 className="step-title">{item.title}</h3>
              <p className="step-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UsageStepsSection;

