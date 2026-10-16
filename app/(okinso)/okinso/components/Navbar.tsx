"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ChevronRight, Sparkles, Globe } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import brandLogo from '../assets/brand-logo.png';

export default function Navbar({ onOpenOrder }: { onOpenOrder: () => void }) {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'home', name: t.nav.home, href: '#hero' },
    { key: 'products', name: t.nav.products, href: '#produits' },
    { key: 'ingredients', name: t.nav.ingredients, href: '#ingredients' },
    { key: 'reviews', name: t.nav.reviews, href: '#avis' },
    { key: 'faq', name: t.nav.faq, href: '#faq' },
  ];

  return (
    <header className={`vitasilk-navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top micro announcement bar */}
      <div className="vitasilk-topbar">
        <div className="topbar-content">
          <Sparkles size={13} className="topbar-icon" />
          <span>{t.topbar.text}</span>
          <Sparkles size={13} className="topbar-icon" />
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="vitasilk-navbar">
        <div className="navbar-container">
          
          {/* Brand Logo */}
          <a href="#hero" className="navbar-brand" aria-label="Vitasilk Professional">
            <img 
              src={brandLogo.src} 
              alt="Vitasilk Professional" 
              className="navbar-brand-logo" 
            />
          </a>

          {/* Desktop Nav Links */}
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.key} className="nav-item">
                <a
                  href={link.href}
                  className={`nav-link ${activeLink === link.key ? 'active' : ''}`}
                  onClick={() => {
                    setActiveLink(link.key);
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                  {activeLink === link.key && <span className="active-indicator" />}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Action: Language Switcher & Commander Button */}
          <div className="navbar-actions">
            {/* Desktop Language Switcher */}
            <div className="lang-switcher-pill" role="group" aria-label="Language Selector">
              <button 
                type="button" 
                className={`lang-btn ${language === 'fr' ? 'active' : ''}`}
                onClick={() => setLanguage('fr')}
                title="Français"
              >
                FR
              </button>
              <span className="lang-divider">/</span>
              <button 
                type="button" 
                className={`lang-btn ${language === 'ar' ? 'active' : ''}`}
                onClick={() => setLanguage('ar')}
                title="العربية"
              >
                العربية
              </button>
            </div>

            <button 
              className="btn-commander"
              onClick={onOpenOrder}
              id="navbar-commander-btn"
            >
              <ShoppingBag size={16} className="btn-icon" />
              <span>{t.nav.order}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer animate-slideDown">
            {/* Mobile Language Switcher Row */}
            <div className="mobile-lang-row">
              <div className="mobile-lang-label">
                <Globe size={16} />
                <span>Langue / اللغة :</span>
              </div>
              <div className="lang-switcher-pill">
                <button 
                  type="button" 
                  className={`lang-btn ${language === 'fr' ? 'active' : ''}`}
                  onClick={() => setLanguage('fr')}
                >
                  FR
                </button>
                <span className="lang-divider">/</span>
                <button 
                  type="button" 
                  className={`lang-btn ${language === 'ar' ? 'active' : ''}`}
                  onClick={() => setLanguage('ar')}
                >
                  العربية
                </button>
              </div>
            </div>

            <ul className="mobile-links">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className={`mobile-link ${activeLink === link.key ? 'active' : ''}`}
                    onClick={() => {
                      setActiveLink(link.key);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <span>{link.name}</span>
                    <ChevronRight size={18} className="chevron" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mobile-cta-box">
              <button 
                className="btn-commander mobile-btn-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrder();
                }}
              >
                <ShoppingBag size={18} className="btn-icon" />
                <span>{t.nav.orderNow}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
