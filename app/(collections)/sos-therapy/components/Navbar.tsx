"use client";

import { useState } from "react";
import brandLogo from "../assets/logo.avif";
import type { Lang } from "../lib/config";
import type { Translation } from "../lib/translations";

type Props = {
  onOrderClick: () => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translation;
};

export default function Navbar({ onOrderClick, lang, setLang, t }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLang(lang === "fr" ? "ar" : "fr");
  };

  return (
    <header className="navbar-container">
      <nav className="navbar" aria-label="Navigation">
        {/* Vitasilk Professional Brand Logo */}
        <a href="#accueil" className="nav-brand" aria-label="Vitasilk Professional">
          <img src={brandLogo.src} alt="Vitasilk Professional" className="nav-brand-logo-img" />
        </a>

        {/* Navigation Links */}
        <ul className={`nav-links ${mobileMenuOpen ? "mobile-active" : ""}`}>
          <li>
            <a href="#accueil" className="nav-link active" onClick={handleLinkClick}>
              {t.nav.home}
            </a>
          </li>
          <li>
            <a href="#resultats-visibles" className="nav-link" onClick={handleLinkClick}>
              {t.nav.benefits}
            </a>
          </li>
          <li>
            <a href="#ingredients" className="nav-link" onClick={handleLinkClick}>
              {t.nav.ingredients}
            </a>
          </li>
          <li>
            <a href="#utilisation" className="nav-link" onClick={handleLinkClick}>
              {t.nav.usage}
            </a>
          </li>
        </ul>

        {/* Nav Actions: Language Switcher + Commander Button + Mobile Menu Toggle */}
        <div className="nav-actions">
          <button
            type="button"
            className="btn-lang-switcher"
            onClick={toggleLanguage}
            title={lang === "fr" ? "Passer en Arabe" : "Passer en Français"}
          >
            {lang === "fr" ? (
              <span className="lang-toggle-content">🇲🇦 العربية</span>
            ) : (
              <span className="lang-toggle-content">🇫🇷 Français</span>
            )}
          </button>

          <button
            type="button"
            className="btn-commander-exact"
            onClick={() => {
              onOrderClick();
              setMobileMenuOpen(false);
            }}
            id="nav-commander-btn"
          >
            {t.nav.orderBtn}
          </button>

          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>
    </header>
  );
}
