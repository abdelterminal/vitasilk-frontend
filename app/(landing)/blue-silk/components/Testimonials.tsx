"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLang } from "../lib/i18n";
import { Reveal } from "./Reveal";
import { OrnamentDivider } from "./Ornament";
import testimonialSide from "../assets/images/testimonial-side.webp";

function Stars() {
  return (
    <div className="flex justify-center gap-1 text-gold-light" aria-label="5/5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const { t, dir } = useLang();
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const items = t.testimonials.items;

  const go = (delta: number) => setIndex((index + delta + items.length) % items.length);

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <Reveal className="text-center">
        <OrnamentDivider className="mb-6" />
        <h2 className="font-display text-3xl text-silk sm:text-4xl md:text-5xl">{t.testimonials.title}</h2>
        <p className="mt-3 font-medium text-silk">{t.testimonials.subtitle}</p>
      </Reveal>

      <div className="mt-12 grid items-center gap-10 md:grid-cols-[minmax(0,360px)_1fr]">
        {/* Lifestyle visual — shown on phones too; hiding it below md meant a
            third of the photography never reached the majority of traffic */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-3xl border-gold-hairline shadow-luxe md:max-w-none">
            <Image
              src={testimonialSide}
              alt=""
              fill
              className="object-cover"
              sizes="360px"
            />
          </div>
        </Reveal>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-2xl rounded-3xl border-gold-hairline bg-navy px-8 py-10 text-center shadow-luxe md:mx-0 md:text-start"
            >
              <div className="md:flex md:justify-start">
                <Stars />
              </div>
              <blockquote className="mt-5 text-lg leading-relaxed text-silk">
                “{items[index].text}”
              </blockquote>
              <figcaption className="mt-5 text-sm font-medium tracking-wide text-silk-dim">
                {items[index].name}
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {/* prev/next — visual side is fixed; direction follows reading order */}
          <div className="mt-6 flex items-center justify-center gap-3 md:justify-start">
            <button
              onClick={() => go(dir === "rtl" ? 1 : -1)}
              aria-label="previous"
              className="flex h-10 w-10 items-center justify-center rounded-full border-gold-hairline text-silk-dim transition hover:border-gold hover:text-gold-light"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`${i + 1}`}
                  // azure at 60% over navy is 3.4:1 — the inactive dot is a
                  // non-text control, so 3:1 is the floor it has to clear.
                  // Solid `royal` would only reach 1.6:1 and disappear.
                  className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-gold-light" : "w-2 bg-azure/60"}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(dir === "rtl" ? -1 : 1)}
              aria-label="next"
              className="flex h-10 w-10 items-center justify-center rounded-full border-gold-hairline text-silk-dim transition hover:border-gold hover:text-gold-light"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
