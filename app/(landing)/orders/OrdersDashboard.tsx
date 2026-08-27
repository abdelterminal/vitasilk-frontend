"use client";

import { useState, useTransition } from "react";
import type { LpOrder, OrderStatus } from "@/lib/lp-orders";
import { updateStatusAction, deleteOrdersAction, logoutAction } from "./actions";

const LABELS: Record<string, string> = {
  botox: "Botox Capillaire",
  "24k": "24K Gold",
  "blue-silk": "Blue Silk",
  coconut: "Coconut Smooth",
  coffee: "Coffee Extract",
  filler: "Filler Glow",
};

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  pending:   { bg: "#fff7e6", color: "#b45309", label: "En attente" },
  confirmed: { bg: "#ecfdf5", color: "#065f46", label: "Confirmée" },
  shipped:   { bg: "#eff6ff", color: "#1d4ed8", label: "Expédiée" },
  cancelled: { bg: "#fef2f2", color: "#991b1b", label: "Annulée" },
};

export function OrdersDashboard({ product, orders }: { product: string; orders: LpOrder[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const allIds = orders.map((o) => o.id);

  const toggle = (id: string) =>
    setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const toggleAll = () =>
    setSelected(selected.size === orders.length ? new Set() : new Set(allIds));

  const runStatus = (status: OrderStatus) =>
    startTransition(async () => {
      await updateStatusAction(product, [...selected], status);
      setSelected(new Set());
    });

  const runDelete = () => {
    if (!confirm(`Supprimer ${selected.size} commande(s) ?`)) return;
    startTransition(async () => {
      await deleteOrdersAction(product, [...selected]);
      setSelected(new Set());
    });
  };

  const s = selected.size;

  return (
    <>
      <style>{`html,body{background:#f7f7f7!important;color:#111!important}`}</style>
      <div dir="ltr" style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh", background: "#f7f7f7" }}>

        {/* Header */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e5", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#999", margin: 0 }}>Vitasilk — Dashboard</p>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0.1rem 0 0" }}>{LABELS[product] ?? product}</h1>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#666" }}>
              {orders.length} commande{orders.length !== 1 ? "s" : ""} · <strong>{totalRevenue.toLocaleString("fr-MA")} DH</strong>
            </span>
            <form action={logoutAction.bind(null, product)}>
              <button type="submit" style={{ fontSize: "0.8rem", color: "#888", background: "none", border: "1px solid #ddd", borderRadius: 6, padding: "0.3rem 0.75rem", cursor: "pointer" }}>
                Déconnexion
              </button>
            </form>
          </div>
        </div>

        {/* Action bar */}
        {s > 0 && (
          <div style={{ background: "#1a1a1a", color: "#fff", padding: "0.75rem 2rem", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.875rem", marginRight: "0.5rem" }}>{s} sélectionnée{s > 1 ? "s" : ""}</span>
            {(["confirmed", "shipped", "cancelled"] as OrderStatus[]).map((st) => (
              <button key={st} onClick={() => runStatus(st)} disabled={isPending}
                style={{ padding: "0.4rem 0.9rem", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.8rem",
                  background: STATUS_STYLE[st].bg, color: STATUS_STYLE[st].color, opacity: isPending ? 0.5 : 1 }}>
                {STATUS_STYLE[st].label}
              </button>
            ))}
            <button onClick={runDelete} disabled={isPending}
              style={{ padding: "0.4rem 0.9rem", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.8rem",
                background: "#ef4444", color: "#fff", opacity: isPending ? 0.5 : 1, marginLeft: "auto" }}>
              Supprimer
            </button>
          </div>
        )}

        {/* Table */}
        <div style={{ padding: "1.5rem 2rem" }}>
          {orders.length === 0 ? (
            <p style={{ color: "#999", textAlign: "center", marginTop: "4rem" }}>Aucune commande pour le moment.</p>
          ) : (
            <div style={{ background: "#fff", borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <th style={{ padding: "0.75rem 1rem", width: 36 }}>
                      <input type="checkbox" checked={s === orders.length && orders.length > 0}
                        onChange={toggleAll} style={{ cursor: "pointer", width: 16, height: 16 }} />
                    </th>
                    {["Statut", "Date", "Nom", "Téléphone", "Ville", "Qté", "Total", "Langue"].map((h) => (
                      <th key={h} style={{ padding: "0.75rem 1rem", fontWeight: 600, textAlign: "left", whiteSpace: "nowrap", color: "#555" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => {
                    const st = STATUS_STYLE[o.status ?? "pending"];
                    const isSelected = selected.has(o.id);
                    return (
                      <tr key={o.id} onClick={() => toggle(o.id)} style={{ borderBottom: "1px solid #f5f5f5", cursor: "pointer", background: isSelected ? "#f0f7ff" : "transparent" }}>
                        <td style={{ padding: "0.7rem 1rem" }}>
                          <input type="checkbox" checked={isSelected} onChange={() => toggle(o.id)}
                            onClick={(e) => e.stopPropagation()} style={{ cursor: "pointer", width: 16, height: 16 }} />
                        </td>
                        <td style={{ padding: "0.7rem 1rem" }}>
                          <span style={{ background: st.bg, color: st.color, padding: "0.2rem 0.6rem", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600, whiteSpace: "nowrap" }}>
                            {st.label}
                          </span>
                        </td>
                        <td style={{ padding: "0.7rem 1rem", whiteSpace: "nowrap", color: "#777" }}>
                          {new Date(o.at).toLocaleString("fr-MA", { dateStyle: "short", timeStyle: "short" })}
                        </td>
                        <td style={{ padding: "0.7rem 1rem", fontWeight: 500 }}>{o.name}</td>
                        <td style={{ padding: "0.7rem 1rem" }}>{o.phone}</td>
                        <td style={{ padding: "0.7rem 1rem" }}>{o.city}</td>
                        <td style={{ padding: "0.7rem 1rem", textAlign: "center" }}>{o.qty}</td>
                        <td style={{ padding: "0.7rem 1rem", fontWeight: 600 }}>{o.total} DH</td>
                        <td style={{ padding: "0.7rem 1rem", color: "#888" }}>{o.lang === "ar" ? "عربية" : "FR"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
