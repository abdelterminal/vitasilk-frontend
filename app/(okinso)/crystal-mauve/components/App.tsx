"use client"

import { useEffect, useState } from 'react'
import {
  Search,
  User,
  ShoppingBag,
  ArrowRight,
  Check,
  X,
  Plus,
  Minus,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Leaf,
  Menu,
  Phone,
  MapPin,
  Sparkles,
  Globe
} from 'lucide-react'
import { translations } from '../lib/translations'
import {
  PRICE_DH,
  OLD_PRICE_DH,
  PACK_TITLE,
  PRODUCT_NAME,
  WHATSAPP_NUMBER,
  formatDh,
  type Lang
} from '../lib/config'

type OrderFields = {
  fullName: string
  phone: string
  address: string
  city: string
}

type ConfirmedOrder = OrderFields & {
  pack: { title: string; packsCount: number; price: number; original: number }
}

const isValidMoroccanPhone = (raw: string) =>
  /^(?:\+212|0)[5-7]\d{8}$/.test(raw.replace(/[\s-]/g, ''))

function App() {
  const [lang, setLang] = useState<Lang>('fr')
  const t = translations[lang]

  // index.html shipped <html lang="en">; mirror the active language on the
  // document while this page is mounted, and restore it on the way out.
  useEffect(() => {
    const root = document.documentElement
    const prevLang = root.lang
    root.lang = lang
    return () => {
      root.lang = prevLang
    }
  }, [lang])

  const [cartCount, setCartCount] = useState(0)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('Accueil')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Order Form State
  const [formData, setFormData] = useState<OrderFields>({
    fullName: '',
    phone: '',
    address: '',
    city: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [confirmedOrderDetails, setConfirmedOrderDetails] = useState<ConfirmedOrder | null>(null)
  const [orderReference, setOrderReference] = useState('')
  const [orderError, setOrderError] = useState(false)

  const defaultPack = {
    title: PACK_TITLE[lang],
    packsCount: 1,
    price: PRICE_DH,
    original: OLD_PRICE_DH
  }

  const handleAddToCart = (qty = 1) => {
    setCartCount(prev => prev + qty)
    setIsCartOpen(true)
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      alert(t.order.requiredFields)
      return
    }
    if (!isValidMoroccanPhone(formData.phone)) {
      alert(t.order.invalidPhone)
      return
    }

    setIsSubmitting(true)
    setOrderError(false)

    try {
      // Price is not sent: the server computes the total from lib/config.ts.
      const res = await fetch('/api/landing/crystal-mauve/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.phone,
          city: formData.city,
          address: formData.address,
          qty: defaultPack.packsCount,
          lang
        })
      })
      if (!res.ok) throw new Error(String(res.status))
      const data = await res.json().catch(() => ({}))
      setOrderReference(typeof data.ref === 'string' ? data.ref : '')
    } catch (err) {
      // Never pretend a failed order went through: surface the error with a
      // WhatsApp fallback instead of the success screen.
      console.error('Order submission error:', err)
      setOrderError(true)
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    setConfirmedOrderDetails({
      ...formData,
      pack: defaultPack
    })
    setOrderConfirmed(true)
    setCartCount(prev => prev + 1)

    // Smooth scroll to the order section so the user sees the confirmation
    setTimeout(() => {
      const orderSection = document.getElementById('commander')
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }

  const handleResetOrder = () => {
    setFormData({
      fullName: '',
      phone: '',
      address: '',
      city: ''
    })
    setOrderConfirmed(false)
    setConfirmedOrderDetails(null)
    setOrderReference('')
    setOrderError(false)
  }

  const scrollToSection = (id: string, event?: React.MouseEvent) => {
    event?.preventDefault()
    setMobileMenuOpen(false)
    const targetId = id === 'resultats' && window.matchMedia('(max-width: 860px)').matches ? 'resultats-mobile' : id
    const element = document.getElementById(targetId)
    if (element) {
      if (event) window.history.pushState(null, '', '#' + id)
      setActiveNav(id === 'hero' ? 'Accueil' : id === 'produits-details' ? 'Produits' : id)
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={`okinso-page-root ${lang === 'ar' ? 'lang-ar' : ''}`} lang={lang} dir="ltr">
      {/* =========================================================================
          1. HERO & HEADER FULL-WIDTH VIEWPORT
          ========================================================================= */}
      <div id="hero" className="hero-viewport-wrapper">
        {/* Navigation Bar floating over hero background */}
        <header className="transparent-navbar">
          <div className="navbar-inner-container">
            {/* Brand Logo */}
            <a href="#hero" className="brand-logo-link" onClick={(e) => scrollToSection('hero', e)}>
              <img src="/crystal-mauve/brand-logo.avif" alt="Vitasilk Professional" className="okinso-brand-logo" />
            </a>

            {/* Navigation links */}
            <nav className="navbar-center-links desktop-only">
              <a
                href="#hero"
                className={`nav-link-item ${activeNav === 'Accueil' ? 'active' : ''}`}
                onClick={(e) => scrollToSection('hero', e)}
              >
                {t.nav.home}
                {activeNav === 'Accueil' && <span className="nav-active-bar" />}
              </a>
              <a
                href="#produits-details"
                className={`nav-link-item ${activeNav === 'Produits' ? 'active' : ''}`}
                onClick={(e) => scrollToSection('produits-details', e)}
              >
                {t.nav.products}
                {activeNav === 'Produits' && <span className="nav-active-bar" />}
              </a>
              <a href="#resultats" className={`nav-link-item ${activeNav === 'resultats' ? 'active' : ''}`} onClick={(e) => scrollToSection('resultats', e)}>
                {t.results.tag}
                {activeNav === 'resultats' && <span className="nav-active-bar" />}
              </a>
              <a href="#comment-utiliser" className={`nav-link-item ${activeNav === 'comment-utiliser' ? 'active' : ''}`} onClick={(e) => scrollToSection('comment-utiliser', e)}>
                {t.howToUse.title}
                {activeNav === 'comment-utiliser' && <span className="nav-active-bar" />}
              </a>
            </nav>

            {/* Right icons: Language Switcher, Search, User, Cart */}
            <div className="navbar-right-utilities">
              {/* Language Switcher Pill */}
              <button
                type="button"
                className="lang-toggle-btn"
                onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
                title={lang === 'fr' ? 'Passer en arabe' : 'Passer en français'}
                aria-label="Changer de langue"
              >
                <Globe size={15} strokeWidth={2} />
                <span>{lang === 'fr' ? 'العربية' : 'FR'}</span>
              </button>

              {/* Commander Button */}
              <button
                type="button"
                className="nav-order-cta-btn"
                onClick={() => scrollToSection('commander')}
              >
                <Sparkles size={15} />
                <span>{t.nav.order}</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                className="mobile-menu-trigger mobile-only"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {mobileMenuOpen && (
            <div className="mobile-dropdown-menu">
              <button
                type="button"
                className="mobile-lang-btn"
                onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
              >
                <Globe size={18} />
                <span>{lang === 'fr' ? '🌐 العربية' : '🌐 Français'}</span>
              </button>
              <a href="#hero" onClick={(e) => scrollToSection('hero', e)}>{t.nav.home}</a>
              <a href="#produits-details" onClick={(e) => scrollToSection('produits-details', e)}>{t.nav.products}</a>
              <a href="#resultats" onClick={(e) => scrollToSection('resultats', e)}>{t.results.tag}</a>
              <a href="#comment-utiliser" onClick={(e) => scrollToSection('comment-utiliser', e)}>{t.howToUse.title}</a>
              <button
                type="button"
                className="mobile-pack-btn"
                onClick={() => scrollToSection('commander')}
              >
                {t.nav.orderPack}
              </button>
            </div>
          )}
        </header>

        {/* Hero Content Section */}
        <section className="hero-main-content">
          <div className="hero-content-inner">
            {/* Left Content Column */}
            <div className="hero-left-column">
              {/* Category tag */}
              <div className="hero-tag-text">
                {t.hero.tag}
              </div>

              {/* Main title with italic purple typography */}
              <h1 className="hero-title-text">
                {t.hero.titlePart1}<span className="purple-serif-italic">{t.hero.titleHighlight1}</span>
                <br />
                {t.hero.titlePart2}<span className="purple-serif-italic">{t.hero.titleHighlight2}</span>
              </h1>

              {/* Lead paragraph */}
              <p className="hero-paragraph-text">
                {t.hero.desc}
              </p>

              {/* Primary pill CTA */}
              <div className="hero-btn-container">
                <button
                  type="button"
                  className="hero-discover-btn"
                  onClick={() => scrollToSection('commander')}
                >
                  <span>{t.hero.cta}</span>
                  <ArrowRight size={16} className="btn-arrow" />
                </button>
              </div>

              {/* 4 Feature circular badges */}
              <div className="hero-features-bar">
                {/* 1: Cheveux plus forts et résistants */}
                <div className="feature-item-box">
                  <div className="feature-circle-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7a58a6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <span className="feature-caption">{t.hero.features[0]}</span>
                </div>

                {/* 2: Hydratation intense */}
                <div className="feature-item-box">
                  <div className="feature-circle-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7a58a6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                      <path d="M12 8a4 4 0 0 1 4 4" />
                    </svg>
                  </div>
                  <span className="feature-caption">{t.hero.features[1]}</span>
                </div>

                {/* 3: Brillance naturelle */}
                <div className="feature-item-box">
                  <div className="feature-circle-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7a58a6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
                      <circle cx="19" cy="5" r="1.3" fill="#7a58a6" />
                    </svg>
                  </div>
                  <span className="feature-caption">{t.hero.features[2]}</span>
                </div>

                {/* 4: Convient à tous types de cheveux */}
                <div className="feature-item-box">
                  <div className="feature-circle-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7a58a6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 3a9 9 0 0 0 9 9" />
                      <path d="M12 7c2.76 0 5 2.24 5 5" />
                      <path d="M7 16c1.5-1 3-1 4.5 0s3 1 4.5 0" />
                    </svg>
                  </div>
                  <span className="feature-caption">{t.hero.features[3]}</span>
                </div>
              </div>
            </div>

            {/* Right side handwritten note floating above the bottles */}
            <div className="hero-right-handwriting desktop-only">
              <div className="handwriting-text" style={{ whiteSpace: 'pre-line' }}>
                {t.hero.handwriting}
              </div>
              <div className="handwriting-heart">♡</div>
            </div>
          </div>
        </section>
        <div className="mobile-pack-heading">
          <h2>
            {t.hero.titlePart1}<span className="purple-serif-italic">{t.hero.titleHighlight1}</span>
            <br />
            {t.hero.titlePart2}<span className="purple-serif-italic">{t.hero.titleHighlight2}</span>
          </h2>
        </div>
      </div>

      {/* =========================================================================
          2. SECTION "DES RÉSULTATS VISIBLES DÈS LA PREMIÈRE UTILISATION"
          ========================================================================= */}
      <section id="resultats" className="hair-results-section">
        <div className="section-wide-container">
          <div className="results-split-layout">
            {/* Left Col: Model Image Showcase */}
            <div className="results-image-col">
              <div className="results-image-wrapper">
                <img
                  src="/crystal-mauve/hair-results-model.webp"
                  alt="Résultats visibles après l'utilisation du pack Crystal Organic Hair Care"
                  className="results-model-img"
                />
                <div className="results-floating-badge top-right">
                  <Sparkles size={16} className="badge-sparkle" />
                  <span>{t.results.badge1}</span>
                </div>
                <div className="results-floating-badge bottom-left">
                  <span className="badge-check-circle">✓</span>
                  <span>{t.results.badge2}</span>
                </div>
              </div>
            </div>

            {/* Right Col: Content and Proof Metrics */}
            <div className="results-content-col">
              <div className="results-tag">{t.results.tag}</div>
              <h2 className="results-title">
                {t.results.titlePart1}<br />
                <span className="purple-serif-italic">{t.results.titleHighlight}</span><br />
                {t.results.titlePart2}
              </h2>
              <p className="results-desc">
                {t.results.desc}
              </p>

              <div className="results-metrics-grid">
                <div className="metric-box">
                  <span className="metric-number">{t.results.metrics[0].number}</span>
                  <span className="metric-label">{t.results.metrics[0].label}</span>
                </div>
                <div className="metric-box">
                  <span className="metric-number">{t.results.metrics[1].number}</span>
                  <span className="metric-label">{t.results.metrics[1].label}</span>
                </div>
                <div className="metric-box">
                  <span className="metric-number">{t.results.metrics[2].number}</span>
                  <span className="metric-label">{t.results.metrics[2].label}</span>
                </div>
              </div>

              <div className="results-cta-row">
                <button
                  type="button"
                  className="results-cta-btn"
                  onClick={() => scrollToSection('commander')}
                >
                  <span>{t.results.cta}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SECTION "POURQUOI CHOISIR NOTRE PACK ?"
          ========================================================================= */}
      <section id="pourquoi-nous" className="why-pack-section">
        <div className="section-narrow-container">
          <div className="why-header text-center">
            <h2 className="why-title">{t.why.title}</h2>
            <p className="why-subtitle">
              {t.why.subtitle}
            </p>
          </div>

          <div className="why-grid">
            {/* Feature 1 */}
            <div className="why-feature-card">
              <div className="why-icon-bubble">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7e57b2" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="8" width="5" height="13" rx="1.5" />
                  <path d="M4.5 5h2v3h-2z" />
                  <rect x="9.5" y="5" width="5" height="16" rx="1.5" />
                  <path d="M11 2h2v3h-2z" />
                  <rect x="16" y="10" width="5" height="11" rx="1.5" />
                  <path d="M17.5 7h2v3h-2z" />
                </svg>
              </div>
              <h3 className="why-item-title">{t.why.items[0].title}</h3>
              <p className="why-item-sub">{t.why.items[0].desc}</p>
            </div>

            {/* Feature 2 */}
            <div className="why-feature-card">
              <div className="why-icon-bubble">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7e57b2" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 4.5 3 8 7 9.5 0-3 1-6 3-8 2 2 3 5 3 8 4-1.5 7-5 7-9.5 0-5.5-4.5-10-10-10z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <h3 className="why-item-title">{t.why.items[1].title}</h3>
              <p className="why-item-sub">{t.why.items[1].desc}</p>
            </div>

            {/* Feature 3 */}
            <div className="why-feature-card">
              <div className="why-icon-bubble">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7e57b2" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="why-item-title">{t.why.items[2].title}</h3>
              <p className="why-item-sub">{t.why.items[2].desc}</p>
            </div>

            {/* Feature 4 */}
            <div className="why-feature-card">
              <div className="why-icon-bubble">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7e57b2" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="m9 15 2 2 4-4" />
                </svg>
              </div>
              <h3 className="why-item-title">{t.why.items[3].title}</h3>
              <p className="why-item-sub">{t.why.items[3].desc}</p>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          4. SECTION "LE TRIO DE SOINS EN DÉTAIL"
          ========================================================================= */}
      <div id="resultats-mobile" className="mobile-results-photo">
        <div className="results-image-wrapper">
          <img src="/crystal-mauve/hair-results-model.webp" alt={t.results.titlePart1} className="results-model-img" loading="lazy" />
          <div className="results-floating-badge top-right">
            <Sparkles size={16} className="badge-sparkle" />
            <span>{t.results.badge1}</span>
          </div>
          <div className="results-floating-badge bottom-left">
            <span className="badge-check-circle">✓</span>
            <span>{t.results.badge2}</span>
          </div>
        </div>
      </div>
      <section id="produits-details" className="products-spotlight-section">
        <div className="spotlight-container">
          
          {/* Row 1: 1. SHAMPOING (Image Left, Content Right) */}
          <div className="spotlight-row">
            <div className="spotlight-image-col">
              <div className="product-ambient-card">
                <img
                  src="/crystal-mauve/product-shampoo-hd.webp"
                  alt="1. Shampoing Crystal Organic Hair Care"
                  className="spotlight-img"
                />
              </div>
            </div>

            <div className="spotlight-content-col">
              <span className="product-step-tag">{t.products.shampoo.tag}</span>
              <h2 className="spotlight-title">
                {t.products.shampoo.titlePart1}<span className="purple-serif-italic">{t.products.shampoo.titleHighlight1}</span>
                <br />
                {t.products.shampoo.titlePart2}<span className="purple-serif-italic">{t.products.shampoo.titleHighlight2}</span>
              </h2>
              <p className="spotlight-desc">
                {t.products.shampoo.desc}
              </p>

              <div className="spotlight-checklist">
                {t.products.shampoo.checks.map((chk, i) => (
                  <div key={i} className="check-line">
                    <span className="purple-check">✓</span>
                    <span>{chk}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="spotlight-more-btn"
                onClick={() => scrollToSection('commander')}
              >
                <span>{t.products.shampoo.cta}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Row 2: 2. MASQUE CAPILLAIRE (Content Left, Image Right) */}
          <div className="spotlight-row reversed">
            <div className="spotlight-content-col">
              <span className="product-step-tag">{t.products.mask.tag}</span>
              <h2 className="spotlight-title">
                <span className="purple-serif-italic">{t.products.mask.titleHighlight}</span>
                <br />
                {t.products.mask.titlePart2}
              </h2>
              <p className="spotlight-desc">
                {t.products.mask.desc}
              </p>

              <div className="spotlight-checklist">
                {t.products.mask.checks.map((chk, i) => (
                  <div key={i} className="check-line">
                    <span className="purple-check">✓</span>
                    <span>{chk}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="spotlight-more-btn"
                onClick={() => scrollToSection('commander')}
              >
                <span>{t.products.mask.cta}</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="spotlight-image-col">
              <div className="product-ambient-card">
                <img
                  src="/crystal-mauve/product-mask-hd.webp"
                  alt="2. Masque Capillaire Crystal Organic Hair Care"
                  className="spotlight-img"
                />
              </div>
            </div>
          </div>

          {/* Row 3: 3. SÉRUM (Image Left, Content Right) */}
          <div className="spotlight-row">
            <div className="spotlight-image-col">
              <div className="product-ambient-card">
                <img
                  src="/crystal-mauve/product-serum-hd.webp"
                  alt="3. Sérum Crystal Organic Hair Care"
                  className="spotlight-img"
                />
              </div>
            </div>

            <div className="spotlight-content-col">
              <span className="product-step-tag">{t.products.serum.tag}</span>
              <h2 className="spotlight-title">
                <span className="purple-serif-italic">{t.products.serum.titleHighlight}</span>
                <br />
                {t.products.serum.titlePart2}
              </h2>
              <p className="spotlight-desc">
                {t.products.serum.desc}
              </p>

              <div className="spotlight-checklist">
                {t.products.serum.checks.map((chk, i) => (
                  <div key={i} className="check-line">
                    <span className="purple-check">✓</span>
                    <span>{chk}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="spotlight-more-btn"
                onClick={() => scrollToSection('commander')}
              >
                <span>{t.products.serum.cta}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. SECTION "COMMENT L'UTILISER ?"
          ========================================================================= */}
      <section id="comment-utiliser" className="how-to-use-section">
        <div className="section-narrow-container text-center">
          <h2 className="how-to-use-title">{t.howToUse.title}</h2>
          <p className="how-to-use-subtitle">
            {t.howToUse.subtitle}
          </p>

          <div className="how-to-use-grid">
            {t.howToUse.steps.map((st, i) => (
              <div key={i} className="use-step-card">
                <div className="use-step-number-bubble">{st.num}</div>
                <h3 className="use-step-heading">{st.title}</h3>
                <p className="use-step-text">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. SECTION "VOTRE ROUTINE CAPILLAIRE COMPLÈTE AU NATUREL" + FORMULAIRE
          ========================================================================= */}
      <section id="commander" className="order-routine-section">
        <div className="page-container">
          <div className="routine-banner-card">
            {orderConfirmed && confirmedOrderDetails ? (
              <div className="order-success-screen-card">
                {/* Decorative floating celebration confetti particles */}
                <div className="success-confetti-bg" aria-hidden="true">
                  <span className="confetti-piece p1"></span>
                  <span className="confetti-piece p2"></span>
                  <span className="confetti-piece p3"></span>
                  <span className="confetti-piece p4"></span>
                  <span className="confetti-piece p5"></span>
                  <span className="confetti-piece p6"></span>
                  <span className="confetti-piece p7"></span>
                  <span className="confetti-piece p8"></span>
                  <span className="confetti-piece p9"></span>
                  <span className="confetti-piece p10"></span>
                </div>

                {/* Top Success Icon */}
                <div className="success-icon-badge">
                  <Check size={36} strokeWidth={2.8} />
                </div>

                {/* Title */}
                <h3 className="success-heading">{t.success.title}</h3>

                {/* Reference Pill */}
                <div className="success-ref-pill">
                  {lang === 'ar' ? (
                    <>
                      <strong>{orderReference || 'CRY-284473'}</strong>
                      <span>: {t.success.orderRef.replace(':', '').trim()}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.success.orderRef}</span>
                      <strong>{orderReference || 'CRY-284473'}</strong>
                    </>
                  )}
                </div>

                {/* Subtext Paragraphs */}
                <div className="success-subtext-group">
                  <p className="success-received-msg">{t.success.received}</p>
                  <p className="success-notice-msg">{t.success.contactNotice}</p>
                </div>

                {/* Summary Beige Box */}
                <div className="success-recap-box">
                  <div className="recap-row">
                    <span className="recap-label">{t.success.productLabel}</span>
                    <strong className="recap-value">{t.success.productValue}</strong>
                  </div>
                  <div className="recap-row">
                    <span className="recap-label">{t.success.recipientLabel}</span>
                    <strong className="recap-value">
                      {confirmedOrderDetails.fullName} {confirmedOrderDetails.city ? `(${confirmedOrderDetails.city})` : ''}
                    </strong>
                  </div>
                </div>

                {/* Action Button: ONLY 'تقديم طلب جديد' / 'Passer une nouvelle commande' (NO WhatsApp button!) */}
                <div className="success-actions-row">
                  <button
                    type="button"
                    className="success-new-order-btn"
                    onClick={handleResetOrder}
                  >
                    {t.success.newOrderBtn}
                  </button>
                </div>
              </div>
            ) : (
              <div className="routine-banner-grid">
                {/* Left Column: Headline, Description & Order Form */}
                <div className="routine-form-column">
                  <h2 className="routine-main-heading">
                    {t.order.headingPart1}<br />
                    <span className="purple-serif-italic">{t.order.headingHighlight}</span>
                  </h2>
                  <p className="routine-sub-text">
                    {t.order.subtext}
                  </p>

                  {/* Formulaire de commande */}
                  <form className="crystal-order-form" onSubmit={handleSubmitOrder}>
                    <div className="form-promo-badge">
                      <Sparkles size={16} />
                      <span>{t.order.promoBadge} <span className="badge-old-price">{t.order.oldPrice}</span> &bull; {t.order.freeDelivery}</span>
                    </div>

                    {/* Customer Information Inputs */}
                    <div className="form-inputs-group">
                      <label className="form-field-label">{t.order.formLabel}</label>
                      <div className="form-row-2col">
                        <div className="form-group">
                          <label htmlFor="fullname">{t.order.fullNameLabel}</label>
                          <input
                            type="text"
                            id="fullname"
                            required
                            placeholder={t.order.fullNamePlaceholder}
                            value={formData.fullName}
                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone">{t.order.phoneLabel}</label>
                          <input
                            type="tel"
                            id="phone"
                            required
                            placeholder={t.order.phonePlaceholder}
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-row-2col">
                        <div className="form-group">
                          <label htmlFor="address">{t.order.addressLabel}</label>
                          <input
                            type="text"
                            id="address"
                            required
                            placeholder={t.order.addressPlaceholder}
                            value={formData.address}
                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="city">{t.order.cityLabel}</label>
                          <input
                            type="text"
                            id="city"
                            required
                            placeholder={t.order.cityPlaceholder}
                            value={formData.city}
                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment Callout */}
                    <div className="cod-payment-badge">
                      <div className="cod-icon-circle">✓</div>
                      <div className="cod-text-block">
                        <strong>{t.order.codTitle}</strong>
                        <span>{t.order.codDesc}</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="form-submit-cta-btn"
                      disabled={isSubmitting}
                    >
                      <span>
                        {isSubmitting
                          ? t.order.submittingBtn
                          : t.order.submitBtn}
                      </span>
                      <ArrowRight size={18} />
                    </button>

                    {orderError && (
                      <div className="order-error-box" role="alert">
                        <p>{t.order.errorMsg}</p>
                        <a
                          className="order-whatsapp-btn"
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                            lang === 'ar'
                              ? `سلام، بغيت نطلب ${PRODUCT_NAME} — ${PACK_TITLE.ar} — ${formatDh(PRICE_DH, 'ar')}${formData.fullName ? ` — الاسم: ${formData.fullName}` : ''}${formData.city ? ` — المدينة: ${formData.city}` : ''}`
                              : `Bonjour, je veux commander ${PRODUCT_NAME} — ${PACK_TITLE.fr} — ${formatDh(PRICE_DH, 'fr')}${formData.fullName ? ` — Nom : ${formData.fullName}` : ''}${formData.city ? ` — Ville : ${formData.city}` : ''}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.62-.93-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.58-.35zM12.05 21.79h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.85 9.85 0 01-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 019.88 9.89c0 5.45-4.43 9.88-9.89 9.88zm8.42-18.3A11.82 11.82 0 0012.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.68 1.45c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.47-8.4z" />
                          </svg>
                          <span>{t.order.whatsappBtn}</span>
                        </a>
                      </div>
                    )}

                    {/* Guarantees row */}
                    <div className="form-guarantees-row">
                      <div className="guarantee-item">
                        <Truck size={15} />
                        <span>{t.order.guarantees[0]}</span>
                      </div>
                      <div className="guarantee-item">
                        <ShieldCheck size={15} />
                        <span>{t.order.guarantees[1]}</span>
                      </div>
                      <div className="guarantee-item">
                        <Leaf size={15} />
                        <span>{t.order.guarantees[2]}</span>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Right Column: Visual Product Showcase */}
                <div className="routine-visual-column">
                  <div className="routine-image-frame">
                    <img
                      src="/crystal-mauve/routine-trio-hd.webp"
                      alt="Votre routine capillaire complète au naturel"
                      className="routine-product-img"
                    />
                    <div className="routine-img-caption-badge">
                      {t.order.productBadge}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. CLEAN LUXURY WHITE FOOTER
          ========================================================================= */}
      <footer id="a-propos" className="clean-luxury-footer">
        <div className="page-container">
          <div className="footer-top-row">
            {/* Left Brand Logo */}
            <div className="footer-brand-logo">
              <a href="#hero" className="brand-logo-link" onClick={(e) => scrollToSection('hero', e)}>
                <img src="/crystal-mauve/brand-logo.avif" alt="Vitasilk Professional" className="okinso-brand-logo" />
              </a>
            </div>

            {/* Center Nav Links */}
            <nav className="footer-nav-center">
              <a href="#hero" onClick={(e) => scrollToSection('hero', e)}>{t.nav.home}</a>
              <a href="#produits-details" onClick={(e) => scrollToSection('produits-details', e)}>{t.nav.products}</a>
              <a href="#resultats" onClick={(e) => scrollToSection('resultats', e)}>{t.results.tag}</a>
              <a href="#comment-utiliser" onClick={(e) => scrollToSection('comment-utiliser', e)}>{t.howToUse.title}</a>
              <a href="#resultats" className={`nav-link-item ${activeNav === 'resultats' ? 'active' : ''}`} onClick={(e) => scrollToSection('resultats', e)}>
                {t.results.tag}
                {activeNav === 'resultats' && <span className="nav-active-bar" />}
              </a>
              <a href="#comment-utiliser" className={`nav-link-item ${activeNav === 'comment-utiliser' ? 'active' : ''}`} onClick={(e) => scrollToSection('comment-utiliser', e)}>
                {t.howToUse.title}
                {activeNav === 'comment-utiliser' && <span className="nav-active-bar" />}
              </a>
            </nav>
          </div>

          <div className="footer-bottom-copyright">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>

      {/* Fixed Bottom Commander Bar */}
      <div className="fixed-bottom-bar">
        <div className="fixed-bottom-inner">
          <div className="fixed-pack-meta">
            <span className="fixed-pack-title">
              {lang === 'fr' ? 'Pack Trio Royal Complet' : 'باقة التريو الملكي المتكامل'}
            </span>
            <div className="fixed-pricing">
              <span className="fixed-price-current">{formatDh(PRICE_DH, lang)}</span>
              <span className="fixed-price-original">{formatDh(OLD_PRICE_DH, lang)}</span>
              <span className="fixed-delivery-badge">
                {lang === 'fr' ? 'Livraison Gratuite' : 'توصيل مجاني'}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="fixed-bottom-cta-btn"
            onClick={() => scrollToSection('commander')}
          >
            <Sparkles size={16} />
            <span>{t.order.fixedCta}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* =========================================================================
          10. SHOPPING CART DRAWER
          ========================================================================= */}
      {isCartOpen && (
        <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="drawer-panel" onClick={e => e.stopPropagation()}>
            <div className="drawer-top-header">
              <div className="drawer-title-group">
                <ShoppingBag size={20} />
                <h3>{t.cart.title} ({cartCount})</h3>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setIsCartOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="free-shipping-indicator">
              <div className="shipping-bar-track">
                <div className="shipping-bar-filled" style={{ width: '100%' }} />
              </div>
              <span>{t.cart.freeShippingSuccess}<strong>{t.cart.freeShippingBold}</strong></span>
            </div>

            <div className="drawer-items-scroll">
              {cartCount === 0 ? (
                <div className="empty-cart-state">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p>{t.cart.emptyText}</p>
                  <button
                    type="button"
                    className="btn-browse-pack"
                    onClick={() => {
                      setIsCartOpen(false)
                      scrollToSection('commander')
                    }}
                  >
                    {t.cart.browseBtn}
                  </button>
                </div>
              ) : (
                <div className="cart-row-item">
                  <img src="/crystal-mauve/routine-trio-hd.webp" alt="Pack Trio Crystal" className="cart-product-thumbnail" />
                  <div className="cart-product-details">
                    <h4>{t.cart.productTitle}</h4>
                    <span className="cart-product-subtitle">{t.cart.productSub}</span>
                    <div className="cart-product-pricing">
                      <strong>{(PRICE_DH * cartCount)} {lang === 'fr' ? 'DH' : 'درهم'}</strong>
                      <span className="cart-old-price">{(OLD_PRICE_DH * cartCount)} {lang === 'fr' ? 'DH' : 'درهم'}</span>
                    </div>

                    <div className="cart-qty-and-remove">
                      <div className="cart-qty-pill">
                        <button
                          type="button"
                          onClick={() => setCartCount(c => Math.max(0, c - 1))}
                        >
                          <Minus size={12} />
                        </button>
                        <span>{cartCount}</span>
                        <button
                          type="button"
                          onClick={() => setCartCount(c => c + 1)}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-delete-link"
                        onClick={() => setCartCount(0)}
                      >
                        {t.cart.delete}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {cartCount > 0 && (
              <div className="drawer-bottom-footer">
                <div className="cart-subtotal-row">
                  <span>{t.cart.subtotal}</span>
                  <span>{(PRICE_DH * cartCount)} {lang === 'fr' ? 'DH' : 'درهم'}</span>
                </div>
                <div className="cart-subtotal-row free-delivery-row">
                  <span>{t.cart.deliveryRow}</span>
                  <span className="free-badge">{t.cart.freeBadge}</span>
                </div>
                <div className="cart-total-highlight">
                  <span>{t.cart.total}</span>
                  <strong>{(PRICE_DH * cartCount)} {lang === 'fr' ? 'DH' : 'درهم'}</strong>
                </div>

                <button
                  type="button"
                  className="btn-checkout-now"
                  onClick={() => {
                    setIsCartOpen(false)
                    scrollToSection('commander')
                  }}
                >
                  <span>{t.cart.checkoutBtn}{(PRICE_DH * cartCount)} {lang === 'fr' ? 'DH' : 'درهم'}</span>
                  <ArrowRight size={18} />
                </button>

                <div className="payment-security-notice">
                  <span>{t.cart.security}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
