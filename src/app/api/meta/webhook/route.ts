import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs"; // ne fusson edge-en, mert fetch -> n8n Cloud

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("📩 Incoming webhook:", JSON.stringify(data, null, 2));

    // 1️⃣ Validáció és alap adatok kinyerése
    const change = data?.entry?.[0]?.changes?.[0];
    const field  = change?.field;
    const value  = change?.value;
    const msg    = value?.messages?.[0];
    const meta   = value?.metadata;

    if (field !== "messages") {
      return NextResponse.json({ ok: true, ignored: "non-messages" });
    }

    // 2️⃣ Üzenet tartalom ellenőrzés
    const text = msg?.text?.body?.trim();
    if (!text) {
      console.warn("⚠️ Ignored: empty or non-text message");
      return NextResponse.json({ ok: true, ignored: "no-text" });
    }

    // 3️⃣ Loop-védelem (ha a saját business számodról jön)
    const businessDigits = meta?.display_phone_number?.replace(/\D/g, "");
    if (msg?.from === businessDigits) {
      console.warn("🔁 Ignored echo/self message from business number");
      return NextResponse.json({ ok: true, ignored: "echo" });
    }

    // 4️⃣ Production forward az n8n felé (multi-tenant kompatibilis)
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

    // 5️⃣ Naplózás / hiba kezelése
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
