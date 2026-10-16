import { Fragment } from "react";
import type { Lang } from "../lib/config";
import type { Translation } from "../lib/translations";

const NaturalBeautySection = ({ t, lang }: { t: Translation; lang: Lang }) => {
  const nb = t.naturalBeauty;

  return (
    <section className="natural-beauty-section" id="rituel">
      {/* Soft natural gradient layer for contrast */}
      <div className="natural-beauty-bg-layer" />

      <div className="natural-beauty-container">
        {/* Left column spacer allowing the woman image, lantern & arch to show fully */}
        <div className="natural-beauty-visual-col" />

        {/* Right column with content matching exact mockup */}
        <div className={`natural-beauty-content-col ${lang === 'ar' ? 'is-ar' : 'is-fr'}`}>
          <span className="natural-beauty-eyebrow">{nb.eyebrow}</span>

          <h2 className="natural-beauty-title">
            {nb.title.split('\n').map((line, idx) => (
              <Fragment key={idx}>
                {line}
                {idx < nb.title.split('\n').length - 1 && <br />}
              </Fragment>
            ))}
          </h2>

          <p className="natural-beauty-desc">
            {nb.desc}
          </p>

          <ul className="natural-beauty-bullets">
            {nb.bullets.map((text, idx) => (
              <li key={idx} className="natural-beauty-bullet-item">
                <span className="bullet-check-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="bullet-text">{text}</span>
              </li>
            ))}
          </ul>

          {/* Cursive quote with 2 lines and centered underline matching mockup */}
          <div className="natural-beauty-quote-wrapper">
            <div className={`natural-beauty-cursive-quote ${lang === 'ar' ? 'font-script-ar' : ''}`}>
              <span className="quote-line-1">{nb.quoteLine1}</span>
              <span className="quote-line-2">{nb.quoteLine2}</span>
            </div>
            <div className="cursive-quote-underline" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NaturalBeautySection;

