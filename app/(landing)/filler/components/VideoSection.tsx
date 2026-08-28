"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../lib/i18n";

export function VideoSection() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.load();

    const onPause = () => setPaused(true);
    const onPlay  = () => setPaused(false);
    video.addEventListener("pause", onPause);
    video.addEventListener("play",  onPlay);

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
    return () => {
      observer.disconnect();
      video.removeEventListener("pause", onPause);
      video.removeEventListener("play",  onPlay);
    };
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    paused ? video.play().catch(() => {}) : video.pause();
  };

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
            className="border-gold-hairline relative overflow-hidden rounded-3xl"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(232,200,106,0.15)" }}
          >
            <video
              ref={videoRef}
              muted
              playsInline
              loop
              preload="auto"
              className="w-full"
            >
              <source src="/filler/video.mp4" type="video/mp4" />
            </video>

            {/* Play/pause overlay button */}
            <button
              onClick={toggle}
              aria-label={paused ? "Play" : "Pause"}
              style={{
                position: "absolute",
                bottom: "0.75rem",
                right: "0.75rem",
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(232,200,106,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
                transition: "opacity 0.2s",
              }}
            >
              {paused ? (
                /* Play triangle */
                <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
                  <path d="M2 1.5l9 5-9 5V1.5z" fill="rgba(232,200,106,0.9)" />
                </svg>
              ) : (
                /* Pause bars */
                <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
                  <rect x="2" y="2" width="3.5" height="10" rx="1" fill="rgba(232,200,106,0.9)" />
                  <rect x="7.5" y="2" width="3.5" height="10" rx="1" fill="rgba(232,200,106,0.9)" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
