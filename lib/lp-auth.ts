import { createHash } from "node:crypto";

export function makeSessionToken(password: string): string {
  return createHash("sha256")
    .update(password + (process.env.LP_DASHBOARD_TOKEN ?? "salt"))
    .digest("hex");
}

export function isValidSession(cookieValue: string | undefined): boolean {
  if (!cookieValue || !process.env.LP_DASHBOARD_PASSWORD) return false;
  return cookieValue === makeSessionToken(process.env.LP_DASHBOARD_PASSWORD);
}
