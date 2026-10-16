"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Translations } from "./translations";
import type { Lang } from "./config";

type LanguageContextValue = {
  language: Lang;
  setLanguage: (lang: Lang) => void;
  toggleLanguage: () => void;
  t: Translations;
  isArabic: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "crystal_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always render French on the server and first client pass, then restore the
  // saved choice — reading localStorage in the initializer would cause a
  // hydration mismatch for returning Arabic visitors.
  const [language, setLanguageState] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "ar" || saved === "fr") setLanguageState(saved);
    } catch {
      // ignore storage errors
    }
  }, []);

  const setLanguage = (lang: Lang) => {
    if (lang !== "fr" && lang !== "ar") return;
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore storage errors
    }
  };

  const toggleLanguage = () => setLanguage(language === "fr" ? "ar" : "fr");

  useEffect(() => {
    const html = document.documentElement;
    html.lang = language;
    html.classList.toggle("lang-ar", language === "ar");
    document.body.classList.toggle("lang-ar", language === "ar");
  }, [language]);

  // The root layout is shared with the rest of the site: undo our changes to
  // <html>/<body> when the visitor navigates away from this page.
  useEffect(() => {
    return () => {
      document.documentElement.removeAttribute("lang");
      document.documentElement.classList.remove("lang-ar");
      document.body.classList.remove("lang-ar");
    };
  }, []);

  const t = (translations[language] || translations.fr) as Translations;
  const isArabic = language === "ar";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, isArabic }}>
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
