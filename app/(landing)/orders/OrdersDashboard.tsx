import type { LpOrder } from "@/lib/lp-orders";
import { logoutAction } from "./actions";

const LABELS: Record<string, string> = {
  botox: "Botox Capillaire",
  "24k": "24K Gold",
  "blue-silk": "Blue Silk",
  coconut: "Coconut Smooth",
  coffee: "Coffee Extract",
  filler: "Filler Glow",
};

export function OrdersDashboard({ product, orders }: { product: string; orders: LpOrder[] }) {
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "2rem", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.25rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
          {LABELS[product] ?? product} — Commandes
        </h1>
        <form action={logoutAction.bind(null, product)}>
          <button type="submit" style={{ fontSize: "0.8rem", color: "#888", background: "none", border: "1px solid #ddd", borderRadius: 6, padding: "0.3rem 0.75rem", cursor: "pointer" }}>
            Déconnexion
          </button>
        </form>
      </div>
      <p style={{ color: "#666", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
        {orders.length} commande{orders.length !== 1 ? "s" : ""} · Total:{" "}
        <strong>{totalRevenue.toLocaleString("fr-MA")} DH</strong>
      </p>

      {orders.length === 0 ? (
        <p style={{ color: "#999" }}>Aucune commande pour le moment.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ background: "#f4f4f4", textAlign: "left" }}>
                {["Date", "Nom", "Téléphone", "Ville", "Qté", "Total", "Langue"].map((h) => (
                  <th key={h} style={{ padding: "0.6rem 0.8rem", fontWeight: 600, whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={o.id} style={{ borderBottom: "1px solid #eee", background: i % 2 ? "#fafafa" : "#fff" }}>
                  <td style={{ padding: "0.6rem 0.8rem", whiteSpace: "nowrap", color: "#555" }}>
                    {new Date(o.at).toLocaleString("fr-MA", { dateStyle: "short", timeStyle: "short" })}
                  </td>
                  <td style={{ padding: "0.6rem 0.8rem", fontWeight: 500 }}>{o.name}</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>{o.phone}</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>{o.city}</td>
                  <td style={{ padding: "0.6rem 0.8rem", textAlign: "center" }}>{o.qty}</td>
                  <td style={{ padding: "0.6rem 0.8rem", fontWeight: 600 }}>{o.total} DH</td>
                  <td style={{ padding: "0.6rem 0.8rem", color: "#888" }}>{o.lang === "ar" ? "عربية" : "FR"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
