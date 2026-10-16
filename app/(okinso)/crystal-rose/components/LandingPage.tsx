"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Benefits from "./Benefits";
import ProductSection from "./ProductSection";
import Routine from "./Routine";
import OrderForm from "./OrderForm";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";
import StickyMobileCTA from "./StickyMobileCTA";
import { DEFAULT_OFFER, type OfferId } from "../lib/config";

export function LandingPage() {
  const [selectedRoutine, setSelectedRoutine] = useState<OfferId>(DEFAULT_OFFER);

  const handleProductSelect = () => {
    setSelectedRoutine(DEFAULT_OFFER);
  };

  return (
    <div className="landing-page-wrapper">
      {/* Sticky Luxury Navbar */}
      <Navbar />

      <main>
        {/* 1. Hero Section */}
        <Hero />

        {/* 3. Benefits / Les Bienfaits */}
        <Benefits />

        {/* 4. Products / Une routine complète */}
        <ProductSection onSelectProduct={handleProductSelect} />

        {/* 5. 3-Step Routine */}
        <Routine />

        {/* 9. Order Form / Commande Rapide */}
        <OrderForm selectedRoutine={selectedRoutine} />

        {/* 10. Final CTA Banner */}
        <FinalCTA />
      </main>

      {/* 12. Luxury Footer */}
      <Footer />

      {/* 13. Sticky Mobile Order Bar */}
      <StickyMobileCTA />
    </div>
  );
}
