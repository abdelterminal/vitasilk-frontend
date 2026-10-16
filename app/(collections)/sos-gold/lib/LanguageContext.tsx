"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Translations } from "./translations";
import type { Lang } from "./config";

type LanguageContextValue = {
  lang: Lang;
  setLanguage: (lang: Lang) => void;
  toggleLanguage: () => void;
  t: Translations;
  isRtl: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "sos-gold_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default is French. The saved choice is read after mount rather than in the
  // initializer: the server has no localStorage, and reading it during render
  // would make the first client render disagree with the server HTML.
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "ar") setLang("ar");
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
    const html = document.documentElement;
    html.setAttribute("lang", lang);
    // The source keeps the layout LTR in Arabic and only switches typography
    // (via body.lang-ar); individual blocks set dir="rtl" themselves.
    html.setAttribute("dir", "ltr");
    document.body.classList.toggle("lang-ar", lang === "ar");
  }, [lang]);

  // Undo the document-level changes when leaving the page.
  useEffect(() => {
    const html = document.documentElement;
    return () => {
      html.removeAttribute("lang");
      html.removeAttribute("dir");
      document.body.classList.remove("lang-ar");
    };
  }, []);

  const value: LanguageContextValue = {
    lang,
    setLanguage: (next) => {
      if (next === "fr" || next === "ar") setLang(next);
    },
    toggleLanguage: () => setLang((prev) => (prev === "fr" ? "ar" : "fr")),
    t: (translations[lang] ?? translations.fr) as Translations,
    isRtl: lang === "ar",
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
