import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { MAX_QTY, PRODUCT_NAME, totalFor } from "@/app/(collections)/protein-collagen/lib/config";
import { saveOrder } from "@/lib/lp-orders";

/**
 * COD order intake for the Protein Collagen ritual pack.
 *
 * When `SHEETS_ENDPOINT_PROTEIN_COLLAGEN` is set, orders are forwarded to the Apps Script
 * web app in `app/(collections)/protein-collagen/apps-script/google_apps_script.js`. That
 * script parses `e.postData.contents` as JSON, so the body is sent as a
 * text/plain JSON string with the field names it reads (fullName, pack,
 * quantity, price, language, source…). The endpoint is read server-side on
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
  // Only the quick-order modal asks for an address; the main form doesn't.
  const address = typeof body.address === "string" ? body.address.trim().slice(0, 300) : "";
  const qty = Number(body.qty);

  if (
    name.length < 3 ||
    !isValidMoroccanPhone(phone) ||
    city.length < 2 ||
    !Number.isInteger(qty) ||
    qty < 1 ||
    qty > MAX_QTY
  ) {
    return NextResponse.json({ error: "validation" }, { status: 422 });
  }

  // Computed here from config, NOT taken from the request: the browser only
  // says how many packs it wants.
  const total = totalFor(qty);
  const lang = body.lang === "ar" ? "ar" : "fr";
  const at = new Date().toISOString();

  const order = { name, phone, city, address, qty, total, lang, at };

  await saveOrder("protein-collagen", {
    name,
    phone,
    city,
    qty,
    total,
    lang,
    at,
    ...(address ? { address } : {}),
  });

  const endpoint = process.env.SHEETS_ENDPOINT_PROTEIN_COLLAGEN;

  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          date: new Date(at).toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" }),
          fullName: name,
          phone,
          city,
          // The source sent the city again when no address was given.
          address: address || city,
          product: "VitaSilk",
          pack: qty > 1 ? `${PRODUCT_NAME} (${qty}x)` : PRODUCT_NAME,
          quantity: qty,
          price: `${total} DH`,
          language: lang.toUpperCase(),
          source: "Landing Page VitaSilk",
        }),
        // Apps Script can be slow to cold-start; give it room but never hang
        // the customer's submit button indefinitely.
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`sheets ${res.status}`);
      // The script answers 200 even when it throws, with {result: "error"}.
      const reply = await res.json().catch(() => null);
      if (reply && reply.result === "error") throw new Error(`sheets script: ${reply.error}`);
    } catch (err) {
      // Log the lead locally so a Sheets outage never loses an order, then tell
      // the client it failed — the form surfaces its WhatsApp fallback.
      console.error("[order:protein-collagen] sheets forward failed", err);
      await appendLocally({ ...order, product: "protein-collagen", sheetsError: true });
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }
  } else {
    await appendLocally({ ...order, product: "protein-collagen" });
  }

  console.log("[order:protein-collagen]", order);
  return NextResponse.json({ ok: true });
}

async function appendLocally(order: Record<string, unknown>) {
  const dataDir = path.join(process.cwd(), "data");
  await mkdir(dataDir, { recursive: true });
  await appendFile(path.join(dataDir, "orders.jsonl"), JSON.stringify(order) + "\n", "utf8");
}
