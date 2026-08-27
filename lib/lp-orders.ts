import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

export type OrderStatus = "pending" | "confirmed" | "shipped" | "cancelled";

export type LpOrder = {
  id: string;
  product: string;
  name: string;
  phone: string;
  city: string;
  qty: number;
  total: number;
  lang: string;
  at: string;
  status?: OrderStatus;
};

const dataDir = () => path.join(process.cwd(), "data");
const filePath = (product: string) => path.join(dataDir(), `${product}-orders.jsonl`);

async function readAll(product: string): Promise<LpOrder[]> {
  const fp = filePath(product);
  if (!existsSync(fp)) return [];
  const raw = await readFile(fp, "utf8");
  return raw.trim().split("\n").filter(Boolean).map((l) => JSON.parse(l) as LpOrder);
}

async function writeAll(product: string, orders: LpOrder[]) {
  await mkdir(dataDir(), { recursive: true });
  await writeFile(filePath(product), orders.map((o) => JSON.stringify(o)).join("\n") + "\n", "utf8");
}

export async function saveOrder(product: string, order: Omit<LpOrder, "id" | "product" | "status">) {
  await mkdir(dataDir(), { recursive: true });
  const record: LpOrder = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    product,
    status: "pending",
    ...order,
  };
  await appendFile(filePath(product), JSON.stringify(record) + "\n", "utf8");
  return record;
}

export async function getOrders(product: string): Promise<LpOrder[]> {
  return (await readAll(product)).reverse();
}

export async function updateOrdersStatus(product: string, ids: string[], status: OrderStatus) {
  const idSet = new Set(ids);
  const orders = await readAll(product);
  await writeAll(product, orders.map((o) => idSet.has(o.id) ? { ...o, status } : o));
}

export async function deleteOrders(product: string, ids: string[]) {
  const idSet = new Set(ids);
  const orders = await readAll(product);
  await writeAll(product, orders.filter((o) => !idSet.has(o.id)));
}
