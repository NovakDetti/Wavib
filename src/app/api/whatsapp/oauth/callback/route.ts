import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { encryptToken } from "@/lib/crypto";

export const runtime = "nodejs";

const META_APP_ID = process.env.META_APP_ID!;
const META_CLIENT_SECRET = process.env.META_CLIENT_SECRET!;
const META_REDIRECT_URI = process.env.META_REDIRECT_URI!;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

/* export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    console.log("[WA CALLBACK] code =", code?.slice(0, 10), "...", "state =", state);

    // Csak teszt redirect a dashboardra
    const redirectUrl = new URL("/dashboard", BASE_URL);
    redirectUrl.searchParams.set("meta_status", code ? "debug_ok" : "no_code");

    return NextResponse.redirect(redirectUrl.toString());
  } catch (err) {
    console.error("[WA CALLBACK] hard error:", err);
    return NextResponse.json({ error: "callback_failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const error = url.searchParams.get("error");
  const code = url.searchParams.get("code");
  const stateRaw = url.searchParams.get("state");

  if (error) {
    console.warn("Meta OAuth error:", error);
    return redirectWithStatus("oauth_error");
  }

  if (!code || !stateRaw) {
    return redirectWithStatus("missing_code_or_state");
  }

  let state: { user_id: string; email?: string } | null = null;
  try {
    state = JSON.parse(stateRaw);
  } catch (e) {
    console.error("Invalid state JSON", e);
    return redirectWithStatus("invalid_state");
  }

  if (!state?.user_id) {
    return redirectWithStatus("invalid_state");
  }

  // 1) short-lived token
  const tokenUrl = new URL("https://graph.facebook.com/v21.0/oauth/access_token");
  tokenUrl.searchParams.set("client_id", META_APP_ID);
  tokenUrl.searchParams.set("client_secret", META_CLIENT_SECRET);
  tokenUrl.searchParams.set("redirect_uri", META_REDIRECT_URI);
  tokenUrl.searchParams.set("code", code);

  const tokenRes = await fetch(tokenUrl.toString(), { method: "GET" });
  const tokenJson = await tokenRes.json();

  if (!tokenRes.ok || !tokenJson.access_token) {
    console.error("Meta short-lived token error:", tokenJson);
    return redirectWithStatus("token_exchange_failed");
  }

  const shortLivedToken = tokenJson.access_token as string;

  // 2) long-lived token (opcionális)
  const longUrl = new URL("https://graph.facebook.com/v21.0/oauth/access_token");
  longUrl.searchParams.set("grant_type", "fb_exchange_token");
  longUrl.searchParams.set("client_id", META_APP_ID);
  longUrl.searchParams.set("client_secret", META_CLIENT_SECRET);
  longUrl.searchParams.set("fb_exchange_token", shortLivedToken);

  const longRes = await fetch(longUrl.toString(), { method: "GET" });
  const longJson = await longRes.json();
  const accessToken =
    (longRes.ok && typeof longJson.access_token === "string" && longJson.access_token) ||
    shortLivedToken;

  // 3) WABA és telefonszám
  const wabaRes = await fetch(
    "https://graph.facebook.com/v21.0/me/whatsapp_business_accounts?access_token=" +
      encodeURIComponent(accessToken),
  );
  const wabaJson = await wabaRes.json();

  if (!wabaRes.ok || !Array.isArray(wabaJson.data) || !wabaJson.data.length) {
    console.error("No WABA found:", wabaJson);
    return redirectWithStatus("no_waba_found");
  }

  const wabaId = wabaJson.data[0].id as string;

  const phoneRes = await fetch(
    `https://graph.facebook.com/v21.0/${wabaId}/phone_numbers?access_token=${encodeURIComponent(
      accessToken,
    )}`,
  );
  const phoneJson = await phoneRes.json();

  if (!phoneRes.ok || !Array.isArray(phoneJson.data) || !phoneJson.data.length) {
    console.error("No phone numbers found:", phoneJson);
    return redirectWithStatus("no_phone_found");
  }

  const phone = phoneJson.data[0];
  const phoneNumberId = phone.id as string;
  const displayPhoneNumber = phone.display_phone_number as string;
  const phoneE164 = (phone.phone_number as string | undefined) ?? null;

  const { cipher, iv } = encryptToken(accessToken);

  await sql`
    INSERT INTO "ConvoPilot".whatsapp_connections (
      user_id,
      business_id,
      waba_id,
      phone_number_id,
      display_phone_number,
      phone_e164,
      access_token_cipher,
      access_token_iv
    )
    VALUES (
      ${state.user_id},
      ${wabaId},
      ${wabaId},
      ${phoneNumberId},
      ${displayPhoneNumber},
      ${phoneE164},
      ${cipher},
      ${iv}
    )
    ON CONFLICT (phone_number_id) DO UPDATE
      SET user_id             = EXCLUDED.user_id,
          business_id         = EXCLUDED.business_id,
          waba_id             = EXCLUDED.waba_id,
          display_phone_number= EXCLUDED.display_phone_number,
          phone_e164          = EXCLUDED.phone_e164,
          access_token_cipher = EXCLUDED.access_token_cipher,
          access_token_iv     = EXCLUDED.access_token_iv;
  `;

  return redirectWithStatus("success");
} */

function redirectWithStatus(status: string) {
  const url = new URL("/dashboard", BASE_URL);
  url.searchParams.set("meta_status", status);
  return NextResponse.redirect(url.toString());
}
