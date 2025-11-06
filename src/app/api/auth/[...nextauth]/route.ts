// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

async function notifyN8N(event: string, payload: any) {
  const url = process.env.N8N_WEBHOOK_URL!; // pl. https://n8n.your.com/webhook/<slug>
  const secret = process.env.N8N_SHARED_SECRET; // opcionális

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(secret ? { "x-n8n-signature": secret } : {}),
    },
    body: JSON.stringify({ event, payload, ts: Date.now() }),
  }).catch(() => {}); 
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  events: {
    async signIn({ user, account, profile }) {
      await notifyN8N("signIn", { user, account, profile });
    },
    async createUser({ user }) {
      await notifyN8N("createUser", { user });
    },
    async linkAccount({ user, account }) {
      await notifyN8N("linkAccount", { user, account });
    },
    async session({ session, token }) {
      await notifyN8N("session", { session, token });
    },
    async signOut({ token }) {
      await notifyN8N("signOut", { token });
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
