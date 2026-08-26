import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vitasilk Coconut Smooth — Coco & amande douce 1L | زيت جوز الهند واللوز",
  description: "Vitasilk Coconut Smooth — huile de coco et amande douce, 1L. Livraison COD au Maroc.",
};

import { AnnouncementBar } from "./components/AnnouncementBar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { ProblemPromise } from "./components/ProblemPromise";
import { SafetyBanner } from "./components/SafetyBanner";
import { Ingredients } from "./components/Ingredients";
import { Benefits } from "./components/Benefits";
import { BrandStory } from "./components/BrandStory";
import { BeforeAfter } from "./components/BeforeAfter";
import { HowToUse } from "./components/HowToUse";
import { Testimonials } from "./components/Testimonials";
import { Offer } from "./components/Offer";
import { OrderForm } from "./components/OrderForm";
import { Footer } from "./components/Footer";
import { StickyCta } from "./components/StickyCta";

export default function Home() {
  return (
    <main>
      <AnnouncementBar />
      <Hero />
      <Marquee />
      <ProblemPromise />
      <SafetyBanner />
      <Ingredients />
      <Benefits />
      <BrandStory />
      <BeforeAfter />
      <HowToUse />
      <Testimonials />
      <Offer />
      <OrderForm />
      <Footer />
      <StickyCta />
    </main>
  );
}
