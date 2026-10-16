import type { Metadata } from "next";
import "./styles/index.css";
import "./styles/App.css";
import "./styles/VisibleResultsSection.css";
import "./styles/IngredientsSection.css";
import "./styles/NaturalBeautySection.css";
import "./styles/UsageStepsSection.css";
import "./styles/OrderFormSection.css";
import "./styles/Footer.css";

export const metadata: Metadata = {
  title: "SOS Hair Therapy — Rituel Capillaire d'Exception",
  description:
    "Découvrez SOS Hair Therapy - Le soin capillaire 10 en 1 enrichi en +20 vitamines et actifs naturels pour des cheveux plus forts, plus beaux, naturellement.",
  icons: {
    icon: [
      { url: "/sos-therapy/logo.avif", type: "image/avif" },
      { url: "/sos-therapy/favicon-v.png", type: "image/png" },
    ],
    apple: "/sos-therapy/favicon-v.png",
  },
};

// Same families and weights the source index.html loaded. React hoists the
// stylesheet <link> into <head>.
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800&family=Marhey:wght@400;600;700&family=Aref+Ruqaa:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Alex+Brush&family=Caveat:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap";

export default function SosTherapyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={FONTS_URL} precedence="default" />
      {children}
    </>
  );
}
