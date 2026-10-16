"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Globe } from "lucide-react";
import { useLanguage } from "../lib/i18n";
import brandLogo from "../assets/vitasilk-logo.png";

export default function Navbar() {
  const { t, language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection("hero"); }} className="nav-brand-logo" aria-label="Vitasilk Professional">
          <img src={brandLogo.src} alt="Vitasilk Professional" className="brand-logo-img" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav-links">
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection("hero"); }} className="nav-item">{t.nav.home}</a>
          <a href="#produits" onClick={(e) => { e.preventDefault(); scrollToSection("produits"); }} className="nav-item">{t.nav.collection}</a>
          <a href="#routine" onClick={(e) => { e.preventDefault(); scrollToSection("routine"); }} className="nav-item">{t.nav.routine}</a>
        </nav>

        {/* Right Actions */}
        <div className="nav-right-actions">
          {/* Language Switcher Pill */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="lang-switcher-pill"
            aria-label="Changer la langue / تغيير اللغة"
            title={language === "fr" ? "Passer en Arabe" : "Passer en Français"}
          >
            <Globe size={15} />
            <div className="lang-pill-options">
              <span className={`lang-pill-code ${language === "fr" ? "is-active" : ""}`}>FR</span>
              <span className="lang-pill-sep">/</span>
              <span className={`lang-pill-code ${language === "ar" ? "is-active" : ""}`}>عربي</span>
            </div>
          </button>

          {/* Commander CTA Button */}
          <a
            href="#commander"
            onClick={(e) => { e.preventDefault(); scrollToSection("commander"); }}
            className="btn-luxury btn-nav-cta desktop-only"
          >
            <span>{t.nav.order}</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection("hero"); }} className="nav-brand-logo" aria-label="Vitasilk Professional">
                <img src={brandLogo.src} alt="Vitasilk Professional" className="drawer-logo-img" />
              </a>
              <button className="icon-btn" onClick={() => setMobileMenuOpen(false)} aria-label={t.nav.closeMenu}>
                <X size={22} />
              </button>
            </div>

            <nav className="mobile-nav-list">
              <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection("hero"); }}>{t.nav.home}</a>
              <a href="#produits" onClick={(e) => { e.preventDefault(); scrollToSection("produits"); }}>{t.nav.collection}</a>
              <a href="#routine" onClick={(e) => { e.preventDefault(); scrollToSection("routine"); }}>{t.nav.routine3Steps}</a>
              <a href="#produits" onClick={(e) => { e.preventDefault(); scrollToSection("produits"); }}>{t.nav.ourProducts}</a>
            </nav>

            <div className="drawer-footer">
              {/* Drawer Language Switcher */}
              <div className="drawer-lang-row">
                <span className="drawer-lang-label">Langue / اللغة :</span>
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="lang-switcher-pill"
                >
                  <Globe size={15} />
                  <div className="lang-pill-options">
                    <span className={`lang-pill-code ${language === "fr" ? "is-active" : ""}`}>FR</span>
                    <span className="lang-pill-sep">/</span>
                    <span className={`lang-pill-code ${language === "ar" ? "is-active" : ""}`}>عربي</span>
                  </div>
                </button>
              </div>

              <a
                href="#commander"
                onClick={(e) => { e.preventDefault(); scrollToSection("commander"); }}
                className="btn-luxury btn-drawer-cta"
              >
                <span>{t.nav.orderRoutine}</span>
                <ArrowRight size={16} />
              </a>
              <p className="drawer-guarantee">{t.nav.guarantee}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
