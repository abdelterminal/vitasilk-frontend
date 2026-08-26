"use client";

import { useLang } from "../lib/i18n";
import { Reveal } from "./Reveal";
import { OrnamentDivider } from "./Ornament";

export function HowToUse() {
  const { t } = useLang();
  return (
    <section className="bg-coal/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <OrnamentDivider className="mb-6" />
          <h2 className="font-display text-3xl text-cream sm:text-4xl md:text-5xl">{t.howto.title}</h2>
        </Reveal>

        {/* a numbered sequence — the order genuinely matters here */}
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {t.howto.steps.map((step, i) => (
            <Reveal key={step.title} delay={0.15 * i} className="relative text-center">
              <span className="font-display text-6xl text-gold/25">{i + 1}</span>
              <h3 className="mt-2 font-display text-2xl text-gold-gradient">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-xs leading-relaxed text-cream-dim">{step.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
