"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../lib/i18n";

export function VideoSection() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);

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

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
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

            {/* Controls overlay */}
            <div style={{ position: "absolute", bottom: "0.75rem", right: "0.75rem", display: "flex", gap: "0.4rem" }}>
              {/* Sound toggle */}
              <button
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(0,0,0,0.55)",
                  border: "1px solid rgba(232,200,106,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", backdropFilter: "blur(4px)",
                }}
              >
                {muted ? (
                  /* Muted speaker */
                  <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                    <path d="M2 4.5h2l3-3v11l-3-3H2v-5z" fill="rgba(232,200,106,0.9)" />
                    <line x1="10" y1="4" x2="14" y2="10" stroke="rgba(232,200,106,0.9)" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="14" y1="4" x2="10" y2="10" stroke="rgba(232,200,106,0.9)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  /* Speaker with waves */
                  <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                    <path d="M2 4.5h2l3-3v11l-3-3H2v-5z" fill="rgba(232,200,106,0.9)" />
                    <path d="M10 4.5a3.5 3.5 0 010 5" stroke="rgba(232,200,106,0.9)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    <path d="M12 2.5a6 6 0 010 9" stroke="rgba(232,200,106,0.9)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  </svg>
                )}
              </button>

              {/* Play/pause */}
              <button
                onClick={toggle}
                aria-label={paused ? "Play" : "Pause"}
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(0,0,0,0.55)",
                  border: "1px solid rgba(232,200,106,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", backdropFilter: "blur(4px)",
                }}
              >
                {paused ? (
                  <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
                    <path d="M2 1.5l9 5-9 5V1.5z" fill="rgba(232,200,106,0.9)" />
                  </svg>
                ) : (
                  <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
                    <rect x="2" y="2" width="3.5" height="10" rx="1" fill="rgba(232,200,106,0.9)" />
                    <rect x="7.5" y="2" width="3.5" height="10" rx="1" fill="rgba(232,200,106,0.9)" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
