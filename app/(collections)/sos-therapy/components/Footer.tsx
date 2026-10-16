
import type { Translation } from "../lib/translations";
import brandLogo from '../assets/logo.avif';

const Footer = ({ t }: { t: Translation; lang?: unknown }) => {
  const f = t.footer;
  const n = t.nav;

  return (
    <footer className="luxury-footer-container">
      <div className="luxury-footer-inner">
        {/* Main Top Row */}
        <div className="footer-main-row">
          {/* Left / Right brand group */}
          <div className="footer-brand-group">
            <a href="#accueil" className="footer-brand-link" aria-label="Vitasilk Professional">
              <img src={brandLogo.src} alt="Vitasilk Professional" className="footer-logo-img" />
            </a>
            <span className="footer-brand-divider">|</span>
            <p className="footer-slogan-text">
              {f.slogan}
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-nav-social-group">
            <nav className="footer-quick-links" aria-label="Footer Navigation">
              <a href="#resultats-visibles" className="footer-link">{n.benefits}</a>
              <span className="footer-nav-dot">|</span>
              <a href="#ingredients" className="footer-link">{n.ingredients}</a>
              <span className="footer-nav-dot">|</span>
              <a href="#utilisation" className="footer-link">{n.usage}</a>
              <span className="footer-nav-dot">|</span>
              <a href="#commander" className="footer-link">{n.orderBtn}</a>
            </nav>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="footer-bottom-row">
          <div className="footer-copyright-text">
            © {new Date().getFullYear()} Vitasilk Professional. {f.rights}
          </div>
          <div className="footer-brand-motto">
            {f.motto}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

