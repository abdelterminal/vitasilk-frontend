"use client";

import { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import FormulePuissante from './FormulePuissante';
import ActifsSelectionnes from './ActifsSelectionnes';
import PourquoiChoisir from './PourquoiChoisir';
import CheveuxSublimes from './CheveuxSublimes';
import FormulaireCommande from './FormulaireCommande';
import CtaRedonnerVie from './CtaRedonnerVie';
import Footer from './Footer';
import OrderModal from './OrderModal';
import { ShoppingCart } from 'lucide-react';
import { LanguageProvider, useLanguage } from '../lib/LanguageContext';
import { PRICE_DH, formatDh } from '../lib/config';

function MainApp() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { t, lang } = useLanguage();

  const handleOpenOrder = () => {
    const orderSection = document.getElementById('commander');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsOrderModalOpen(true);
    }
  };

  const handleCloseOrder = () => {
    setIsOrderModalOpen(false);
  };

  const priceText = formatDh(PRICE_DH, lang);

  return (
    <div className={`app-root ${lang === 'ar' ? 'app-lang-ar' : ''}`}>
      {/* Navigation */}
      <Navbar onOpenOrder={handleOpenOrder} />

      {/* Main Landing Page Journey */}
      <main>
        {/* Section 1: Hero */}
        <Hero onOpenOrder={handleOpenOrder} />

        {/* Section 2: Formule Puissante */}
        <FormulePuissante />

        {/* Section 3: Actifs Soigneusement Sélectionnés */}
        <ActifsSelectionnes />

        {/* Section 4: Pourquoi Choisir Notre Soin Capillaire */}
        <PourquoiChoisir />

        {/* Section 5: Des Cheveux Plus Forts, Plus Doux, Plus Brillants */}
        <CheveuxSublimes />

        {/* Section 6: Formulaire de Commande Direct */}
        <FormulaireCommande />

        {/* Section 7: Prête à redonner vie à vos cheveux ? (CTA Banner) */}
        <CtaRedonnerVie onOpenOrder={handleOpenOrder} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrder}
      />

      {/* Floating Quick Order Action on Mobile */}
      <div className="mobile-floating-bar">
        <div className="floating-bar-info">
          <span className="bar-price">{priceText}</span>
          <span className="bar-badge">{t.floatingBar.specialOffer} {priceText}</span>
        </div>
        <button onClick={handleOpenOrder} className="floating-order-btn">
          <ShoppingCart size={16} />
          <span>{t.floatingBar.btn}</span>
        </button>
      </div>
    </div>
  );
}

export default function SosGoldApp() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
