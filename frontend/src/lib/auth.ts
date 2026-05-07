import { cookies } from "next/headers";
import { readDb } from "./db";

const SESSION_KEY = "esyam_admin";

export async function getSession(): Promise<{ userId: number; email: string; name: string } | null> {
  const c = await cookies();
  const raw = c.get(SESSION_KEY)?.value;
  if (!raw) return null;
  try {
    const data = JSON.parse(Buffer.from(raw, "base64").toString("utf-8"));
    if (!data.userId) return null;
    return data;
  } catch {
    return null;
  }
}

export async function setSession(payload: { userId: number; email: string; name: string }) {
  const c = await cookies();
  c.set(SESSION_KEY, Buffer.from(JSON.stringify(payload)).toString("base64"), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearSession() {
  const c = await cookies();
  c.delete(SESSION_KEY);
}

export async function checkLogin(email: string, password: string) {
  const db = await readDb();
  const user = db.users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
  );
  if (!user) return null;
  return { userId: user.id, email: user.email, name: user.name };
}
