import { readDb } from "./db";

export type SiteConfig = {
  name: string;
  legal: string;
  tagline: string;
  domain: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappLink: string;
  email: string;
  address: string;
  hours: string;
  founded: number;
  insurer: string;
  kvkkEmail: string;
  buyUrl: string;
  social: { instagram: string };
  trust: {
    moveCount: number;
    cityCount: number;
    fleetCount: number;
    teamCount: number;
    onTimePct: number;
    licenses: string[];
  };
  nav: ReadonlyArray<{ href: string; label: string }>;
};

const NAV = [
  { href: "/hizmetler", label: "Hizmetlerimiz" },
  { href: "/filomuz", label: "Filomuz" },
  { href: "/yorumlar", label: "Müşterilerimiz" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/sss", label: "Sıkça Sorulan" },
  { href: "/iletisim", label: "İletişim" },
] as const;

function digits(s: string) {
  return s.replace(/[^0-9+]/g, "");
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const db = await readDb();
  const s = db.settings;
  const phoneRaw = digits(s.whatsapp || s.phone || "+905351045443");
  const waNumber = digits(s.whatsapp || phoneRaw).replace(/^\+?/, "");
  return {
    name: "Eşyam",
    legal: s.siteName || "Eşyam Nakliyat",
    tagline: "Eşyanız bizimle yolculuk eder.",
    domain: "nakliye.demolion.cloud",
    phone: s.phone || "+90 535 104 54 43",
    phoneRaw,
    whatsapp: s.whatsapp || phoneRaw,
    whatsappLink: `https://wa.me/${waNumber}?text=Merhaba%2C%20ev%20ta%C5%9F%C4%B1ma%20i%C3%A7in%20teklif%20almak%20istiyorum`,
    email: s.email || "merhaba@esyam.com.tr",
    address: s.address || "İstanbul · Anadolu Yakası Operasyon Merkezi",
    hours: s.hours || "Hafta içi 08:00 — 20:00 · Cumartesi 09:00 — 18:00",
    founded: 2013,
    insurer: s.insurer || "Anadolu Sigorta",
    kvkkEmail: s.kvkkEmail || "kvkk@esyam.com.tr",
    buyUrl: "https://ezar.tr/pay.php?product=21",
    social: { instagram: "https://instagram.com/esyam.nakliyat" },
    trust: {
      moveCount: 14000,
      cityCount: 41,
      fleetCount: db.vehicles.length || 28,
      teamCount: 64,
      onTimePct: 98,
      licenses: ["TOBB Üye", "K1 Yetki Belgesi", "Ulaşım Servisleri Birliği"],
    },
    nav: NAV,
  };
}

export async function getActiveSlides() {
  const db = await readDb();
  const slides = db.slides ?? [];
  return slides.filter((s) => s.active).sort((a, b) => a.order - b.order);
}

export async function getActiveServices() {
  const db = await readDb();
  return db.services.filter((s) => s.active).sort((a, b) => a.order - b.order);
}

export async function getActiveFaqs() {
  const db = await readDb();
  return db.faqs.filter((f) => f.active);
}

export async function getApprovedTestimonials() {
  const db = await readDb();
  return db.testimonials.filter((t) => t.approved);
}

export async function getPricing() {
  const db = await readDb();
  return db.pricing;
}
