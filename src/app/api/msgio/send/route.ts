export async function POST(req: Request) {
  const { phone, text } = await req.json();
  const body = {
    recipients: [{ phone: String(phone).replace(/\D/g,'').replace(/^00/, '') }],
    channels: ["viber"],
    viber: {
      from: process.env.MSGIO_VIBER_FROM!,
      label: "promotion",
      content: [{ type: "text", text: text || "Szia! Vercel API-ból 🚀" }]
    }
  };
  const res = await fetch("https://api.messaggio.com/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Messaggio-Login": process.env.MSGIO_LOGIN!,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    return new Response(JSON.stringify({ ok:false, status:res.status, err }), { status: 500 });
  }
  return new Response(JSON.stringify({ ok:true, data: await res.json() }), { status: 200 });
}
