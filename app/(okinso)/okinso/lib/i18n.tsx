"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Translations } from "./translations";
import type { Lang } from "./config";

type LanguageContextValue = {
  language: Lang;
  setLanguage: (lang: Lang) => void;
  toggleLanguage: () => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "vitasilk_language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Starts as "fr" on both server and client, then picks up the saved choice
  // after hydration — reading localStorage in the initializer (as the Vite
  // source did) would mismatch the server-rendered HTML.
  const [language, setLanguageState] = useState<Lang>("fr");

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "ar") setLanguageState("ar");
    } catch {
      /* storage blocked: stay on French */
    }
  }, []);

  const setLanguage = (lang: Lang) => {
    if (lang !== "ar" && lang !== "fr") return;
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      console.error("Failed to save language preference:", err);
    }
  };

  const toggleLanguage = () => setLanguage(language === "fr" ? "ar" : "fr");

  // index.html shipped <html lang="fr">; the source then toggled lang and a
  // `lang-ar` class on <html>. Layout stays LTR on purpose (see index.css).
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("lang-ar", language === "ar");
    root.setAttribute("lang", language);
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.product = "okinso";
    return () => {
      root.classList.remove("lang-ar");
      root.removeAttribute("lang");
      delete root.dataset.product;
    };
  }, []);

  const t = (translations[language] || translations.fr) as Translations;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
