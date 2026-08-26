"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import { useLang } from "../lib/i18n";
import { Reveal } from "./Reveal";
import { OrnamentDivider } from "./Ornament";

export function BeforeAfter() {
  const { t } = useLang();
  const [pos, setPos] = useState(50); // % of the AFTER side, from the left
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <Reveal className="text-center">
        <OrnamentDivider className="mb-6" />
        <h2 className="font-display text-3xl text-cream sm:text-4xl md:text-5xl">{t.beforeAfter.title}</h2>
        <p className="mt-4 text-cream-dim">{t.beforeAfter.subtitle}</p>
      </Reveal>

      <Reveal delay={0.15}>
        {/* dir=ltr: slider mechanics stay identical in Arabic mode */}
        <div
          dir="ltr"
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="relative mx-auto mt-12 aspect-[3/4] w-full max-w-md cursor-ew-resize touch-none select-none overflow-hidden rounded-3xl border-gold-hairline sm:max-w-lg"
        >
          {/* BEFORE (full) */}
          <Image
            src="/botox/images/hair-before.webp"
            alt={t.beforeAfter.before}
            fill
            className="pointer-events-none object-cover"
            sizes="(max-width: 640px) 100vw, 512px"
          />
          {/* AFTER (clipped from the left) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <Image
              src="/botox/images/hair-after.webp"
              alt={t.beforeAfter.after}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 512px"
            />
          </div>

          {/* handle */}
          <div aria-hidden className="absolute inset-y-0" style={{ left: `${pos}%` }}>
            <div className="absolute inset-y-0 -translate-x-1/2 w-0.5 bg-gold" />
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-gold bg-ink/80 text-gold shadow-lg backdrop-blur">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* labels */}
          <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-cream backdrop-blur">
            {t.beforeAfter.after}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-cream backdrop-blur">
            {t.beforeAfter.before}
          </span>

          {/* a11y slider control */}
          <input
            type="range"
            min={4}
            max={96}
            value={Math.round(pos)}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label={`${t.beforeAfter.before} / ${t.beforeAfter.after}`}
            className="absolute bottom-3 left-1/2 w-1/2 -translate-x-1/2 opacity-0 focus-visible:opacity-100"
          />
        </div>
      </Reveal>
    </section>
  );
}
