"use server";

import { revalidatePath } from "next/cache";
import { update, nextId, type DB } from "@/lib/db";
import { getSession } from "@/lib/auth";

async function requireAdmin() {
  const s = await getSession();
  if (!s) throw new Error("Yetkisiz");
}

const refreshAll = () => {
  revalidatePath("/", "layout");
};

// ─── Settings ────────────────────────────────────────────────────
export async function saveSettings(formData: FormData) {
  await requireAdmin();
  await update((db) => {
    db.settings = {
      ...db.settings,
      siteName: String(formData.get("siteName") ?? db.settings.siteName),
      phone: String(formData.get("phone") ?? db.settings.phone),
      whatsapp: String(formData.get("whatsapp") ?? db.settings.whatsapp),
      email: String(formData.get("email") ?? db.settings.email),
      address: String(formData.get("address") ?? db.settings.address),
      hours: String(formData.get("hours") ?? db.settings.hours),
      insurer: String(formData.get("insurer") ?? db.settings.insurer),
      kvkkEmail: String(formData.get("kvkkEmail") ?? db.settings.kvkkEmail),
      theme: String(formData.get("theme") ?? db.settings.theme),
    };
    return db;
  });
  refreshAll();
}

// ─── Pricing ─────────────────────────────────────────────────────
export async function savePricing(formData: FormData) {
  await requireAdmin();
  const num = (k: string, fallback: number) =>
    Number(formData.get(k)) || fallback;

  await update((db) => {
    const p = db.pricing;
    db.pricing = {
      ...p,
      base: {
        "1+1": num("base_1+1", p.base["1+1"]),
        "2+1": num("base_2+1", p.base["2+1"]),
        "3+1": num("base_3+1", p.base["3+1"]),
        "4+1": num("base_4+1", p.base["4+1"]),
        Villa: num("base_Villa", p.base.Villa),
        Ofis: num("base_Ofis", p.base.Ofis),
      },
      perKm: num("perKm", p.perKm),
      floorSurcharge: num("floorSurcharge", p.floorSurcharge),
      extras: {
        packing: num("ex_packing", p.extras.packing),
        assembly: num("ex_assembly", p.extras.assembly),
        insuranceEk: num("ex_insuranceEk", p.extras.insuranceEk),
        insurancePremium: num("ex_insurancePremium", p.extras.insurancePremium),
        storagePerDay: num("ex_storagePerDay", p.extras.storagePerDay),
      },
      seasonMultipliers: {
        yaz: num("season_yaz", p.seasonMultipliers.yaz),
        bahar: num("season_bahar", p.seasonMultipliers.bahar),
        kis: num("season_kis", p.seasonMultipliers.kis),
      },
    };
    return db;
  });
  refreshAll();
}

// ─── Testimonials ────────────────────────────────────────────────
export async function approveTestimonial(id: number) {
  await requireAdmin();
  await update((db) => {
    db.testimonials = db.testimonials.map((t) =>
      t.id === id ? { ...t, approved: true } : t,
    );
    return db;
  });
  refreshAll();
}

export async function rejectTestimonial(id: number) {
  await requireAdmin();
  await update((db) => {
    db.testimonials = db.testimonials.filter((t) => t.id !== id);
    return db;
  });
  refreshAll();
}

export async function saveTestimonial(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const data = {
    name: String(formData.get("name") || ""),
    route: String(formData.get("route") || ""),
    date: String(formData.get("date") || ""),
    rating: Number(formData.get("rating") || 5),
    text: String(formData.get("text") || ""),
    approved: formData.get("approved") === "on",
  };
  await update((db) => {
    if (id > 0) {
      db.testimonials = db.testimonials.map((t) =>
        t.id === id ? { ...t, ...data } : t,
      );
    } else {
      db.testimonials.push({ id: nextId(db.testimonials), ...data });
    }
    return db;
  });
  refreshAll();
}

// ─── Slides ──────────────────────────────────────────────────────
export async function saveSlide(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const data = {
    image: String(formData.get("image") || ""),
    title: String(formData.get("title") || ""),
    subtitle: String(formData.get("subtitle") || ""),
    ctaText: String(formData.get("ctaText") || ""),
    ctaLink: String(formData.get("ctaLink") || ""),
    order: Number(formData.get("order") || 99),
    active: formData.get("active") === "on",
  };
  await update((db) => {
    if (!db.slides) db.slides = [];
    if (id > 0) {
      db.slides = db.slides.map((s) => (s.id === id ? { ...s, ...data } : s));
    } else {
      db.slides.push({ id: nextId(db.slides), ...data });
    }
    return db;
  });
  refreshAll();
}

export async function deleteSlide(id: number) {
  await requireAdmin();
  await update((db) => {
    if (db.slides) db.slides = db.slides.filter((s) => s.id !== id);
    return db;
  });
  refreshAll();
}

// ─── Services ────────────────────────────────────────────────────
export async function saveService(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const data = {
    title: String(formData.get("title") || ""),
    icon: String(formData.get("icon") || "Home"),
    desc: String(formData.get("desc") || ""),
    active: formData.get("active") === "on",
    order: Number(formData.get("order") || 1),
  };
  await update((db) => {
    if (id > 0) {
      db.services = db.services.map((s) => (s.id === id ? { ...s, ...data } : s));
    } else {
      db.services.push({ id: nextId(db.services), ...data });
    }
    return db;
  });
  refreshAll();
}

export async function deleteService(id: number) {
  await requireAdmin();
  await update((db) => {
    db.services = db.services.filter((s) => s.id !== id);
    return db;
  });
  refreshAll();
}

