"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useLang } from "../lib/i18n";
import { Reveal } from "./Reveal";
import brandStory from "../assets/images/brand-story-light.webp";

/**
 * Full-bleed parallax band.
 *
 * Deliberately kept LIGHT. The earlier version inherited the dark theme's
 * scrim (opaque espresso at the bottom, 70% through the middle) which dragged
 * this bright, airy salon photo down to ~35% brightness — it read as a brown
 * smudge rather than an image. Here the photo stays at full brightness and only
 * the bottom is veiled in ivory, just enough to seat the text.
 */
export function BrandStory() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    // 16:9 on desktop shows the whole frame; phones get a fixed height and a
    // centre crop, since a 16:9 band is barely a sliver on a portrait screen.
    <section
      ref={ref}
      className="relative min-h-[460px] overflow-hidden bg-pearl md:aspect-[16/9] md:min-h-0"
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-[8%] -bottom-[8%]">
        <Image
          src={brandStory}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* ivory veil over the lower half only — enough to seat espresso text
          without touching the top two-thirds of the photograph */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ivory via-ivory/85 to-transparent"
      />

      <div className="relative flex h-full min-h-[460px] items-end justify-center px-5 pb-10 md:min-h-0 md:pb-14">
        <Reveal className="max-w-xl text-center">
          {/* mocha, not gold: at 14px this is small text, and gold-deep only
              reaches 3.8:1 on ivory. Matches the Ingredients eyebrow. */}
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-mocha">
            {t.brandStory.eyebrow}
          </p>
          <h2 className="font-display text-3xl text-espresso sm:text-4xl md:text-5xl">
            {t.brandStory.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-mocha">
            {t.brandStory.subtitle}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
