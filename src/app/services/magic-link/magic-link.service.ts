import jwt from "jsonwebtoken";

const SECRET = process.env.MAGIC_LINK_SECRET!;

export type MagicLinkPayload = {
  userId: string;
  email: string;
};

export const MagicLinkService = {
  createToken(payload: MagicLinkPayload): string {
    return jwt.sign(payload, SECRET, { expiresIn: "30m" });
  },

  verifyToken(token: string): MagicLinkPayload | null {
    try {
      return jwt.verify(token, SECRET) as MagicLinkPayload;
    } catch {
      return null;
    }
  },
};