// ─── FAQs ────────────────────────────────────────────────────────
export async function saveFaq(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const data = {
    q: String(formData.get("q") || ""),
    a: String(formData.get("a") || ""),
    active: formData.get("active") === "on",
  };
  await update((db) => {
    if (id > 0) {
      db.faqs = db.faqs.map((f) => (f.id === id ? { ...f, ...data } : f));
    } else {
      db.faqs.push({ id: nextId(db.faqs), ...data });
    }
    return db;
  });
  refreshAll();
}

export async function deleteFaq(id: number) {
  await requireAdmin();
  await update((db) => {
    db.faqs = db.faqs.filter((f) => f.id !== id);
    return db;
  });
  refreshAll();
}

// ─── Quotes ──────────────────────────────────────────────────────
export async function updateQuoteStatus(id: number, status: string) {
  await requireAdmin();
  await update((db) => {
    db.quotes = db.quotes.map((q) => (q.id === id ? { ...q, status } : q));
    return db;
  });
  refreshAll();
}

export async function deleteQuote(id: number) {
  await requireAdmin();
  await update((db) => {
    db.quotes = db.quotes.filter((q) => q.id !== id);
    return db;
  });
  refreshAll();
}

export async function saveQuote(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const data = {
    customer: String(formData.get("customer") || ""),
    phone: String(formData.get("phone") || ""),
    from: String(formData.get("from") || ""),
    to: String(formData.get("to") || ""),
    homeType: String(formData.get("homeType") || "2+1"),
    date: String(formData.get("date") || ""),
    min: Number(formData.get("min") || 0),
    max: Number(formData.get("max") || 0),
    status: String(formData.get("status") || "beklemede"),
  };
  await update((db) => {
    if (id > 0) {
      db.quotes = db.quotes.map((q) => (q.id === id ? { ...q, ...data } : q));
    } else {
      const newId = nextId(db.quotes);
      db.quotes.push({
        id: newId,
        code: `EŞ-${String(10000 + newId)}`,
        createdAt: new Date().toISOString(),
        ...data,
      });
    }
    return db;
  });
  refreshAll();
}

// ─── Jobs ────────────────────────────────────────────────────────
export async function updateJob(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const data = {
    status: String(formData.get("status") || "atandı"),
    vehicleId: Number(formData.get("vehicleId") || 0),
    driverId: Number(formData.get("driverId") || 0),
  };
  await update((db) => {
    db.jobs = db.jobs.map((j) => (j.id === id ? { ...j, ...data } : j));
    return db;
  });
  refreshAll();
}

// ─── Vehicles ────────────────────────────────────────────────────
export async function saveVehicle(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const data = {
    plate: String(formData.get("plate") || ""),
    type: String(formData.get("type") || ""),
    code: String(formData.get("code") || ""),
    capacity: String(formData.get("capacity") || ""),
    year: Number(formData.get("year") || new Date().getFullYear()),
    lastService: String(formData.get("lastService") || ""),
    status: String(formData.get("status") || "müsait"),
  };
  await update((db) => {
    if (id > 0) {
      db.vehicles = db.vehicles.map((v) => (v.id === id ? { ...v, ...data } : v));
    } else {
      db.vehicles.push({ id: nextId(db.vehicles), ...data });
    }
    return db;
  });
  refreshAll();
}

export async function deleteVehicle(id: number) {
  await requireAdmin();
  await update((db) => {
    db.vehicles = db.vehicles.filter((v) => v.id !== id);
    return db;
  });
  refreshAll();
}

// ─── Drivers ─────────────────────────────────────────────────────
export async function saveDriver(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const data = {
    name: String(formData.get("name") || ""),
    phone: String(formData.get("phone") || ""),
    license: String(formData.get("license") || "B"),
    yearsExp: Number(formData.get("yearsExp") || 0),
    rating: Number(formData.get("rating") || 5.0),
    currentJobId: null as number | null,
  };
  await update((db) => {
    if (id > 0) {
      db.drivers = db.drivers.map((d) => (d.id === id ? { ...d, ...data } : d));
    } else {
      db.drivers.push({ id: nextId(db.drivers), ...data });
    }
    return db;
  });
  refreshAll();
}

export async function deleteDriver(id: number) {
  await requireAdmin();
  await update((db) => {
    db.drivers = db.drivers.filter((d) => d.id !== id);
    return db;
  });
  refreshAll();
}

// ─── Customers ───────────────────────────────────────────────────
export async function saveCustomer(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const tagsRaw = String(formData.get("tags") || "");
  const data = {
    name: String(formData.get("name") || ""),
    phone: String(formData.get("phone") || ""),
    email: String(formData.get("email") || ""),
    moves: Number(formData.get("moves") || 0),
    totalValue: Number(formData.get("totalValue") || 0),
    lastMove: (formData.get("lastMove") as string) || null,
    tags: tagsRaw
      ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
      : [],
  };
  await update((db) => {
    if (id > 0) {
      db.customers = db.customers.map((c) =>
        c.id === id ? { ...c, ...data } : c,
      );
    } else {
      db.customers.push({ id: nextId(db.customers), ...data });
    }
    return db;
  });
  refreshAll();
}

export async function deleteCustomer(id: number) {
  await requireAdmin();
  await update((db) => {
    db.customers = db.customers.filter((c) => c.id !== id);
    return db;
  });
  refreshAll();
}

// ─── Messages ────────────────────────────────────────────────────
export async function markMessageRead(id: number) {
  await requireAdmin();
  await update((db) => {
    db.messages = db.messages.map((m) =>
      m.id === id ? { ...m, read: true } : m,
    );
    return db;
  });
  refreshAll();
}

// ─── Demo reset ──────────────────────────────────────────────────
export async function resetDemo() {
  await requireAdmin();
  const { resetToSeed } = await import("@/lib/db");
  await resetToSeed();
  refreshAll();
}
