import type { Metadata } from "next";
import "./sos-gold.css";

export const metadata: Metadata = {
  title: "Vitasilk Professional | Soin Capillaire by VitaPlex",
  description:
    "Découvrez le Soin Capillaire by VitaPlex par Vitasilk Professional. Le secret d'une chevelure saine, brillante et visiblement réparée. Formule sans sulfate et sans parabène.",
  icons: {
    icon: "/sos-gold/favicon.png",
    apple: "/sos-gold/favicon.png",
  },
};

// Same Google Fonts request as the source index.html. Loaded as a stylesheet
// (React hoists it into <head>) rather than via next/font, because the CSS
// references the families by their literal names ('Playfair Display', 'Cairo'…).
const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Alex+Brush&family=Dancing+Script:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Cairo:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800&display=swap";

export default function SosGoldLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={FONTS_HREF} precedence="default" />
      {children}
    </>
  );
}
