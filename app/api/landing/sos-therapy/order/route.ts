import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { PRODUCT_NAME, getOffer } from "@/app/(collections)/sos-therapy/lib/config";
import { saveOrder } from "@/lib/lp-orders";

/**
 * COD order intake for the SOS Hair Therapy landing page.
 *
 * When `SHEETS_ENDPOINT_SOS_THERAPY` is set, orders are forwarded to the Apps
 * Script web app in `app/(collections)/sos-therapy/apps-script/google_apps_script.js`.
 * The endpoint is read server-side on purpose: a public /exec URL in the client
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
  const city = str(body.city, 80);
  const address = str(body.address, 300);
  const offer = getOffer(body.offer);

  if (name.length < 3 || !isValidMoroccanPhone(phone) || city.length < 2 || !offer) {
    return NextResponse.json({ error: "validation" }, { status: 422 });
  }

  const lang = body.lang === "ar" ? "ar" : "fr";
  const order = {
    name,
    phone,
    city,
    address,
    offer: offer.id,
    qty: offer.qty,
    // From config, never from the request: the pack price is the whole total.
    total: offer.price,
    lang,
    at: new Date().toISOString(),
  };

  await saveOrder("sos-therapy", order);

  const endpoint = process.env.SHEETS_ENDPOINT_SOS_THERAPY;

  if (endpoint) {
    try {
      // The source page's Apps Script parses e.postData.contents as JSON, so
      // send exactly the body (and field names) the original page sent.
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          date: new Date(order.at).toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" }),
          fullName: order.name,
          phone: order.phone,
          city: order.city,
          address: order.address,
          product: "SOS Therapy",
          pack: `${PRODUCT_NAME} x${order.qty}`,
          quantity: order.qty,
          price: `${order.total} DH`,
          language: lang.toUpperCase(),
          source: "Landing Page SOS Therapy",
        }),
        // Apps Script can be slow to cold-start; give it room but never hang
        // the customer's submit button indefinitely.
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`sheets ${res.status}`);
      // The script answers 200 even when it throws, with { result: "error" }.
      const data = await res.json().catch(() => null);
      if (data && data.result === "error") throw new Error(`sheets script: ${data.error}`);
    } catch (err) {
      // Log the lead locally so a Sheets outage never loses an order, then tell
      // the client it failed — the form surfaces its WhatsApp fallback.
      console.error("[order:sos-therapy] sheets forward failed", err);
      await appendLocally({ product: "sos-therapy", ...order, sheetsError: true });
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }
  } else {
    await appendLocally({ product: "sos-therapy", ...order });
  }

  console.log("[order:sos-therapy]", order);
  return NextResponse.json({ ok: true });
}

async function appendLocally(order: Record<string, unknown>) {
  const dataDir = path.join(process.cwd(), "data");
  await mkdir(dataDir, { recursive: true });
  await appendFile(path.join(dataDir, "orders.jsonl"), JSON.stringify(order) + "\n", "utf8");
}
