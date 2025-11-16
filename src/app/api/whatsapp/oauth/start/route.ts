import { NextRequest, NextResponse } from "next/server";

const META_APP_ID = process.env.META_APP_ID!;
const META_REDIRECT_URI = process.env.META_REDIRECT_URI!; 

export async function GET(_req: NextRequest) {
  const state = {
    user_id: "demo-user-id",      
    email: "demo@example.com",    
  };

  const authUrl = new URL("https://www.facebook.com/v21.0/dialog/oauth");
  authUrl.searchParams.set("client_id", META_APP_ID);
  authUrl.searchParams.set("redirect_uri", META_REDIRECT_URI);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set(
    "scope",
    [
      "whatsapp_business_messaging",
      "whatsapp_business_management",
      "business_management",
    ].join(","),
  );
  authUrl.searchParams.set("state", JSON.stringify(state));

  return NextResponse.redirect(authUrl.toString());
}
