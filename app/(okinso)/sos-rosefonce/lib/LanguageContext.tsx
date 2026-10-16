"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./translations";
import type { Lang } from "./config";

type LanguageValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  isRtl: boolean;
  t: (typeof translations)["fr"];
};

const LanguageContext = createContext<LanguageValue | null>(null);

const STORAGE_KEY = "vitaplex_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Starts on "fr" (the server render) and picks up the saved choice after
  // hydration — reading localStorage in the initializer would mismatch SSR.
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe restore of the saved language
      if (saved === "fr" || saved === "ar") setLangState(saved);
    } catch {}
  }, []);

  const isRtl = lang === "ar";

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {}
  };

  const toggleLang = () => setLang(lang === "fr" ? "ar" : "fr");

  useEffect(() => {
    // Keep the layout stable; Arabic text direction is handled separately in CSS.
    const root = document.documentElement;
    const prev = { dir: root.dir, lang: root.lang };
    root.dir = "ltr";
    root.lang = lang;
    return () => {
      root.dir = prev.dir;
      root.lang = prev.lang;
    };
  }, [lang]);

  const t = translations[lang] || translations.fr;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isRtl, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
