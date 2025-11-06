import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  if (!token) return new NextResponse("Missing token", { status: 400 });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { email: string; userId: string };
    const state = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "20m" });

    const params = new URLSearchParams({
      client_id: process.env.META_APP_ID!,
      redirect_uri: process.env.META_REDIRECT_URI!,
      scope: "whatsapp_business_management,whatsapp_business_messaging",
      response_type: "code",
      state,
    });

    const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`;
    return NextResponse.redirect(authUrl);
  } catch {
    return new NextResponse("Invalid or expired token", { status: 400 });
  }
}
