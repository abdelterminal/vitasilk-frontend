"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLang } from "../lib/i18n";
import { Reveal } from "./Reveal";
import { OrnamentFrame, OrnamentDivider } from "./Ornament";

const DEADLINE_KEY = "vitasilk-offer-deadline";
const OFFER_HOURS = 24;

/** Evergreen 24h countdown, persisted per visitor. */
function useCountdown() {
  const [left, setLeft] = useState<{ h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    let deadline = Number(window.localStorage.getItem(DEADLINE_KEY));
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + OFFER_HOURS * 3600_000;
      window.localStorage.setItem(DEADLINE_KEY, String(deadline));
    }
    const tick = () => {
      const ms = Math.max(0, deadline - Date.now());
      setLeft({
        h: Math.floor(ms / 3600_000),
        m: Math.floor((ms % 3600_000) / 60_000),
        s: Math.floor((ms % 60_000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return left;
}

export function Offer() {
  const { t } = useLang();
  const left = useCountdown();
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="mx-auto max-w-4xl px-5 py-20 md:py-28">
      <Reveal className="text-center">
        <h2 className="font-display text-3xl text-cream sm:text-4xl md:text-5xl">{t.offer.title}</h2>
        <p className="mt-3 text-cream-dim">{t.offer.subtitle}</p>
      </Reveal>

      <Reveal delay={0.15}>
        <OrnamentFrame className="mt-12 rounded-3xl bg-gradient-to-b from-charcoal to-coal p-8 sm:p-12">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-14">
            <Image
              src="/botox/images/studio-front.webp"
              alt={t.offer.unit}
              width={280}
              height={280}
              className="h-auto w-52 rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.65)] sm:w-64"
            />
            <div className="text-center">
              <h3 className="font-display text-2xl text-cream">{t.offer.unit}</h3>
              <div className="mt-4 flex items-baseline justify-center gap-4">
                <span dir="ltr" className="font-display text-5xl text-gold-shimmer sm:text-6xl">{t.offer.price}</span>
                <span dir="ltr" className="text-xl text-cream-dim line-through opacity-60">{t.offer.oldPrice}</span>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-cream-dim">
                {[t.offer.freeDelivery, t.offer.cod, t.offer.guarantee].map((line) => (
                  <li key={line} className="flex items-center justify-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gold" aria-hidden>
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {line}
                  </li>
                ))}
              </ul>

              {/* countdown */}
              <p className="mt-8 text-xs uppercase tracking-[0.25em] text-cream-dim">{t.offer.countdown.title}</p>
              <div dir="ltr" className="mt-3 flex justify-center gap-3">
                {left &&
                  (
                    [
                      [left.h, t.offer.countdown.h],
                      [left.m, t.offer.countdown.m],
                      [left.s, t.offer.countdown.s],
                    ] as const
                  ).map(([value, label]) => (
                    <div key={label} className="w-20 rounded-xl border-gold-hairline bg-ink/70 py-3">
                      <span className="block font-display text-3xl text-gold tabular-nums">{pad(value)}</span>
                      <span className="mt-1 block text-[10px] uppercase tracking-wider text-cream-dim">{label}</span>
                    </div>
                  ))}
              </div>

              <a
                href="#order"
                className="mt-8 inline-block rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-deep px-10 py-4 text-lg font-semibold text-ink shadow-lg animate-glow transition-transform hover:scale-105 active:scale-95 motion-reduce:animate-none motion-reduce:transition-none"
              >
                {t.offer.cta}
              </a>
            </div>
          </div>
        </OrnamentFrame>
      </Reveal>

      <OrnamentDivider className="mt-16" />
    </section>
  );
}
