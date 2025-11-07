import crypto from "crypto";
const KEY = Buffer.from(process.env.TOKEN_ENC_KEY!, "hex");

export function encryptToken(token: string) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv("aes-256-gcm", KEY, iv);
  const enc = Buffer.concat([c.update(token, "utf8"), c.final()]);
  const tag = c.getAuthTag();
  return { cipher: Buffer.concat([enc, tag]), iv };
}

export function decryptToken(cipher: Buffer, iv: Buffer) {
  const tag = cipher.subarray(cipher.length - 16);
  const data = cipher.subarray(0, cipher.length - 16);
  const d = crypto.createDecipheriv("aes-256-gcm", KEY, iv);
  d.setAuthTag(tag);
  return Buffer.concat([d.update(data), d.final()]).toString("utf8");
}
