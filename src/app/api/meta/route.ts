import { NextRequest, NextResponse } from "next/server";

// VERIFY WEBHOOK (GET)
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  // env változóból ellenőrizzük a verify token-t
  const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN;

  if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified successfully!");
    return new NextResponse(challenge, { status: 200 });
  }

  console.warn("❌ Webhook verification failed.");
  return new NextResponse("Forbidden", { status: 403 });
}

// HANDLE INCOMING MESSAGES (POST)
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("📩 Incoming webhook:", JSON.stringify(data, null, 2));

    // itt lehet továbbküldeni az n8n webhookra:
    await fetch(`${process.env.N8N_BASE_URL}${process.env.N8N_WHATSAPP_INBOUND_WEBHOOK}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
