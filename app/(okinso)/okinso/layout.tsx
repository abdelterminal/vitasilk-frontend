import type { Metadata } from "next";

// Same order as the Vite source: index.css first, then App.css, then each
// component's stylesheet in the order App.jsx imported the components.
import "./styles/index.css";
import "./styles/Navbar.css";
import "./styles/Hero.css";
import "./styles/ProductPresenter.css";
import "./styles/WhyChooseUs.css";
import "./styles/PowerfulIngredients.css";
import "./styles/ProductSteps.css";
import "./styles/OrderForm.css";
import "./styles/TransformedHair.css";
import "./styles/OrderModal.css";
import "./styles/App.css";
import "./styles/order-error.css";

export const metadata: Metadata = {
  title: "Okinso® Cosmetics | Le rituel complet pour des cheveux sublimes",
  description:
    "Okinso® Cosmetics Protein Collagen - Gamme professionnelle de soins capillaires enrichie en collagène et en protéines. Des cheveux plus forts, plus lisses, plus beaux.",
  icons: {
    icon: [
      { url: "/okinso/vitasilk-icon.png", type: "image/png" },
      { url: "/okinso/favicon.ico" },
    ],
    apple: "/okinso/vitasilk-icon.png",
  },
};

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Tajawal:wght@400;500;700;800;900&display=swap";

export default function OkinsoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Same Google Fonts sheet index.html loaded; React 19 hoists it into <head>.
          The CSS names these families literally, so next/font's hashed names won't do. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={FONTS_HREF} precedence="default" />
      {children}
    </>
  );
}
