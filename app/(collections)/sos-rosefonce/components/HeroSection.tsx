"use client";

import { ArrowLeft, ArrowRight, Sparkles, Star, Leaf, Droplets, ShieldCheck, Truck, BadgeCheck } from 'lucide-react';
import heroScene from '../assets/hero-pink-spa.webp';
import mobileScene from '../assets/hero-pink-spa-mobile.webp';
import { useLanguage } from '../lib/LanguageContext';

export default function HeroSection({ onOpenOrder }: { onOpenOrder: () => void }) {
  const { t, isRtl } = useLanguage();
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const benefits = [
    { Icon: Leaf, title: t.hero.repairTitle, description: t.hero.repairSub },
    { Icon: Droplets, title: t.hero.hydrateTitle, description: t.hero.hydrateSub },
    { Icon: ShieldCheck, title: t.hero.protectTitle, description: t.hero.protectSub },
  ];

  return (
    <section id="hero" className="spa-hero" aria-labelledby="hero-title">
      <div className="spa-hero-scene">
        <picture><source media="(max-width: 1100px)" srcSet={mobileScene.src} /><img src={heroScene.src} alt={isRtl ? 'فيتابليكس SOS للعناية بالشعر في أجواء وردية' : 'Soin capillaire VitaPlex SOS dans un décor rose fleuri'} fetchPriority="high" /></picture>
        <div className="spa-hero-rating">
          <Star size={18} fill="currentColor" aria-hidden="true" />
          <div><b dir="ltr">{t.hero.badges.reviews}</b><span>{t.hero.badges.reviewsCount}</span></div>
        </div>
      </div>

      <div className="spa-hero-content" dir={isRtl ? 'rtl' : 'ltr'}>
        <span className="spa-hero-brand"><Sparkles size={14} aria-hidden="true" />{t.hero.brand}</span>
        <h1 id="hero-title">{t.hero.mainTitle}</h1>
        <h2>{t.hero.subTitle}</h2>
        <p className="spa-hero-description">
          {isRtl ? 'عناية وترميم فوري للشعر المتضرر والتالف.' : 'Une réparation intense pour les cheveux abîmés.'}
          <br />{t.hero.tagline}
        </p>
        <button id="hero-commander-btn" className="spa-hero-order" onClick={onOpenOrder}>
          <span>{isRtl ? t.hero.orderNow : 'Commander · Paiement à la livraison'}</span><Arrow size={21} aria-hidden="true" />
        </button>
        <div className="spa-hero-benefits">
          {benefits.map(({ Icon, title, description }) => (
            <div className="spa-hero-benefit" key={title}>
              <div className="spa-hero-icon"><Icon size={25} strokeWidth={1.6} aria-hidden="true" /></div>
              <h3>{title}</h3><p>{description}</p>
            </div>
          ))}
        </div>
        <div className="spa-hero-trust">
          <span><Truck size={16} aria-hidden="true" />{isRtl ? 'توصيل سريع' : 'Livraison rapide'}</span>
          <span><ShieldCheck size={16} aria-hidden="true" />{isRtl ? 'الدفع عند الاستلام' : 'Paiement à la livraison'}</span>
          <span><BadgeCheck size={16} aria-hidden="true" />{isRtl ? 'منتج أصلي' : 'Produit original'}</span>
        </div>
      </div>
    </section>
  );
}
