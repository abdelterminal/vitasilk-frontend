"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useLang } from "../lib/i18n";
import { formatDh, PRICE_DH, OLD_PRICE_DH } from "../lib/config";
import { LanguageToggle } from "./LanguageToggle";

// Deterministic particle field (no Math.random → no hydration mismatch)
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 137.5) % 100,
  top: 8 + ((i * 61.8) % 84),
  size: 2 + (i % 3),
  delay: (i * 0.7) % 5,
  duration: 5 + (i % 4) * 1.5,
}));

export function Hero() {
  const { t, lang } = useLang();
  const reduced = useReducedMotion();

  const stagger = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <header className="relative isolate overflow-hidden">
      {/* top bar */}
      <div className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-5">
        <Image src="/botox/logo.avif" alt={t.nav.brand} width={160} height={36} priority className="h-6 w-auto sm:h-7" />
        <LanguageToggle />
      </div>

      {/* gold particles */}
      {!reduced && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-gold-light"
              style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, opacity: 0.35 }}
              animate={{ y: [0, -30, 0], opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-20 pt-10 md:grid-cols-2 md:pb-28 md:pt-16">
        {/* Copy column */}
        <div className="order-2 text-center md:order-1 md:text-start">
          <motion.p {...stagger(0)} className="mb-3 text-sm uppercase tracking-[0.35em] text-cream-dim">
            {t.hero.eyebrow}
          </motion.p>
          <div className="hero-title-wrap">
            <div className="hero-title-inner">
              <motion.h1 {...stagger(1)} className="font-display text-5xl leading-tight sm:text-6xl lg:text-7xl">
                <span className="text-cream">{"Botox"}</span>{" "}
                <span className="text-gold-shimmer">{"Capillaire"}</span>
              </motion.h1>
            </div>
          </div>
          <motion.p {...stagger(2)} className="mx-auto mt-5 max-w-md text-base leading-relaxed text-cream-dim md:mx-0">
            {t.hero.subtitle}
          </motion.p>
          <motion.div {...stagger(3)} className="mt-8 flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-start">
            <a
              href="#order"
              className="inline-block rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-deep px-9 py-4 text-lg font-semibold text-ink shadow-lg animate-glow transition-transform hover:scale-105 active:scale-95 motion-reduce:animate-none motion-reduce:transition-none"
            >
              {t.hero.cta}
            </a>
            <div className="flex items-center gap-2">
              <span dir="ltr" className="text-base line-through opacity-60 text-cream-dim">{formatDh(OLD_PRICE_DH, lang)}</span>
              <span dir="ltr" className="rounded-full bg-gold/15 px-2 py-0.5 text-xs font-medium text-gold-light">-{Math.round((1 - PRICE_DH / OLD_PRICE_DH) * 100)}%</span>
            </div>
          </motion.div>
          <motion.ul {...stagger(4)} className="mt-8 flex flex-wrap justify-center gap-2 md:justify-start">
            {[t.hero.badge1, t.hero.badge2, t.hero.badge3].map((b) => (
              <li
                key={b}
                className="rounded-full border-gold-hairline bg-charcoal/60 px-4 py-1.5 text-xs text-cream-dim backdrop-blur"
              >
                {b}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Jar column */}
        <div className="order-1 flex justify-center md:order-2">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, scale: 0.9, y: 40 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* halo */}
            <div aria-hidden className="gold-halo absolute -inset-16 -z-10" />
            <div className="relative animate-float motion-reduce:animate-none">
              <Image
                src="/botox/images/jar-hero-v2.webp"
                alt="Vitasilk Botox Capillaire 1000ml"
                width={375}
                height={700}
                priority
                className="h-auto w-56 drop-shadow-[0_25px_45px_rgba(0,0,0,0.75)] sm:w-64 md:w-72"
              />
              {/* light sweep across the glossy jar */}
              <span
                aria-hidden
                className="absolute inset-0 overflow-hidden motion-reduce:hidden"
                style={{
                  WebkitMaskImage: "url(/botox/images/jar-hero-v2.webp)",
                  maskImage: "url(/botox/images/jar-hero-v2.webp)",
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                }}
              >
                <motion.span
                  className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ left: ["-40%", "110%"] }}
                  transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
                />
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#problem"
        aria-label={t.hero.scroll}
        className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 text-cream-dim md:block"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <span className="mb-1 block text-center text-xs tracking-widest">{t.hero.scroll}</span>
        <svg className="mx-auto" width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.a>
    </header>
  );
}
