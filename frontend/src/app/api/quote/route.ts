import { NextResponse } from "next/server";
import { update, nextId } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const homeType = String(body.homeType || "2+1");
    const itemCount = Number(body.itemCount || 0);
    const packing = !!body.packing;
    const assembly = !!body.assembly;
    const insurance = String(body.insurance || "standart");
    const storage = Number(body.storage || 0);

    let resultCode = "";
    let resultMin = 0;
    let resultMax = 0;

    await update((db) => {
      const p = db.pricing;
      const base = p.base[homeType] ?? 7500;
      const ins =
        insurance === "premium"
          ? p.extras.insurancePremium
          : insurance === "ek"
            ? p.extras.insuranceEk
            : 0;
      const extras =
        (packing ? p.extras.packing : 0) +
        (assembly ? p.extras.assembly : 0) +
        ins +
        storage * p.extras.storagePerDay;
      const total = base + itemCount * 120 + extras;
      resultMin = Math.floor(total * 0.92);
      resultMax = Math.floor(total * 1.08);

      const newId = nextId(db.quotes);
      resultCode = `EŞ-${String(10000 + newId)}`;
      db.quotes.push({
        id: newId,
        code: resultCode,
        customer: String(body.fullName || "Anonim"),
        phone: String(body.phone || ""),
        from: `${body.fromDistrict || ""}${body.fromDistrict ? ", " : ""}${body.fromCity || ""}`.trim(),
        to: `${body.toDistrict || ""}${body.toDistrict ? ", " : ""}${body.toCity || ""}`.trim(),
        homeType,
        date: String(body.date || ""),
        min: resultMin,
        max: resultMax,
        status: "beklemede",
        createdAt: new Date().toISOString(),
      });
      return db;
    });

    return NextResponse.json({
      ok: true,
      code: resultCode,
      min: resultMin,
      max: resultMax,
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
