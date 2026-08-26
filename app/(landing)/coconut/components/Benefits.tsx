"use client";

import { useLang } from "../lib/i18n";
import { Reveal } from "./Reveal";
import { OrnamentDivider } from "./Ornament";

// Order matches t.benefits.items: anti-frizz / deep nutrition / almond softness
// / 1L format. Reordered from the sibling projects — the drop moved up to slot 1
// because nutrition is this SKU's second beat, and the sparkle was replaced by a
// leaf, since "shine" is not a claim this page makes.
const ICONS = [
  // anti-frizz — smoothed strands
  <path key="0" d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />,
  // deep nutrition — drop
  <path key="1" d="M12 3c3.5 4.5 6 7.5 6 10.5a6 6 0 11-12 0C6 10.5 8.5 7.5 12 3z" stroke="currentColor" strokeWidth="1.6" fill="none" />,
  // almond softness — leaf
  <g key="2" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20c0-8 5.5-14 15-15 .6 7.5-3.5 15-11 15-1.6 0-3-.4-4-1z" />
    <path d="M9.5 20c.5-4 2.5-7.5 6-10" />
  </g>,
  // salon format — 1L bottle
  <g key="3" stroke="currentColor" strokeWidth="1.6" fill="none">
    <path d="M10 2h4v3l2.2 3.1a4 4 0 01.8 2.4V19a2 2 0 01-2 2H9a2 2 0 01-2-2v-8.5a4 4 0 01.8-2.4L10 5V2z" />
    <path d="M7.4 13h9.2" strokeLinecap="round" />
  </g>,
];

export function Benefits() {
  const { t } = useLang();
  return (
    <section className="bg-shell py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <OrnamentDivider className="mb-6" />
          <h2 className="font-display text-3xl text-bark sm:text-4xl md:text-5xl">{t.benefits.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-husk">{t.benefits.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.benefits.items.map((item, i) => (
            <Reveal key={item.title} delay={0.1 * i}>
              <div className="group h-full rounded-2xl border-gold-hairline bg-cream p-6 shadow-luxe transition-colors duration-300 hover:border-gold">
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-palm/10 text-palm transition-transform duration-300 group-hover:scale-110">
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>{ICONS[i]}</svg>
                </span>
                <h3 className="font-display text-xl text-bark">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-husk">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
