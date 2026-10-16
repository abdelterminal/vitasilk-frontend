"use client";

import brandLogo from '../assets/logo-vitasilk.png';
import { Truck, CreditCard, Headphones } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer-exact">
      <div className="container">
        <div className="footer-bar-grid">
          
          {/* Left: Vitasilk Professional Logo */}
          <div className="footer-brand-side">
            <a href="#accueil" className="footer-logo-link" aria-label="Vitasilk Professional">
              <img src={brandLogo.src} alt="Vitasilk Professional" className="footer-brand-img" />
            </a>
          </div>

          {/* Center: 3 Service Features */}
          <div className="footer-services-row">
            
            <div className="footer-service-item">
              <div className="service-icon-circle">
                <Truck size={20} strokeWidth={1.75} />
              </div>
              <span className="service-text">{t.footer.service1}</span>
            </div>

            <div className="footer-service-item">
              <div className="service-icon-circle">
                <CreditCard size={20} strokeWidth={1.75} />
              </div>
              <span className="service-text">{t.footer.service2}</span>
            </div>

            <div className="footer-service-item">
              <div className="service-icon-circle">
                <Headphones size={20} strokeWidth={1.75} />
              </div>
              <span className="service-text">{t.footer.service3}</span>
            </div>

          </div>

        </div>

        {/* Minimal Copyright */}
        <div className="footer-copyright-row">
          <p>© {new Date().getFullYear()} {t.footer.rights}</p>
        </div>

      </div>
    </footer>
  );
}
