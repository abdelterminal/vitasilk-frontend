"use client";

import { useLanguage } from "../lib/LanguageContext";

/**
 * Shown when the order route fails (Sheets outage, network). Not part of the
 * source design, which faked success on any error — styled inline with the
 * page's own palette tokens so it needs no extra stylesheet.
 */
export default function OrderError({ whatsappHref, onRetry }: { whatsappHref: string; onRetry: () => void }) {
  const { t, lang } = useLanguage();

  return (
    <div className="text-center" dir={lang === "ar" ? "rtl" : "ltr"} style={{ padding: "32px 8px" }}>
      <div
        style={{
          width: 64,
          height: 64,
          margin: "0 auto 20px",
          borderRadius: "50%",
          background: "#FDECEA",
          color: "#B3261E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 30,
          fontWeight: 700,
        }}
        aria-hidden
      >
        !
      </div>
      <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--color-primary)", fontSize: 24, marginBottom: 10 }}>
        {t.orderForm.errorTitle}
      </h3>
      <p style={{ color: "var(--color-text-muted)", maxWidth: 420, margin: "0 auto 24px" }}>{t.orderForm.errorText}</p>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          width: "100%",
          maxWidth: 360,
          padding: "14px 20px",
          borderRadius: "var(--radius-full)",
          background: "#25D366",
          color: "#FFFFFF",
          fontWeight: 700,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.62-.93-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.58-.35zM12.05 21.79h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.85 9.85 0 01-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 019.88 9.89c0 5.45-4.43 9.88-9.89 9.88zm8.42-18.3A11.82 11.82 0 0012.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.68 1.45c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.47-8.4z" />
        </svg>
        {t.orderForm.whatsappBtn}
      </a>
      <div>
        <button
          type="button"
          onClick={onRetry}
          style={{ marginTop: 16, color: "var(--color-accent-dark)", textDecoration: "underline", fontSize: 14 }}
        >
          {t.orderForm.retryBtn}
        </button>
      </div>
    </div>
  );
}
