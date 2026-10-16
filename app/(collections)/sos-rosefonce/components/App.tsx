"use client";

import { useState } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import WhyChooseSection from './WhyChooseSection';
import IngredientsSection from './IngredientsSection';
import ResultsSection from './ResultsSection';
import ProductDetailsSection from './ProductDetailsSection';
import HowToUse from './HowToUse';
import OrderFormSection from './OrderFormSection';
import BrandFooter from './BrandFooter';
import OrderDrawer from './OrderDrawer';
import StickyBottomCTA from './StickyBottomCTA';
import { LanguageProvider } from '../lib/LanguageContext';

function AppContent() {
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const handleOpenOrder = () => {
    setIsOrderOpen(true);
  };

  const handleCloseOrder = () => {
    setIsOrderOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation with Vitasilk Professional logo and Commander button */}
      <Navbar onOpenOrder={handleOpenOrder} />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {/* 1. Hero Section */}
        <HeroSection onOpenOrder={handleOpenOrder} />

        {/* 2. Pourquoi choisir VitaPlex ? */}
        <WhyChooseSection />

        {/* 3. Une formule enrichie d'ingrédients bienfaisants */}
        <IngredientsSection />

        {/* 4. Des cheveux visiblement plus forts et plus brillants */}
        <ResultsSection />

        {/* 5. La puissance du soin dans chaque détail */}
        <ProductDetailsSection onOpenOrder={handleOpenOrder} />

        {/* 6. Routine Mode d'Emploi */}
        <HowToUse />

        {/* 7. Commandez maintenant Formulaire Section */}
        <OrderFormSection />
      </main>

      {/* Brand Footer with Queen Logo and Social Icons */}
      <BrandFooter />

      {/* Slide-out Order Drawer / Modal */}
      <OrderDrawer isOpen={isOrderOpen} onClose={handleCloseOrder} />

      {/* Mobile Sticky Order Bar */}
      <StickyBottomCTA onOpenOrder={handleOpenOrder} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
