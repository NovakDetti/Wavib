import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;
  if (!token || typeof token !== "string") return res.status(400).send("Missing token");

  try {
    // a magic linkben kapott rövid életű token ellenőrzése
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { email: string; userId: string };

    // új, rövid életű STATE (amit a Meta visszaküld a callbacknek)
    const state = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "20m" });

    const params = new URLSearchParams({
      client_id: process.env.META_APP_ID!,
      redirect_uri: process.env.META_REDIRECT_URI!,
      scope: "whatsapp_business_management,whatsapp_business_messaging",
      response_type: "code",
      state,
    });

    const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`;
    return res.redirect(authUrl);
  } catch {
    return res.status(400).send("Invalid or expired token");
  }
}
