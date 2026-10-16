"use client";

import { useRef, useState, type ReactNode } from "react";
import type { Translation } from "../lib/translations";

const icons: Record<string, ReactNode> = {
  hydrate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  repare: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.5 2.5C8.5 6.09 5.59 9 2 9C5.59 9 8.5 11.91 8.5 15.5C8.5 11.91 11.41 9 15 9C11.41 9 8.5 6.09 8.5 2.5Z" />
      <path d="M17.5 11.5C17.5 13.71 15.71 15.5 13.5 15.5C15.71 15.5 17.5 17.29 17.5 19.5C17.5 17.29 19.29 15.5 21.5 15.5C19.29 15.5 17.5 13.71 17.5 11.5Z" />
    </svg>
  ),
  eclat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 7-10 11L2 10l4-7z" />
      <path d="M2 10h20" />
      <path d="M12 21L7.5 10 10 3" />
      <path d="M12 21l4.5-11L14 3" />
    </svg>
  ),
  lisse: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7c3.5-3 7.5-3 11 0s7.5 3 11 0" />
      <path d="M3 12c3.5-3 7.5-3 11 0s7.5 3 11 0" />
      <path d="M3 17c3.5-3 7.5-3 11 0s7.5 3 11 0" />
    </svg>
  ),
  protege: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

export default function VisibleResultsSection({ t }: { t: Translation }) {
  const r = t.results;
  const [activeIndex, setActiveIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!gridRef.current) return;
    const { scrollLeft, clientWidth, scrollWidth } = gridRef.current;
    const totalItems = r.benefits.length;
    const scrollRatio = Math.abs(scrollLeft) / (scrollWidth - clientWidth || 1);
    const newIndex = Math.min(Math.max(0, Math.round(scrollRatio * (totalItems - 1))), totalItems - 1);
    setActiveIndex(newIndex);
  };

  const scrollToCard = (index: number) => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".visible-result-card");
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      setActiveIndex(index);
    }
  };

  return (
    <section className="visible-results-section" id="resultats-visibles">
      <div className="visible-results-container">
        <div className="visible-results-header">
          <span className="visible-results-tag">{r.tag}</span>
          <h2 className="visible-results-title">{r.title}</h2>
          <p className="visible-results-subtitle">{r.subtitle}</p>
        </div>

        {/* 5 Feature Pillars Row / Horizontal Ribbon on Mobile */}
        <div className="visible-results-grid" ref={gridRef} onScroll={handleScroll}>
          {r.benefits.map((item, idx) => (
            <div
              key={item.id}
              className={`visible-result-card ${activeIndex === idx ? "is-active" : ""}`}
              onClick={() => scrollToCard(idx)}
            >
              <div className="result-icon-circle-wrapper">
                <div className="result-icon-circle">{icons[item.id]}</div>
              </div>
              <h3 className="result-card-title">{item.title}</h3>
              <p className="result-card-desc">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Dots indicator for mobile swipe carousel */}
        <div className="results-dots-indicator" aria-hidden="true">
          {r.benefits.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`results-dot ${activeIndex === idx ? "active" : ""}`}
              onClick={() => scrollToCard(idx)}
              aria-label={`Bienfait ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
