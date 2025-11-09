import crypto from "crypto";

const SECRET = process.env.TOKEN_ENCRYPTION_SECRET!; 

const KEY = crypto.createHash("sha256").update(SECRET).digest(); 

export function encryptToken(plain: string) {
  const iv = crypto.randomBytes(12); 
  const cipher = crypto.createCipheriv("aes-256-gcm", KEY, iv);
  const encrypted = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    cipher: Buffer.concat([encrypted, tag]).toString("base64"),
    iv: iv.toString("base64"),
  };
}

export function decryptToken(cipherText: string, ivBase64: string) {
  const buf = Buffer.from(cipherText, "base64");
  const iv = Buffer.from(ivBase64, "base64");
  const tag = buf.subarray(buf.length - 16);
  const data = buf.subarray(0, buf.length - 16);

  const decipher = crypto.createDecipheriv("aes-256-gcm", KEY, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
  return decrypted.toString("utf8");
}
