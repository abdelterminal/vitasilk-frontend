"use client";

import { ArrowRight } from "lucide-react";
import { useLanguage } from "../lib/i18n";

export default function StickyMobileCTA() {
  const { t, isArabic } = useLanguage();

  const scrollToCommander = () => {
    const el = document.getElementById("commander");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sticky-mobile-bar">
      <div className="sticky-mobile-content">
        <button type="button" onClick={scrollToCommander} className="btn-luxury btn-sticky-mobile">
          <span>{t.nav.order}</span>
          <ArrowRight size={18} style={isArabic ? { transform: "scaleX(-1)" } : undefined} />
        </button>
      </div>
    </div>
  );
}
