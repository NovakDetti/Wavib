import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { encryptToken } from "@/lib/crypto";

const META_CLIENT_ID = process.env.META_CLIENT_ID!;
const META_CLIENT_SECRET = process.env.META_CLIENT_SECRET!;
const META_REDIRECT_URI = process.env.META_REDIRECT_URI!;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const error = url.searchParams.get("error");
  const code = url.searchParams.get("code");
  const stateRaw = url.searchParams.get("state");

  if (error) {
    console.warn("Meta OAuth error:", error);
    return redirectWithMessage("oauth_error");
  }

  if (!code || !stateRaw) {
    return redirectWithMessage("missing_code_or_state");
  }

  let state: { user_id: string; email: string };

  try {
    state = JSON.parse(stateRaw);
  } catch (e) {
    console.error("Invalid state JSON", e);
    return redirectWithMessage("invalid_state");
  }

  const tokenUrl = new URL("https://graph.facebook.com/v21.0/oauth/access_token");
  tokenUrl.searchParams.set("client_id", META_CLIENT_ID);
  tokenUrl.searchParams.set("client_secret", META_CLIENT_SECRET);
  tokenUrl.searchParams.set("redirect_uri", META_REDIRECT_URI);
  tokenUrl.searchParams.set("code", code);

  const tokenRes = await fetch(tokenUrl.toString(), {
    method: "GET",
  });

  const tokenJson = await tokenRes.json();
  if (!tokenRes.ok) {
    console.error("Meta short-lived token error:", tokenJson);
    return redirectWithMessage("token_exchange_failed");
  }

  const shortLivedToken = tokenJson.access_token as string;
  const longUrl = new URL("https://graph.facebook.com/v21.0/oauth/access_token");
  longUrl.searchParams.set("grant_type", "fb_exchange_token");
  longUrl.searchParams.set("client_id", META_CLIENT_ID);
  longUrl.searchParams.set("client_secret", META_CLIENT_SECRET);
  longUrl.searchParams.set("fb_exchange_token", shortLivedToken);

  const longRes = await fetch(longUrl.toString(), { method: "GET" });
  const longJson = await longRes.json();

  const accessToken = (longRes.ok && longJson.access_token) || shortLivedToken;

  const wabaRes = await fetch(
    "https://graph.facebook.com/v21.0/me/whatsapp_business_accounts?access_token=" +
      encodeURIComponent(accessToken),
  );
  const wabaJson = await wabaRes.json();

  if (!wabaRes.ok || !Array.isArray(wabaJson.data) || !wabaJson.data.length) {
    console.error("No WABA found:", wabaJson);
    return redirectWithMessage("no_waba_found");
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
    return redirectWithMessage("no_phone_found");
  }

  const phone = phoneJson.data[0];
  const phoneNumberId = phone.id as string;
  const displayPhoneNumber = phone.display_phone_number as string;
  const phoneE164 = phone.verified_name ?? null; 

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
      ${wabaId},           -- ide rakhatod business_id-t, ha külön endpointtal kéred le
      ${wabaId},
      ${phoneNumberId},
      ${displayPhoneNumber},
      ${phoneE164},
      ${cipher},
      ${iv}
    )
    ON CONFLICT (phone_number_id) DO UPDATE
      SET user_id = EXCLUDED.user_id,
          business_id = EXCLUDED.business_id,
          waba_id = EXCLUDED.waba_id,
          display_phone_number = EXCLUDED.display_phone_number,
          phone_e164 = EXCLUDED.phone_e164,
          access_token_cipher = EXCLUDED.access_token_cipher,
          access_token_iv = EXCLUDED.access_token_iv;
  `;

  return redirectWithMessage("success");
}

function redirectWithMessage(status: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL!;
  const url = new URL("/dashboard", base);
  url.searchParams.set("meta_status", status);
  return NextResponse.redirect(url.toString());
}
