"use client";

import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { LanguageProvider, useLanguage } from '../lib/i18n';
import { OLD_PRICE_DH, PRICE_DH } from '../lib/config';
import Navbar from './Navbar';
import Hero from './Hero';
import ProductPresenter from './ProductPresenter';
import WhyChooseUs from './WhyChooseUs';
import PowerfulIngredients from './PowerfulIngredients';
import ProductSteps from './ProductSteps';
import OrderForm from './OrderForm';
import TransformedHair from './TransformedHair';
import OrderModal from './OrderModal';

function MainContent() {
  const { t } = useLanguage();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when scrolled past 350px
      setShowStickyBar(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenOrder = () => {
    const formSection = document.getElementById('formulaire-commande');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsOrderModalOpen(true);
    }
  };

  const handleCloseOrder = () => {
    setIsOrderModalOpen(false);
  };

  const handleDiscoverClick = () => {
    const section = document.getElementById('presentation-produit') || document.getElementById('ingredients');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDiscoverSteps = () => {
    const section = document.getElementById('puissants-ingredients') || document.getElementById('ingredients');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="vitasilk-app">
      {/* Navbar sitting over hero background */}
      <Navbar onOpenOrder={handleOpenOrder} />

      {/* Hero Section */}
      <Hero 
        onOpenOrder={handleOpenOrder} 
        onDiscoverClick={handleDiscoverClick} 
      />

      {/* Second Section: Girl Presenter / Expert Showcase */}
      <ProductPresenter 
        onOpenOrder={handleOpenOrder} 
        onDiscoverSteps={handleDiscoverSteps}
      />

      {/* Third Section: Pourquoi Choisir Vitasilk? */}
      <WhyChooseUs />

      {/* 4-Step Treatment Ritual Section */}
      <ProductSteps />

      {/* Formulaire de Commande (Moroccan COD Order Form) */}
      <OrderForm id="formulaire-commande" />

      {/* Ingredients banner above the bottom bar on all screen sizes */}
      <PowerfulIngredients />

      {/* Bottom Dark CTA Bar */}
      <TransformedHair onOrderClick={handleOpenOrder} />

      {/* Interactive Quick Order Modal */}
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={handleCloseOrder} 
      />

      {/* Sticky Mobile Bottom Order Bar (High-Converting on Phone) */}
      <div className={`mobile-sticky-bottom-bar ${showStickyBar ? 'visible' : ''}`}>
        <div className="sticky-bar-content">
          <div className="sticky-bar-info">
            <span className="sticky-pack-name">{t.sticky.packName}</span>
            <div className="sticky-price-row">
              <span className="sticky-old-price">{OLD_PRICE_DH} {t.orderForm.currency}</span>
              <span className="sticky-price">{PRICE_DH} {t.orderForm.currency}</span>
              <span className="sticky-tag">{t.sticky.freeShipping}</span>
            </div>
          </div>
          <button 
            className="sticky-order-btn"
            onClick={handleOpenOrder}
            id="mobile-sticky-order-cta"
          >
            <ShoppingBag size={17} />
            <span>{t.sticky.orderBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProteinCollagenApp() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
