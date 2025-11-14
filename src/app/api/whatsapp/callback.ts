import type { NextApiRequest, NextApiResponse } from 'next';
import { encryptToken } from '@/lib/crypto';
import { db } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state } = req.query;
  if (typeof code !== 'string') {
    return res.status(400).json({ error: 'Missing code' });
  }

  const tokenRes = await fetch(
    `https://graph.facebook.com/v21.0/oauth/access_token?` +
      `client_id=${process.env.NEXT_PUBLIC_META_APP_ID}&` +
      `client_secret=${process.env.META_APP_SECRET}&` +
      `redirect_uri=${encodeURIComponent(process.env.WH_CALLBACK_URL!)}&` +
      `code=${code}`
  );
  const tokenJson = await tokenRes.json();
  if (!tokenJson.access_token) {
    return res.status(500).json({ error: 'Token exchange failed', details: tokenJson });
  }
  const accessToken = tokenJson.access_token as string;

  const meRes = await fetch(
    `https://graph.facebook.com/v21.0/me?fields=id,name,business&access_token=${accessToken}`
  );
  const meJson = await meRes.json();
  const accountsRes = await fetch(
    `https://graph.facebook.com/v21.0/${meJson.id}/whatsapp_business_accounts?access_token=${accessToken}`
  );
  const accountsJson = await accountsRes.json();
  const wabaId = accountsJson.data[0].id as string;

  const phoneRes = await fetch(
    `https://graph.facebook.com/v21.0/${wabaId}/phone_numbers?access_token=${accessToken}`
  );
  const phoneJson = await phoneRes.json();
  const phoneNumberId = phoneJson.data[0].id as string;

  const { cipher, iv, tag } = encryptToken(accessToken);

  await db.client.update({
    where: { id: req.session.user.id },
    data: {
      whatsapp_waba_id: wabaId,
      whatsapp_phone_number_id: phoneNumberId,
      whatsapp_access_token_cipher: cipher,
      whatsapp_access_token_iv: iv,
      whatsapp_access_token_tag: tag,
      whatsapp_connected_at: new Date(),
    },
  });

  await fetch(
    `https://graph.facebook.com/v21.0/${wabaId}/subscribed_apps`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ access_token: accessToken }),
    }
  );

  return res.redirect('/integrations/wizard/step3');
}
