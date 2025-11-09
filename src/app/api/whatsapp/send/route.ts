import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
// import { decryptToken } from "@/lib/crypto";  // <- EGYELŐRE NE KELLJEN

export async function POST(req: NextRequest) {
  const { phone_number_id, to, text } = await req.json();
  if (!phone_number_id || !to || !text) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const rows = await sql<any>`
    SELECT access_token_cipher, access_token_iv
    FROM "ConvoPilot".whatsapp_connections
    WHERE phone_number_id = ${phone_number_id}
    LIMIT 1
  `;

  if (!rows.length) {
    return NextResponse.json({ error: "No mapping" }, { status: 404 });
  }

  // IDEIGLENES: a token simán plain text-ben van tárolva
  const token: string = rows[0].access_token_cipher;

  // ha szeretnél logot:
  // console.log("Using WA token from DB (first 8 chars):", token.slice(0, 8) + "...");

  const res = await fetch(
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

  const json = await res.json();
  if (!res.ok) {
    console.error("WA send error:", res.status, json);
    return NextResponse.json({ ok: false, error: json }, { status: 500 });
  }

  return NextResponse.json({ ok: true, result: json });
}
