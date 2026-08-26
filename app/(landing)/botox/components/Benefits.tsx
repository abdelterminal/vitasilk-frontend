"use client";

import Image from "next/image";
import { useLang } from "../lib/i18n";
import { Reveal } from "./Reveal";
import { OrnamentDivider } from "./Ornament";

const ICONS = [
  // protein repair — interlocked strands
  <path key="0" d="M4 12c4-6 12 6 16 0M4 6c4-6 12 6 16 0M4 18c4-6 12 6 16 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />,
  // hydration — drop
  <path key="1" d="M12 3c3.5 4.5 6 7.5 6 10.5a6 6 0 11-12 0C6 10.5 8.5 7.5 12 3z" stroke="currentColor" strokeWidth="1.6" fill="none" />,
  // 0% shield
  <g key="2" stroke="currentColor" strokeWidth="1.6" fill="none">
    <path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z" />
    <path d="M9 14.5l6-6" strokeLinecap="round" />
  </g>,
  // salon size — jar
  <g key="3" stroke="currentColor" strokeWidth="1.6" fill="none">
    <rect x="6" y="7" width="12" height="14" rx="2" />
    <path d="M8 7V5a1 1 0 011-1h6a1 1 0 011 1v2" />
    <path d="M9 12h6" strokeLinecap="round" />
  </g>,
];

export function Benefits() {
  const { t } = useLang();
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <OrnamentDivider className="mb-6" />
          <h2 className="font-display text-3xl text-cream sm:text-4xl md:text-5xl">{t.benefits.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-cream-dim">{t.benefits.subtitle}</p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-4xl">
          <div className="relative w-full overflow-hidden rounded-2xl border-gold-hairline bg-coal aspect-[3/4] md:aspect-[1600/900]">
            <Image
              src="/botox/images/studio-angle.webp"
              alt="Vitasilk Botox Capillaire sur socle, présentation éditoriale"
              fill
              className="object-cover md:object-contain"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.benefits.items.map((item, i) => (
            <Reveal key={item.title} delay={0.1 * i}>
              <div className="group h-full rounded-2xl border-gold-hairline bg-coal/80 p-6 backdrop-blur transition-colors duration-300 hover:border-gold/60">
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-110">
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>{ICONS[i]}</svg>
                </span>
                <h3 className="font-display text-xl text-cream">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-cream-dim">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
