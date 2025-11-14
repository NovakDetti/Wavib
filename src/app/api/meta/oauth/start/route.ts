import { NextRequest, NextResponse } from "next/server";

const META_APP_ID = process.env.META_APP_ID!;
const META_CONFIG_ID = process.env.META_WH_CONFIG_ID!;
const META_REDIRECT_URI = process.env.META_REDIRECT_URI!;

export async function GET(req: NextRequest) {
  const state = JSON.stringify({ from: "connect_page" });

  const params = new URLSearchParams({
    client_id: META_APP_ID,
    redirect_uri: META_REDIRECT_URI,
    response_type: "code",
    scope:
      "whatsapp_business_management,whatsapp_business_messaging,business_management",
    config_id: META_CONFIG_ID,
    state,
  });

  const url = `https://www.facebook.com/v21.0/dialog/oauth?${params.toString()}`;
  console.log("Redirecting to Meta OAuth:", url);

  return NextResponse.redirect(url);
}
