import { NextRequest, NextResponse } from "next/server";
import { MagicLinkService } from "@/app/services/magic-link/magic-link.service";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }
    
    const payload = await MagicLinkService.verifyToken(token);

    if (!payload?.userId || !payload?.email) {
      return NextResponse.json({ error: "Invalid token payload" }, { status: 400 });
    }

    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/services/meta/callback`;

    const state = JSON.stringify({
      user_id: payload.userId,
      email: payload.email,
      magic_token: token,
    });

    const metaAuthUrl = new URL("https://www.facebook.com/v21.0/dialog/oauth");
    metaAuthUrl.searchParams.set("client_id", process.env.META_APP_ID!);
    metaAuthUrl.searchParams.set("redirect_uri", redirectUri);
    metaAuthUrl.searchParams.set(
      "scope",
      "whatsapp_business_messaging,whatsapp_business_management"
    );
    metaAuthUrl.searchParams.set("response_type", "code");
    metaAuthUrl.searchParams.set("state", state);

    return NextResponse.redirect(metaAuthUrl.toString());
  } catch (err) {
    console.error("Magic-link start error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
