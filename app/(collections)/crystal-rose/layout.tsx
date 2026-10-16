import type { Metadata } from "next";
import "./styles/fonts.css";
import "./styles/index.css";
import "./styles/App.css";
import { LanguageProvider } from "./lib/i18n";

export const metadata: Metadata = {
  title: "Vitasilk Professional — Soin Capillaire Bio Kératine & Protéine",
  description:
    "Découvrez Vitasilk Professional : La puissance de la kératine et des protéines organiques pour une chevelure nourrie, réparée et durablement sublimée. Shampooing, masque et sérum professionnels.",
  icons: {
    icon: "/crystal-rose/favicon.png",
    shortcut: "/crystal-rose/favicon.png",
    apple: "/crystal-rose/apple-touch-icon.png",
  },
  openGraph: {
    title: "Vitasilk Professional — Soin Capillaire Bio Kératine & Protéine",
    description:
      "La puissance de la kératine pour une chevelure nourrie, réparée et durablement sublimée. Découvrez notre routine 3 étapes.",
    type: "website",
  },
};

export default function CrystalRoseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
