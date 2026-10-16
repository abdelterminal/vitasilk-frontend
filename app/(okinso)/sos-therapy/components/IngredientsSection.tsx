"use client";

import { Fragment, useState, type ReactNode } from "react";
import type { Translation } from "../lib/translations";

const ingredientIcons: Record<string, ReactNode> = {
  neem: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 20 3c0 9-4 17-9 17Z" />
      <path d="M11 20c1.5-3.5 4.5-6.5 9-9" />
    </svg>
  ),
  rose: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 8.5C10 6 6 7 6 11c0 3 3 5.5 6 7.5 3-2 6-4.5 6-7.5 0-4-4-5-6-2.5Z" />
      <path d="M9 10c-1.5 1-1.5 3 0 4" />
      <path d="M15 10c1.5 1 1.5 3 0 4" />
    </svg>
  ),
  coco: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="13.5" r="5.5" />
      <circle cx="9" cy="13.5" r="3.2" strokeDasharray="1.5 2" />
      <circle cx="16" cy="9.5" r="4.5" />
      <circle cx="16" cy="9.5" r="2.5" strokeDasharray="1.5 2" />
    </svg>
  ),
  argan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="8.5" cy="14" rx="4.8" ry="3.5" transform="rotate(-30 8.5 14)" />
      <ellipse cx="15.5" cy="10.5" rx="4.5" ry="3.2" transform="rotate(35 15.5 10.5)" />
      <path d="M7.5 14c1.5-1 3.5-.5 4.5 1" />
    </svg>
  ),
  soie: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="8.5" cy="12" rx="4" ry="6.5" transform="rotate(-18 8.5 12)" />
      <ellipse cx="15.5" cy="12" rx="4" ry="6.5" transform="rotate(18 15.5 12)" />
      <path d="M11 8c1 2 1 6 0 8" strokeDasharray="1.5 2" />
    </svg>
  ),
  vitamines: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V3" />
      <path d="M12 6c-2.5-1-4 .2-4 2 0 1.8 1.5 2.8 4 2.8" />
      <path d="M12 6c2.5-1 4 .2 4 2 0 1.8-1.5 2.8-4 2.8" />
      <path d="M12 11c-2.5-1-4 .2-4 2 0 1.8 1.5 2.8 4 2.8" />
      <path d="M12 11c2.5-1 4 .2 4 2 0 1.8-1.5 2.8-4 2.8" />
      <path d="M12 16c-2-1-3.2.2-3.2 1.6 0 1.4 1.2 2.2 3.2 2.2" />
      <path d="M12 16c2-1 3.2.2 3.2 1.6 0 1.4-1.2 2.2-3.2 2.2" />
    </svg>
  )
};

type Ingredient = Translation["ingredients"]["items"][number];

const IngredientsSection = ({ t }: { t: Translation; onOrderClick?: () => void }) => {
  const [activeIngredient, setActiveIngredient] = useState<Ingredient | null>(null);
  const ing = t.ingredients;

  const handleIngredientClick = (item: Ingredient) => {
    setActiveIngredient(activeIngredient?.id === item.id ? null : item);
  };

  return (
    <section className="ingredients-showcase-section" id="ingredients">
      {/* Background Graphic elements matching reference */}
      <div className="ingredients-bg-layer" />

      <div className="ingredients-container">
        {/* Main Content Area: Left aligned text */}
        <div className="ingredients-content-wrapper">
          <div className="ingredients-text-col">
            <span className="ingredients-eyebrow">{ing.eyebrow}</span>
            <h2 className="ingredients-title">
              {ing.title.split('\n').map((line, idx) => (
                <Fragment key={idx}>
                  {line}
                  {idx < ing.title.split('\n').length - 1 && <br />}
                </Fragment>
              ))}
            </h2>
            <p className="ingredients-description">
              {ing.description}
            </p>
            <div className="ingredients-cta-wrapper">
              <a
                href="#commander"
                className="btn-ingredients-cta"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('commander');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span>{ing.cta}</span>
                <span className="btn-cta-arrow">➔</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom 6 Ingredients Badges Row with luxury glassmorphic wrapper */}
        <div className="ingredients-bottom-bar-wrapper">
          <div className="ingredients-bottom-grid">
            {ing.items.map((item) => (
              <div
                key={item.id}
                className={`ingredient-badge-card ${activeIngredient?.id === item.id ? 'active' : ''}`}
                onClick={() => handleIngredientClick(item)}
                title={`${item.name} - ${item.role}: ${item.desc}`}
              >
                <div className="ingredient-icon-wrapper">
                  {ingredientIcons[item.id]}
                </div>
                <h3 className="ingredient-name">{item.name}</h3>
                <span className="ingredient-role">{item.role}</span>

                {/* Interactive popup tooltip on tap/click */}
                {activeIngredient?.id === item.id && (
                  <div className="ingredient-tooltip">
                    <p>{item.desc}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientsSection;

