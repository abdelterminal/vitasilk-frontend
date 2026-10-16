import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { PRICE_DH, PACK_TITLE, PRODUCT_NAME } from "@/app/(collections)/crystal-mauve/lib/config";
import { saveOrder } from "@/lib/lp-orders";

/**
 * COD order intake for the Crystal Mauve landing page.
 *
 * When `SHEETS_ENDPOINT_CRYSTAL_MAUVE` is set, orders are forwarded to the
 * Google Apps Script web app in `app/(collections)/crystal-mauve/apps-script/`. The
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
  qty?: unknown;
  lang?: unknown;
};

const isValidMoroccanPhone = (raw: string) =>
  /^(?:\+212|0)[5-7]\d{8}$/.test(raw.replace(/[\s-]/g, ""));

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
  const address = typeof body.address === "string" ? body.address.trim() : "";
  // The page sells one pack per order; qty is accepted for parity with the
  // other landing routes but defaults to 1.
  const qty = body.qty === undefined ? 1 : Number(body.qty);

  if (
    name.length < 3 ||
    !isValidMoroccanPhone(phone) ||
    city.length < 2 ||
    address.length < 2 ||
    !Number.isInteger(qty) ||
    qty < 1 ||
    qty > 5
  ) {
    return NextResponse.json({ error: "validation" }, { status: 422 });
  }

  const lang = body.lang === "ar" ? "ar" : "fr";
  const order = {
    name,
    phone,
    city,
    address,
    qty,
    // Computed here, NOT taken from the request: every price derives from
    // lib/config.ts, and a client-sent total is both stale-able and forgeable.
    total: qty * PRICE_DH,
    lang,
    offer: PACK_TITLE[lang],
    at: new Date().toISOString(),
  };

  const record = await saveOrder("crystal-mauve", order);
  // Short human reference shown on the success screen, traceable to the
  // dashboard record id.
  const ref = `CRY-${record.id.split("-")[0].slice(-6)}`;

  const endpoint = process.env.SHEETS_ENDPOINT_CRYSTAL_MAUVE;

  if (endpoint) {
    try {
      // The page's Apps Script reads `JSON.parse(e.postData.contents)`, so this
      // is a text/plain JSON body with the field names that script expects.
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
          pack: order.offer,
          quantity: order.qty,
          price: `${order.total.toFixed(2)} DH`,
          paymentMethod: "Paiement à la livraison (COD)",
          language: lang === "ar" ? "AR" : "FR",
          source: "Landing Page Crystal Mauve",
          orderRef: ref,
        }),
        // Apps Script can be slow to cold-start; give it room but never hang
        // the customer's submit button indefinitely.
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`sheets ${res.status}`);
    } catch (err) {
      // Log the lead locally so a Sheets outage never loses an order, then tell
      // the client it failed — the form surfaces its WhatsApp fallback.
      console.error("[order:crystal-mauve] sheets forward failed", err);
      await appendLocally({ ...order, product: "crystal-mauve", sheetsError: true });
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }
  } else {
    await appendLocally({ ...order, product: "crystal-mauve" });
  }

  console.log("[order:crystal-mauve]", order);
  return NextResponse.json({ ok: true, ref });
}

async function appendLocally(order: Record<string, unknown>) {
  const dataDir = path.join(process.cwd(), "data");
  await mkdir(dataDir, { recursive: true });
  await appendFile(path.join(dataDir, "orders.jsonl"), JSON.stringify(order) + "\n", "utf8");
}
