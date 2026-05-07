import { NextResponse } from "next/server";
import { update, nextId } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || "").slice(0, 80);
    const phone = String(body.phone || "").slice(0, 30);
    const subject = String(body.subject || body.email || "").slice(0, 200);
    if (!name || !phone) {
      return NextResponse.json({ ok: false, error: "Eksik alan" }, { status: 400 });
    }
    await update((db) => {
      db.messages.unshift({
        id: nextId(db.messages),
        name,
        phone,
        subject: subject || "(boş)",
        createdAt: new Date().toISOString(),
        read: false,
      });
      return db;
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
