import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { DEFAULT_OFFER, OFFERS, isOfferId } from "@/app/(collections)/crystal-rose/lib/config";
import { saveOrder } from "@/lib/lp-orders";

/**
 * COD order intake for the Crystal Rose landing page.
 *
 * When `SHEETS_ENDPOINT_CRYSTAL_ROSE` is set, orders are forwarded to the
 * Google Apps Script web app in `app/(collections)/crystal-rose/apps-script/`. That
 * script reads a JSON body from `e.postData.contents`, so we send exactly the
 * payload the original Vite page sent. The endpoint is read server-side on
 * purpose: a public /exec URL in the client bundle is an open write handle to
 * the sheet.
 *
 * When it is unset, orders fall back to `data/orders.jsonl` so `npm run dev`
 * works with no setup.
 */

type OrderPayload = {
  name?: unknown;
  phone?: unknown;
  city?: unknown;
  email?: unknown;
  qty?: unknown;
  offer?: unknown;
  lang?: unknown;
};

const isValidMoroccanPhone = (raw: string) =>
  /^(?:\+212|0)[5-7]\d{8}$/.test(raw.replace(/[\s-]/g, ""));

const isValidEmail = (raw: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw);

export async function POST(request: Request) {
  let body: OrderPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const city = typeof body.city === "string" ? body.city.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  const qty = body.qty === undefined ? 1 : Number(body.qty);
  const offerId = body.offer === undefined ? DEFAULT_OFFER : body.offer;

  if (
    name.length < 3 ||
    !isValidMoroccanPhone(phone) ||
    city.length < 2 ||
    (email !== "" && !isValidEmail(email)) ||
    !Number.isInteger(qty) ||
    qty < 1 ||
    qty > 5 ||
    !isOfferId(offerId)
  ) {
    return NextResponse.json({ error: "validation" }, { status: 422 });
  }

  const offer = OFFERS[offerId];
  const lang = body.lang === "ar" ? "ar" : "fr";
  const at = new Date().toISOString();
  // Computed here, never taken from the request: a stale bundle or a tampered
  // request must not be able to write a different price into the sheet.
  const total = qty * offer.price;
  const ref = `CRY-${Math.floor(100000 + Math.random() * 900000)}`;

  await saveOrder("crystal-rose", { name, phone, city, qty, total, lang, at, offer: offerId });

  const order = { ref, name, phone, city, email, qty, offer: offerId, total, lang, at };
  const endpoint = process.env.SHEETS_ENDPOINT_CRYSTAL_ROSE;

  if (endpoint) {
    try {
      // Same field names and text/plain JSON body as the source page's
      // services/orderService.js, so its google_apps_script.js works unchanged.
      // The script fills its "Adresse" column from address || email; the source
      // sent the city there, we send the email when one was given so it isn't lost.
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          date: new Date().toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" }),
          orderRef: ref,
          fullName: name,
          phone,
          city,
          address: email || city,
          email,
          product: "Crystal Rose",
          pack: offer.label,
          routine: offerId,
          quantity: qty,
          price: `${total} DH`,
          language: lang.toUpperCase(),
          source: "Landing Page Crystal Rose",
        }),
        // Apps Script can be slow to cold-start; give it room but never hang
        // the customer's submit button indefinitely.
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`sheets ${res.status}`);
    } catch (err) {
      // Log the lead locally so a Sheets outage never loses an order, then tell
      // the client it failed — the form surfaces its WhatsApp fallback.
      console.error("[order:crystal-rose] sheets forward failed", err);
      await appendLocally({ product: "crystal-rose", ...order, sheetsError: true });
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }
  } else {
    await appendLocally({ product: "crystal-rose", ...order });
  }

  console.log("[order:crystal-rose]", order);
  return NextResponse.json({ ok: true, ref });
}

async function appendLocally(order: Record<string, unknown>) {
  const dataDir = path.join(process.cwd(), "data");
  await mkdir(dataDir, { recursive: true });
  await appendFile(path.join(dataDir, "orders.jsonl"), JSON.stringify(order) + "\n", "utf8");
}
