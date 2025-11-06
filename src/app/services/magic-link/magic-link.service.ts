import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const N8N_URL = `${process.env.N8N_BASE_URL}${process.env.N8N_SEND_MAGIC_LINK_WEBHOOK}`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { email, userId } = req.body ?? {};
    if (typeof email !== "string" || typeof userId !== "string") {
      return res.status(400).json({ error: "email and userId required" });
    }

    const token = jwt.sign({ email, userId }, process.env.JWT_SECRET!, { expiresIn: "15m" });
    const link = `${process.env.APP_URL}/api/connect/start?token=${encodeURIComponent(token)}`;

    const r = await fetch(N8N_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, link }),
    });

    if (!r.ok) {
      const text = await r.text().catch(() => "");
      return res.status(502).json({ error: "n8n webhook error", details: text });
    }

    return res.status(200).json({ ok: true });
  } catch (e: any) {
    return res.status(500).json({ error: e.message ?? "Internal error" });
  }
}
