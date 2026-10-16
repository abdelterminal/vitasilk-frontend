"use client";

import { useState, useEffect } from 'react';
import brandLogo from '../assets/logo-vitasilk.png';
import { ShoppingBag, Sparkles, Globe } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Navbar({ onOpenOrder }: { onOpenOrder: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#accueil' },
    { name: t.nav.formula, href: '#formule' },
    { name: t.nav.ingredients, href: '#actifs' },
    { name: t.nav.order, href: '#commander' },
  ];

  return (
    <>
      {/* Top luxury announcement bar */}
      <div className="announcement-bar">
        <div className="container">
          <div className="announcement-content">
            <Sparkles size={14} className="announcement-icon" />
            <span>{t.announcement}</span>
            <Sparkles size={14} className="announcement-icon" />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Brand Logo */}
          <a href="#accueil" className="navbar-brand" aria-label="Vitasilk Professional">
            <img 
              src={brandLogo.src} 
              alt="Vitasilk Professional" 
              className="brand-logo-img" 
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="navbar-nav">
            <ul className="nav-list">
              {navLinks.map((link) => (
                <li key={link.name} className={`nav-item ${link.href === '#formule' ? 'nav-item-formule' : ''}`}>
                  <a href={link.href} className="nav-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Button & Language Switch */}
          <div className="navbar-actions">
            <button 
              onClick={toggleLanguage} 
              className="lang-toggle-btn"
              aria-label="Changer de langue"
            >
              <Globe size={15} />
              <span className="lang-text">{lang === 'fr' ? 'العربية' : 'FR'}</span>
            </button>

            <button 
              onClick={onOpenOrder} 
              className="nav-cta-btn"
              aria-label={t.nav.order}
            >
              <ShoppingBag size={17} />
              <span>{t.nav.order}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
