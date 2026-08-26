"use client";

import { useLang } from "../lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center rounded-full border-gold-hairline bg-charcoal/80 p-0.5 text-xs backdrop-blur">
      {(["ar", "fr"] as const).map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-4 py-2 font-medium transition-colors ${
            lang === code ? "bg-gold text-ink" : "text-cream-dim hover:text-cream"
          }`}
        >
          {code === "ar" ? "العربية" : "Français"}
        </button>
      ))}
    </div>
  );
}
