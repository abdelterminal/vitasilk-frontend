"use client";

import { useEffect, useRef } from "react";
import { useLang } from "../lib/i18n";

export function VideoSection() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-espresso py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-crema-dim">
            {t.video.eyebrow}
          </p>
          <h2 className="font-display text-4xl text-crema sm:text-5xl">
            {t.video.title}
          </h2>
        </div>

        <div className="mx-auto max-w-xs sm:max-w-sm">
          <div
            className="border-gold-hairline overflow-hidden rounded-3xl"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(232,200,106,0.15)" }}
          >
            <video
              ref={videoRef}
              muted
              playsInline
              loop
              preload="metadata"
              className="w-full"
            >
              <source src="/filler/video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
