import { redirect } from "next/navigation";
import { getOrders } from "@/lib/lp-orders";
import { OrdersDashboard } from "../../orders/OrdersDashboard";

export default async function Page({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  if (token !== process.env.LP_DASHBOARD_TOKEN) redirect("/");
  const orders = await getOrders("botox");
  return <OrdersDashboard product="botox" orders={orders} />;
}
