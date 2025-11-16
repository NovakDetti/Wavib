import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { decryptToken } from "@/lib/crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const phone_number_id = String(body.phone_number_id || "").trim();
    const to = String(body.to || "").trim();
    const text = String(body.text || "").trim();

    if (!phone_number_id || !to || !text) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    type WhatsappConnectionRow = {
        access_token_cipher: string;
        access_token_iv: string;
    };

    const rows = (await sql`
        SELECT access_token_cipher, access_token_iv
        FROM "ConvoPilot".whatsapp_connections
        WHERE phone_number_id = ${phone_number_id}
        LIMIT 1
    `) as WhatsappConnectionRow[];

    if (!rows.length) {
    return NextResponse.json(
        { error: "No mapping for this phone_number_id" },
        { status: 404 }
    );
    }

    const { access_token_cipher, access_token_iv } = rows[0];

    const accessToken = decryptToken(
    access_token_cipher,
    access_token_iv
    );

    const resWA = await fetch(
      `https://graph.facebook.com/v21.0/${phone_number_id}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
