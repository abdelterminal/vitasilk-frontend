import type { Metadata } from "next";
import "./sos-rosefonce.css";
import "./components/HeroSection.css";

export const metadata: Metadata = {
  title: "VitaPlex SOS Soin Capillaire | Vitasilk Professional",
  description:
    "Découvrez le Soin Capillaire SOS VitaPlex par Vitasilk Professional. Réparation intense, hydratation profonde et protection pour cheveux abîmés. Format généreux 600g sans sulfate.",
  icons: {
    icon: { url: "/sos-rosefonce/favicon.png", type: "image/png" },
    apple: "/sos-rosefonce/favicon.png",
  },
};

// Same Google Fonts request as the original index.html. Rendered as a <link>
// (React hoists it into <head>) rather than a CSS @import, which Next drops
// when it concatenates this page's stylesheets.
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Alex+Brush&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Cairo:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap";

export default function SosRoseFonceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={FONTS_URL} precedence="default" />
      {children}
    </>
  );
}
