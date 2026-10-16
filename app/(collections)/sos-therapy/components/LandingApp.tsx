"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import VisibleResultsSection from "./VisibleResultsSection";
import IngredientsSection from "./IngredientsSection";
import NaturalBeautySection from "./NaturalBeautySection";
import UsageStepsSection from "./UsageStepsSection";
import OrderFormSection from "./OrderFormSection";
import Footer from "./Footer";
import { translations } from "../lib/translations";
import type { Lang } from "../lib/config";

// Port of the source App.jsx. Its quick-order modal only opened when
// #commander was missing from the page, which never happens (the order
// section is always rendered), and it submitted nowhere — so it is omitted.
export default function LandingApp() {
  const [lang, setLang] = useState<Lang>("fr");

  const t = translations[lang] || translations.fr;

  useEffect(() => {
    const html = document.documentElement;
    const previous = html.lang;
    html.lang = lang;
    return () => {
      html.lang = previous;
    };
  }, [lang]);

  const handleOpenOrder = () => {
    document.getElementById("commander")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="sos-therapy-root">
      <div className={`landing-page ${lang === "ar" ? "lang-ar" : "lang-fr"}`}>
        {/* Navigation Header placed directly on top of the hero */}
        <Navbar onOrderClick={handleOpenOrder} lang={lang} setLang={setLang} t={t} />

        <main>
          <HeroSection onOrderClick={handleOpenOrder} t={t} lang={lang} />
          <VisibleResultsSection t={t} />
          <IngredientsSection onOrderClick={handleOpenOrder} t={t} />
          <NaturalBeautySection t={t} lang={lang} />
          <UsageStepsSection t={t} />
          <OrderFormSection t={t} lang={lang} />
        </main>

        <Footer t={t} />

        <div className="fixed-order-bar">
          <button type="button" className="fixed-order-btn" onClick={handleOpenOrder}>
            {t.nav.orderBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
