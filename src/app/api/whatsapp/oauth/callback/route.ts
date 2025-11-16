import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://wavib.com";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  console.log("[WA CALLBACK] code =", code?.slice(0, 10), "state =", state);

  const redirectUrl = new URL("/dashboard", BASE_URL);
  redirectUrl.searchParams.set("meta_status", code ? "debug_ok" : "no_code");

  return NextResponse.redirect(redirectUrl.toString());
}