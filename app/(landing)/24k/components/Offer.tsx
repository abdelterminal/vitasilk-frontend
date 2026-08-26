"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLang } from "../lib/i18n";
import { Reveal } from "./Reveal";
import { OrnamentFrame, OrnamentDivider } from "./Ornament";
import { DISCOUNT_PCT, OLD_PRICE_DH, PRICE_DH, formatDh } from "../lib/config";
import studioFront from "../assets/images/studio-front.webp";

const DEADLINE_KEY = "vitasilk-24k-offer-deadline";
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

/**
 * The second deliberately dark section. Dropping to espresso here does two
 * things the ivory page cannot: it stops the scroll right before the form, and
 * it lets the price use the bright gold ramp at full contrast.
 */
export function Offer() {
  const { t, lang } = useLang();
  const left = useCountdown();
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="bg-espresso-deep py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl text-ivory sm:text-4xl md:text-5xl">{t.offer.title}</h2>
          <p className="mt-3 text-champagne">{t.offer.subtitle}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <OrnamentFrame
            tone="dark"
            className="mt-12 rounded-3xl bg-gradient-to-b from-espresso to-espresso-deep p-8 sm:p-12"
          >
            <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-14">
              <Image
                src={studioFront}
                alt={t.offer.unit}
                sizes="(max-width: 640px) 208px, 256px"
                className="h-auto w-52 rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.5)] sm:w-64"
              />
              <div className="text-center">
                <h3 className="font-display text-2xl text-ivory">{t.offer.unit}</h3>
                <div className="mt-4 flex items-baseline justify-center gap-4">
                  <span dir="ltr" className="font-display text-5xl text-gold-shimmer-on-dark sm:text-6xl">
                    {formatDh(PRICE_DH, lang)}
                  </span>
                  <span dir="ltr" className="text-xl text-champagne line-through">{formatDh(OLD_PRICE_DH, lang)}</span>
                </div>
                <p className="mt-2 inline-block rounded-full bg-gold-light/15 px-3 py-1 text-sm font-medium text-gold-light">
                  {t.offer.save(DISCOUNT_PCT)}
                </p>

                <ul className="mt-6 space-y-2 text-sm text-champagne">
                  {[t.offer.freeDelivery, t.offer.cod, t.offer.guarantee].map((line) => (
                    <li key={line} className="flex items-center justify-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gold-light" aria-hidden>
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {line}
                    </li>
                  ))}
                </ul>

                {/* countdown */}
                <p className="mt-8 text-xs uppercase tracking-[0.25em] text-champagne">{t.offer.countdown.title}</p>
                <div dir="ltr" className="mt-3 flex justify-center gap-3">
                  {left &&
                    (
                      [
                        [left.h, t.offer.countdown.h],
                        [left.m, t.offer.countdown.m],
                        [left.s, t.offer.countdown.s],
                      ] as const
                    ).map(([value, label]) => (
                      <div key={label} className="w-20 rounded-xl border-gold-hairline-on-dark bg-espresso-deep py-3">
                        <span className="block font-display text-3xl text-gold-light tabular-nums">{pad(value)}</span>
                        <span className="mt-1 block text-[10px] uppercase tracking-wider text-champagne">{label}</span>
                      </div>
                    ))}
                </div>

                <a
                  href="#order"
                  className="mt-8 inline-block rounded-full bg-gradient-to-r from-gold via-gold-light to-gold px-10 py-4 text-lg font-semibold text-espresso shadow-lg transition-transform hover:scale-105 active:scale-95 motion-reduce:transition-none"
                >
                  {t.offer.cta}
                </a>
              </div>
            </div>
          </OrnamentFrame>
        </Reveal>

        <OrnamentDivider tone="dark" className="mt-16" />
      </div>
    </section>
  );
}
