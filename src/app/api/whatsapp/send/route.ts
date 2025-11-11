import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const phone_number_id = String(body.phone_number_id || "").trim();
    const to = String(body.to || "").trim();
    const text = String(body.text || "").trim();

    if (!phone_number_id || !to || !text) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const rows = await sql<any>`
      SELECT access_token_cipher
      FROM "ConvoPilot".whatsapp_connections
      WHERE phone_number_id = ${phone_number_id}
      LIMIT 1
    `;

    if (!rows.length) {
      return NextResponse.json({ error: "No mapping" }, { status: 404 });
    }

    const token = rows[0].access_token_cipher as string;

    const resWA = await fetch(
      `https://graph.facebook.com/v21.0/${phone_number_id}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: { body: text },
        }),
      }
    );

    const json = await resWA.json();

    if (!resWA.ok) {
      console.error("WA send error:", resWA.status, json);
      return NextResponse.json({ ok: false, error: json }, { status: 502 });
    }

    return NextResponse.json({ ok: true, result: json });
  } catch (err) {
    console.error("Send API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
