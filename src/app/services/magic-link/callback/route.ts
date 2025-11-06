import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const G = "https://graph.facebook.com/v19.0";

async function gget(path: string, params: Record<string, string>) {
  const url = new URL(`${G}${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const r = await fetch(url.toString(), { cache: "no-store" });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
async function gpost(path: string, accessToken: string, body: Record<string, any> = {}) {
  const r = await fetch(`${G}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, access_token: accessToken }),
    cache: "no-store",
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  if (!code || !state) return new NextResponse("Missing params", { status: 400 });

  try {
    const { userId, email } = jwt.verify(state, process.env.JWT_SECRET!) as any;

    const t1 = await gget("/oauth/access_token", {
      client_id: process.env.META_APP_ID!,
      redirect_uri: process.env.META_REDIRECT_URI!,
      client_secret: process.env.META_APP_SECRET!,
      code,
    });
    let accessToken: string = t1.access_token;

    const t2 = await gget("/oauth/access_token", {
      grant_type: "fb_exchange_token",
      client_id: process.env.META_APP_ID!,
      client_secret: process.env.META_APP_SECRET!,
      fb_exchange_token: accessToken,
    });
    accessToken = t2.access_token;

    const me = await gget("/me", { fields: "businesses{id,name}", access_token: accessToken });
    const businessId = me?.businesses?.data?.[0]?.id;
    if (!businessId) throw new Error("No business found");

    const wabas = await gget(`/${businessId}/owned_whatsapp_business_accounts`, {
      fields: "id,name",
      access_token: accessToken,
    });
    const wabaId = wabas?.data?.[0]?.id;
    if (!wabaId) throw new Error("No WABA found");

    const phones = await gget(`/${wabaId}/phone_numbers`, { access_token: accessToken });
    const phone = phones?.data?.[0];
    if (!phone?.id) throw new Error("No phone_number_id found");
    const phoneNumberId = phone.id as string;

    await gpost(`/${phoneNumberId}/subscribed_apps`, accessToken);

    // await saveConnection({ userId, email, wabaId, phoneNumberId, accessToken });

    const ui = `${process.env.APP_URL}/connect/success?phone=${encodeURIComponent(phone.display_phone_number ?? "")}`;
    return NextResponse.redirect(ui);
  } catch (e: any) {
    return new NextResponse(e?.message ?? "OAuth callback error", { status: 500 });
  }
}
