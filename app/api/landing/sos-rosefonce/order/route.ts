import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { OFFERS, PRODUCT_NAME, SHEETS_SOURCE, isOfferId } from "@/app/(collections)/sos-rosefonce/lib/config";
import { saveOrder } from "@/lib/lp-orders";

/**
 * COD order intake for the SOS Rose Foncé landing page.
 *
 * When `SHEETS_ENDPOINT_SOS_ROSEFONCE` is set, orders are forwarded to the
 * Google Apps Script web app in `app/(collections)/sos-rosefonce/apps-script/`. The
 * endpoint is read server-side on purpose: a public /exec URL in the client
 * bundle is an open write handle to the sheet.
 *
 * When it is unset, orders fall back to `data/orders.jsonl` so `npm run dev`
 * works with no setup.
 */

type OrderPayload = {
  name?: unknown;
  phone?: unknown;
  city?: unknown;
  address?: unknown;
  offer?: unknown;
  lang?: unknown;
  source?: unknown;
};

const isValidMoroccanPhone = (raw: string) =>
  /^(?:\+212|0)[5-7]\d{8}$/.test(raw.replace(/[\s-]/g, ""));

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: OrderPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const name = str(body.name);
  const phone = str(body.phone, 30);
  const city = str(body.city);
  const address = str(body.address, 300);
  const offerId = body.offer ?? "pack1";

  if (
    name.length < 3 ||
    !isValidMoroccanPhone(phone) ||
    city.length < 2 ||
    address.length < 2 ||
    !isOfferId(offerId)
  ) {
    return NextResponse.json({ error: "validation" }, { status: 422 });
  }

  const offer = OFFERS[offerId];
  const order = {
    name,
    phone,
    city,
    address,
    offer: offerId,
    qty: offer.qty,
    // Computed here from lib/config.ts, NOT taken from the request: the original
    // Vite page sent its own price from the browser, which a stale bundle or a
    // hand-edited request could change.
    total: offer.price,
    lang: body.lang === "ar" ? "ar" : "fr",
    at: new Date().toISOString(),
  };

  await saveOrder("sos-rosefonce", order);

  const endpoint = process.env.SHEETS_ENDPOINT_SOS_ROSEFONCE;

  if (endpoint) {
    try {
      // The page's Apps Script parses e.postData.contents as JSON, so the body
      // is a JSON string sent as text/plain (which also avoids a CORS preflight
      // on Apps Script's side). Field names match its doPost().
      const source = str(body.source, 40);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          date: new Date(order.at).toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" }),
          fullName: order.name,
          phone: order.phone,
          city: order.city,
          address: order.address,
          product: PRODUCT_NAME,
          pack: offer.label,
          price: `${order.total} DH`,
          quantity: order.qty,
          language: order.lang.toUpperCase(),
          source: source ? `${SHEETS_SOURCE} — ${source}` : SHEETS_SOURCE,
        }),
        // Apps Script can be slow to cold-start; give it room but never hang
        // the customer's submit button indefinitely.
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`sheets ${res.status}`);
    } catch (err) {
      // Log the lead locally so a Sheets outage never loses an order, then tell
      // the client it failed — the form surfaces its WhatsApp fallback.
      console.error("[order] sheets forward failed", err);
      await appendLocally({ product: "sos-rosefonce", ...order, sheetsError: true });
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }
  } else {
    await appendLocally({ product: "sos-rosefonce", ...order });
  }

  console.log("[order]", order);
  return NextResponse.json({ ok: true });
}

async function appendLocally(order: Record<string, unknown>) {
  const dataDir = path.join(process.cwd(), "data");
  await mkdir(dataDir, { recursive: true });
  await appendFile(path.join(dataDir, "orders.jsonl"), JSON.stringify(order) + "\n", "utf8");
}
