import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const change = data?.entry?.[0]?.changes?.[0];
    const field = change?.field;
    const value = change?.value;
    const msg = value?.messages?.[0];
    const meta = value?.metadata;

    if (field !== "messages") {
      return NextResponse.json({ ok: true, ignored: "non-messages" });
    }

    const text = msg?.text?.body?.trim();
    if (!text) {
      console.warn("⚠️ Ignored: empty or non-text message");
      return NextResponse.json({ ok: true, ignored: "no-text" });
    }

    const businessDigits = meta?.display_phone_number?.replace(/\D/g, "");
    if (msg?.from === businessDigits) {
      console.warn("🔁 Ignored echo/self message from business number");
      return NextResponse.json({ ok: true, ignored: "echo" });
    }

    const n8nUrl = `${process.env.N8N_BASE_URL}${process.env.N8N_WHATSAPP_INBOUND_WEBHOOK}`;
    const fwd = await fetch(n8nUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        _meta: {
          receivedAt: new Date().toISOString(),
          forwardedFrom: "nextjs-webhook",
          webhookId: process.env.VERCEL_URL || "local-dev",
        },
      }),
    });

    if (!fwd.ok) {
      const errText = await fwd.text();
      console.error("❌ Failed to forward to n8n:", fwd.status, errText);
      return NextResponse.json({ error: "Failed to forward to n8n" }, { status: 502 });
    }

    console.log("✅ Forwarded successfully to n8n:", fwd.status);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("⚠️ Webhook error:", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}