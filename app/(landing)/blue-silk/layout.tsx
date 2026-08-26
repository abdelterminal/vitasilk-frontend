"use client";

import { useEffect } from "react";
import { LangProvider } from "./lib/i18n";

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    document.documentElement.dataset.product = "blue-silk";
    return () => {
      delete document.documentElement.dataset.product;
    };
  }, []);

  return <LangProvider>{children}</LangProvider>;
}