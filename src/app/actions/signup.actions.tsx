"use server";

type Payload = { name: string; email: string; password: string };

export async function registerUser(payload: Payload) {
  return { ok: true as const };
}
