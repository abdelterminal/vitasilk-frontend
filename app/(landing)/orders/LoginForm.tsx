"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

const LABELS: Record<string, string> = {
  botox: "Botox Capillaire",
  "24k": "24K Gold",
  "blue-silk": "Blue Silk",
  coconut: "Coconut Smooth",
  coffee: "Coffee Extract",
  filler: "Filler Glow",
};

export function LoginForm({ product, error }: { product: string; error: boolean }) {
  const action = loginAction.bind(null, product);
  const [, formAction, pending] = useActionState(action, null);

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#f7f7f7", fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{
        background: "#fff", borderRadius: 12, padding: "2.5rem 2rem",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)", width: "100%", maxWidth: 360,
      }}>
        <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#999", marginBottom: "0.5rem" }}>
          Vitasilk — Dashboard
        </p>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.75rem", color: "#111" }}>
          {LABELS[product] ?? product}
        </h1>

        <form action={formAction}>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#444", marginBottom: "0.4rem" }}>
            Mot de passe
          </label>
          <input
            name="password"
            type="password"
            autoFocus
            required
            style={{
              width: "100%", padding: "0.65rem 0.85rem", borderRadius: 8,
              border: error ? "1.5px solid #e53e3e" : "1.5px solid #ddd",
              fontSize: "1rem", outline: "none", boxSizing: "border-box",
              marginBottom: error ? "0.4rem" : "1rem",
            }}
          />
          {error && (
            <p style={{ color: "#e53e3e", fontSize: "0.8rem", marginBottom: "0.75rem" }}>
              Mot de passe incorrect.
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            style={{
              width: "100%", padding: "0.7rem", borderRadius: 8, border: "none",
              background: "#111", color: "#fff", fontSize: "0.95rem", fontWeight: 600,
              cursor: pending ? "not-allowed" : "pointer", opacity: pending ? 0.6 : 1,
            }}
          >
            {pending ? "..." : "Accéder"}
          </button>
        </form>
      </div>
    </div>
  );
}
