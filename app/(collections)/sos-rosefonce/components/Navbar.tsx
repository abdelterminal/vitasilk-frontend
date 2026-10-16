"use client";

import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Sparkles, Globe } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Navbar({ onOpenOrder }: { onOpenOrder: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, lang, toggleLang, isRtl } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="navbar-announcement" style={{
        background: 'linear-gradient(90deg, #601431 0%, #88254b 50%, #601431 100%)',
        color: '#fff',
        padding: '7px 16px',
        fontSize: '0.82rem',
        fontWeight: '500',
        letterSpacing: isRtl ? '0' : '0.04em',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        direction: 'ltr'
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={13} color="#f6d397" />
          <span>
            {t.announcement.text} <strong>{t.announcement.discount}</strong> {t.announcement.onCure} <strong>{t.announcement.freeShipping}</strong>
          </span>
        </span>
        <span style={{
          background: 'rgba(255,255,255,0.18)',
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '0.75rem',
          fontWeight: 600,
          whiteSpace: 'nowrap'
        }}>
          {t.announcement.limitedStock}
        </span>
      </div>

      {/* Main Navbar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'all 0.35s ease',
        background: isScrolled ? 'rgba(255, 245, 248, 0.92)' : 'rgba(255, 248, 250, 0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isScrolled ? '1px solid rgba(156, 40, 84, 0.12)' : '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: isScrolled ? '0 8px 24px rgba(120, 29, 62, 0.08)' : 'none',
        padding: isScrolled ? '10px 0' : '14px 0',
        direction: 'ltr'
      }}>
        <div className="navbar-inner" style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          {/* Brand Logo (Vitasilk Professional) */}
          <a 
            href="#" 
            className="navbar-brand-link"
            aria-label="Vitasilk Professional"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              padding: '2px 0'
            }}
          >
            <img 
              src="/sos-rosefonce/logo.avif" 
              alt="Vitasilk Professional" 
              className="navbar-brand-logo"
              style={{
                height: isScrolled ? '36px' : '42px',
                width: 'auto',
                maxWidth: '190px',
                objectFit: 'contain',
                transition: 'all 0.3s ease',
                display: 'block'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </a>

          {/* Desktop Navigation Links */}
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '24px'
          }} className="desktop-nav">
            <a href="#hero" className="nav-link-item">{t.nav.home}</a>
            <a href="#benefices" className="nav-link-item">{t.nav.whyVitaPlex}</a>
            <a href="#ingredients" className="nav-link-item">{t.nav.ingredients}</a>
            <a href="#resultats" className="nav-link-item desktop-results-link">{t.nav.results}</a>
            <a href="#routine" className="nav-link-item">{t.nav.routine}</a>

          </div>

          {/* Nav Right: Language Switcher + CTA Button */}
          <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            
            {/* Language Switcher Toggle Button */}
            <button
              onClick={toggleLang}
              className="navbar-language"
              aria-label="Toggle Language"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: '9999px',
                border: '1px solid rgba(136, 37, 75, 0.3)',
                background: 'rgba(255, 255, 255, 0.85)',
                color: '#761d3e',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 2px 8px rgba(136, 37, 75, 0.08)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#fff0f5';
                e.currentTarget.style.borderColor = '#88254b';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.85)';
                e.currentTarget.style.borderColor = 'rgba(136, 37, 75, 0.3)';
              }}
            >
              <Globe size={15} color="#88254b" />
              <span>{lang === 'fr' ? 'العربية' : 'FR'}</span>
            </button>

            {/* Commander CTA Button */}
            <button
              onClick={onOpenOrder}
              id="nav-commander-btn"
              className="btn-primary-luxury"
              style={{
                padding: '9px 20px',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              <ShoppingBag size={16} />
              <span>{t.nav.orderBtn}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                border: '1px solid rgba(156, 40, 84, 0.2)',
                background: 'rgba(255, 255, 255, 0.85)',
                color: '#88254b',
                cursor: 'pointer'
              }}
              className="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div style={{
            background: 'rgba(255, 245, 248, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(156, 40, 84, 0.15)',
            padding: '20px 24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            animation: 'fadeIn 0.25s ease',
            direction: 'ltr'
          }}>
            <a 
              href="#hero" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#2c0b17', textDecoration: 'none', fontWeight: 600, fontSize: '1.02rem', padding: '6px 0' }}
            >
              {t.nav.home}
            </a>
            <a 
              href="#benefices" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#2c0b17', textDecoration: 'none', fontWeight: 600, fontSize: '1.02rem', padding: '6px 0' }}
            >
              {t.nav.whyVitaPlex}
            </a>
            <a 
              href="#ingredients" 
              className="mobile-ingredients-link"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#2c0b17', textDecoration: 'none', fontWeight: 600, fontSize: '1.02rem', padding: '6px 0' }}
            >
              {t.nav.ingredients}
            </a>
            <a 
              href="#resultats" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#2c0b17', textDecoration: 'none', fontWeight: 600, fontSize: '1.02rem', padding: '6px 0' }}
            >
              {t.nav.results}
            </a>
            <a 
              href="#routine" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#2c0b17', textDecoration: 'none', fontWeight: 600, fontSize: '1.02rem', padding: '6px 0' }}
            >
              {t.nav.routine}
            </a>
            
            <div style={{ paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Mobile Language Switcher */}
              <button
                onClick={() => {
                  toggleLang();
                  setMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid rgba(136, 37, 75, 0.3)',
                  background: '#fff',
                  color: '#761d3e',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Globe size={18} color="#88254b" />
                <span>{lang === 'fr' ? 'Changer de langue : 🇲🇦 العربية' : 'تغيير اللغة إلى : 🇫🇷 Français'}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrder();
                }}
                className="btn-primary-luxury"
                style={{ width: '100%', padding: '14px' }}
              >
                <ShoppingBag size={18} />
                <span>{t.nav.orderBtn}</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Responsive helper styles */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-results-link {
            display: none !important;
          }
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 899px) {
          .navbar-inner { padding-inline: 12px !important; gap: 8px !important; }
          .navbar-brand-link { min-width: 0; flex: 1; }
          .navbar-brand-logo { width: 100% !important; min-width: 0; height: auto !important; max-width: 104px !important; }
          .navbar-actions { gap: 6px !important; flex-shrink: 0; }
          .navbar-language { height: 38px; padding: 6px 9px !important; gap: 4px !important; white-space: nowrap; font-size: 11px !important; }
          .navbar-language svg { width: 13px; flex-shrink: 0; }
          #nav-commander-btn { min-height: 38px; padding: 7px 12px !important; gap: 5px !important; white-space: nowrap; font-size: 12px !important; }
          #nav-commander-btn svg { display: none; }
          .mobile-menu-btn { width: 34px !important; height: 38px !important; flex-shrink: 0; }

          .navbar-announcement {
            display: none !important;
          }
          a[href="#routine"] {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .navbar-brand-logo {
            height: 34px !important;
          }
          .mobile-ingredients-link,
          .mobile-avis-link {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .navbar-brand-logo {
            height: 30px !important;
            max-width: 135px !important;
          }
        }
        @media (max-width: 500px) {
          #nav-commander-btn {
            padding: 8px 14px !important;
            font-size: 0.84rem !important;
          }
        }
      `}</style>
    </>
  );
}
