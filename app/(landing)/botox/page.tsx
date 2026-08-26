import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vitasilk — Botox Capillaire | بوتوكس الشعر الاحترافي",
  description: "Vitasilk Botox Capillaire professionnel — lissage longue durée, livraison COD au Maroc.",
};

import { AnnouncementBar } from "./components/AnnouncementBar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { ProblemPromise } from "./components/ProblemPromise";
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
