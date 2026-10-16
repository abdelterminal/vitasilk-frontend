import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { ORDER_QTY, PRICE_DH, PRODUCT_NAME } from "@/app/(okinso)/sos-gold/lib/config";
import { saveOrder } from "@/lib/lp-orders";

/**
 * COD order intake for the SOS Gold landing page.
 *
 * When `SHEETS_ENDPOINT_SOS_GOLD` is set, orders are forwarded to the Google
 * Apps Script web app in `app/(okinso)/sos-gold/apps-script/`. The endpoint is
 * read server-side on purpose: a public /exec URL in the client bundle is an
 * open write handle to the sheet.
 *
 * When it is unset, orders fall back to `data/orders.jsonl` so `npm run dev`
 * works with no setup.
 */

type OrderPayload = {
  name?: unknown;
  phone?: unknown;
  address?: unknown;
  city?: unknown;
  qty?: unknown;
  lang?: unknown;
};

const isValidMoroccanPhone = (raw: string) =>
  /^(?:\+212|0)[5-7]\d{8}$/.test(raw.replace(/[\s-]/g, ""));

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(request: Request) {
  let body: OrderPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const name = str(body.name);
  const phone = str(body.phone);
  const address = str(body.address);
  const city = str(body.city);
  const qty = Number(body.qty ?? ORDER_QTY);

  if (
    name.length < 3 ||
    !isValidMoroccanPhone(phone) ||
    city.length < 2 ||
    address.length < 3 ||
    !Number.isInteger(qty) ||
    qty < 1 ||
    qty > 5
  ) {
    return NextResponse.json({ error: "validation" }, { status: 422 });
  }

  const lang = body.lang === "ar" ? "ar" : "fr";
  // Computed here from config, never taken from the request.
  const total = qty * PRICE_DH;
  const at = new Date().toISOString();

  await saveOrder("sos-gold", { name, phone, city, address, qty, total, lang, at });

  const order = { name, phone, city, address, qty, total, lang, at };
  const endpoint = process.env.SHEETS_ENDPOINT_SOS_GOLD;

  if (endpoint) {
    try {
      // The source's Apps Script parses `e.postData.contents` as JSON, so send
      // the same text/plain JSON body (and field names) the original page did.
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          date: new Date(at).toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" }),
          fullName: name,
          phone,
          city,
          address,
          product: "SOS Gold",
          pack: PRODUCT_NAME,
          quantity: qty,
          price: `${total} DH`,
          paymentMethod: "Paiement à la livraison (COD)",
          language: lang === "ar" ? "AR" : "FR",
          source: "Landing Page SOS Gold",
        }),
        // Apps Script can be slow to cold-start; give it room but never hang
        // the customer's submit button indefinitely.
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`sheets ${res.status}`);
      // Apps Script answers 200 even when doPost throws; it reports the
      // failure in the JSON body instead.
      const result = await res.json().catch(() => null);
      if (result && result.result === "error") throw new Error(`sheets script: ${result.error}`);
    } catch (err) {
      // Log the lead locally so a Sheets outage never loses an order, then tell
      // the client it failed — the form surfaces its WhatsApp fallback.
      console.error("[order:sos-gold] sheets forward failed", err);
      await appendLocally({ ...order, product: "sos-gold", sheetsError: true });
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }
  } else {
    await appendLocally({ ...order, product: "sos-gold" });
  }

  console.log("[order:sos-gold]", order);
  return NextResponse.json({ ok: true });
}

async function appendLocally(order: Record<string, unknown>) {
  const dataDir = path.join(process.cwd(), "data");
  await mkdir(dataDir, { recursive: true });
  await appendFile(path.join(dataDir, "orders.jsonl"), JSON.stringify(order) + "\n", "utf8");
}
