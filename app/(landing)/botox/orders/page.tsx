import { cookies } from "next/headers";
import { isValidSession } from "@/lib/lp-auth";
import { getOrders } from "@/lib/lp-orders";
import { OrdersDashboard } from "../../orders/OrdersDashboard";
import { LoginForm } from "../../orders/LoginForm";

export default async function Page({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const store = await cookies();
  if (!isValidSession(store.get("lp_session")?.value)) {
    const { error } = await searchParams;
    return <LoginForm product="botox" error={!!error} />;
  }
  return <OrdersDashboard product="botox" orders={await getOrders("botox")} />;
}
