import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("📩 Incoming webhook:", JSON.stringify(data, null, 2));

    const change = data?.entry?.[0]?.changes?.[0];
    const field = change?.field; 
    const msg   = change?.value?.messages?.[0];

    if (field !== "messages") {
      return NextResponse.json({ ok: true, ignored: "non-messages" });
    }

    const text = msg?.text?.body;
    if (!text || !text.trim()) {
      return NextResponse.json({ ok: true, ignored: "no-text" });
    }

    const businessDisplay = change?.value?.metadata?.display_phone_number; 
    const businessDigits  = businessDisplay?.replace(/\D/g, "");
    if (msg?.from === businessDigits) {
      return NextResponse.json({ ok: true, ignored: "echo" });
    }


    const n8nUrl = `${process.env.N8N_BASE_URL}${process.env.N8N_WHATSAPP_INBOUND_WEBHOOK}`;
    const fwd = await fetch(n8nUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!fwd.ok) {
      console.error("❌ Failed to forward to n8n:", fwd.status, await fwd.text());
      return NextResponse.json({ error: "Failed to forward to n8n" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("⚠️ Webhook error:", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
