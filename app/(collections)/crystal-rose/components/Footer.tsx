"use client";

import { useLanguage } from "../lib/i18n";
import botanicalLeaves from "../assets/botanical_leaves.webp";
import brandLogo from "../assets/vitasilk-logo.png";

export default function Footer() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="luxury-footer-v2">
      <div className="footer-container-v2">
        <div className="footer-grid-v2">
          {/* Brand & Copyright Column */}
          <div className="footer-col-v2 footer-col-brand">
            <div className="footer-brand-logo-v2">
              <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection("hero"); }} className="footer-brand-link" aria-label="Vitasilk Professional">
                <img src={brandLogo.src} alt="Vitasilk Professional" className="footer-logo-img" />
              </a>
            </div>
            <p className="footer-copyright-v2">
              {t.footer.copyright}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="footer-col-v2">
            <h4 className="footer-title-v2">{t.footer.colNavTitle}</h4>
            <ul className="footer-list-v2">
              <li><a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection("hero"); }}>{t.footer.links.home}</a></li>
              <li><a href="#produits" onClick={(e) => { e.preventDefault(); scrollToSection("produits"); }}>{t.footer.links.collection}</a></li>
              <li><a href="#routine" onClick={(e) => { e.preventDefault(); scrollToSection("routine"); }}>{t.footer.links.routine}</a></li>
            </ul>
          </div>

          {/* Signature Column */}
          <div className="footer-col-v2 footer-col-signature">
            <div className="footer-handwritten-badge">
              <span className="cursive-signature">{t.footer.signature}</span>
            </div>
          </div>
        </div>

        {/* Botanical watermark in corner */}
        <img
          src={botanicalLeaves.src}
          alt=""
          className="footer-botanical-accent"
          aria-hidden="true"
        />
      </div>
    </footer>
  );
}
