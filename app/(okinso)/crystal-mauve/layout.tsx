import type { Metadata } from "next";
import "./styles/index.css";
import "./styles/App.css";

export const metadata: Metadata = {
  title: "Vitasilk Professional • Soin Complet Cheveux",
  description:
    "Le pack Organic Hair Care de Crystal par Vitasilk Professional - Des cheveux plus forts, plus doux et plus brillants.",
  icons: {
    icon: [{ url: "/crystal-mauve/vitasilk-icon.png", type: "image/png" }],
    apple: "/crystal-mauve/vitasilk-touch-icon.png",
  },
};

export default function CrystalMauveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
