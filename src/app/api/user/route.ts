import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Missing email" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.N8N_GET_USER_URL;
    if (!baseUrl) {
      console.error("N8N_GET_USER_URL is not set");
      return NextResponse.json(
        { success: false, message: "Server misconfigured" },
        { status: 500 }
      );
    }


    const n8nRes = await fetch(
      `${baseUrl}?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // ha kell API key:
          // "x-api-key": process.env.N8N_API_KEY!,
        },
        cache: "no-store",
      }
    );

    const data = await n8nRes.json().catch(() => null);

    return NextResponse.json(data ?? { success: false }, {
      status: n8nRes.status,
    });
  } catch (err) {
    console.error("Error in /api/user:", err);
    return NextResponse.json(
      { success: false, message: "Unexpected error" },
      { status: 500 }
    );
  }
}
