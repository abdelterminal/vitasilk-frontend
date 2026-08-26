"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useLang } from "../lib/i18n";
import { Reveal } from "./Reveal";

export function BrandStory() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative h-[70vh] min-h-[480px] overflow-hidden md:h-[85vh]">
      <motion.div style={{ y }} className="absolute inset-0 -top-[8%] -bottom-[8%]">
        <Image
          src="/botox/images/brand-story.webp"
          alt="Vitasilk Botox Capillaire mis en scène dans un décor spa en marbre noir"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />

      <div className="relative flex h-full items-end justify-center px-5 pb-14 md:pb-20">
        <Reveal className="max-w-xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-gold">{t.brandStory.eyebrow}</p>
          <h2 className="font-display text-3xl text-cream drop-shadow-lg sm:text-4xl md:text-5xl">
            {t.brandStory.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-cream-dim drop-shadow">
            {t.brandStory.subtitle}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
