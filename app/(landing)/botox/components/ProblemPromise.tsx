"use client";

import { useLang } from "../lib/i18n";
import { Reveal } from "./Reveal";
import { OrnamentDivider } from "./Ornament";

export function ProblemPromise() {
  const { t } = useLang();
  return (
    <section id="problem" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <Reveal className="text-center">
        <h2 className="font-display text-3xl text-cream sm:text-4xl md:text-5xl">{t.problem.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-cream-dim">{t.problem.subtitle}</p>
      </Reveal>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {/* Pain points */}
        <Reveal delay={0.1}>
          <ul className="space-y-4">
            {t.problem.points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-4 rounded-2xl border border-gold/20 bg-charcoal/50 px-5 py-4 text-cream-dim"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 text-gold/50" aria-hidden>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
                  <path d="M8.5 12h7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Promise */}
        <Reveal delay={0.2}>
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border-gold-hairline bg-gradient-to-br from-charcoal to-coal">
            <div className="relative w-full aspect-[1400/1056] bg-ink">
              <video
                src="/botox/videos/promise-loop.mp4"
                poster="/botox/images/studio-top.webp"
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-8">
              <OrnamentDivider className="mb-5" />
              <h3 className="text-center font-display text-2xl text-gold-gradient">{t.problem.promiseTitle}</h3>
              <p className="mt-4 text-center leading-relaxed text-cream-dim">{t.problem.promise}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
