import { appendFile, mkdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

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
};

const dataDir = () => path.join(process.cwd(), "data");
const filePath = (product: string) => path.join(dataDir(), `${product}-orders.jsonl`);

export async function saveOrder(product: string, order: Omit<LpOrder, "id" | "product">) {
  await mkdir(dataDir(), { recursive: true });
  const record: LpOrder = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    product,
    ...order,
  };
  await appendFile(filePath(product), JSON.stringify(record) + "\n", "utf8");
  return record;
}

export async function getOrders(product: string): Promise<LpOrder[]> {
  const fp = filePath(product);
  if (!existsSync(fp)) return [];
  const raw = await readFile(fp, "utf8");
  return raw
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as LpOrder)
    .reverse();
}
