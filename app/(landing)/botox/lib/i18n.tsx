"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { fr, type Dict } from "../dictionaries/fr";
import { ar } from "../dictionaries/ar";

export type Lang = "ar" | "fr";

const dictionaries: Record<Lang, Dict> = { ar, fr };

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
  dir: "rtl" | "ltr";
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = window.localStorage.getItem("vitasilk-lang");
    if (saved !== "fr" && saved !== "ar") return;
    const frame = window.requestAnimationFrame(() => setLangState(saved));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const dir: "rtl" | "ltr" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem("vitasilk-lang", next);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: dictionaries[lang], dir }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
