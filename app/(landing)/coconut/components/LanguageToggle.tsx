"use client";

import { useLang } from "../lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center rounded-full border-gold-hairline bg-cream/80 p-0.5 text-xs backdrop-blur">
      {(["ar", "fr"] as const).map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-4 py-2 font-medium transition-colors ${
            // palm-deep, not gold: this label is 12px, and cream-on-gold-deep
            // only reaches 3.8:1
            lang === code ? "bg-palm-deep text-cream" : "text-husk hover:text-bark"
          }`}
        >
          {code === "ar" ? "العربية" : "Français"}
        </button>
      ))}
    </div>
  );
}
