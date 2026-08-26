"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "../lib/i18n";

export function StickyCta() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.8;
      const orderEl = document.getElementById("order");
      const orderVisible = orderEl
        ? orderEl.getBoundingClientRect().top < window.innerHeight * 0.9
        : false;
      setVisible(pastHero && !orderVisible);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/25 bg-ink/90 px-5 py-3 backdrop-blur md:hidden"
        >
          <div className="mx-auto flex max-w-md items-center justify-between gap-4">
            <div>
              <span className="block font-display text-xl text-gold-gradient">{t.sticky.price}</span>
              <span className="block text-[11px] text-cream-dim">{t.offer.freeDelivery} · {t.offer.cod}</span>
            </div>
            <a
              href="#order"
              className="rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-deep px-7 py-3 font-semibold text-ink shadow-lg active:scale-95"
            >
              {t.sticky.cta}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
