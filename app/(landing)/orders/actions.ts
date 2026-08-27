"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { makeSessionToken } from "@/lib/lp-auth";

export async function loginAction(product: string, _: unknown, formData: FormData) {
  const password = formData.get("password") as string;
  if (password && password === process.env.LP_DASHBOARD_PASSWORD) {
    const store = await cookies();
    store.set("lp_session", makeSessionToken(password), {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });
    redirect(`/${product}/orders`);
  }
  redirect(`/${product}/orders?error=1`);
}

export async function logoutAction(product: string) {
  const store = await cookies();
  store.delete("lp_session");
  redirect(`/${product}/orders`);
}
