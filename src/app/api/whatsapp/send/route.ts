import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { decryptToken } from "@/lib/crypto";

export async function POST(req: NextRequest) {
  const { phone_number_id, to, text } = await req.json();

  const phoneId = String(phone_number_id || "").trim(); // <-- fontos
  const toClean = String(to || "").trim();

  if (!phoneId || !toClean || !text) {
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

// For now: token is stored in plaintext
const token = rows[0].access_token_cipher as string;


  const res = await fetch(
    `https://graph.facebook.com/v21.0/${phoneId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: toClean,
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
