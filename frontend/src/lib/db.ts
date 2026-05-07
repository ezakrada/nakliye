import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "db.json");
const SEED_PATH = path.join(process.cwd(), "data", "seed.json");

export type DB = {
  session: { version: number; lastReset: string };
  settings: Record<string, string>;
  users: Array<{
    id: number;
    name: string;
    email: string;
    role: string;
    password: string;
  }>;
  quotes: Array<{
    id: number;
    code: string;
    customer: string;
    phone: string;
    from: string;
    to: string;
    homeType: string;
    date: string;
    min: number;
    max: number;
    status: string;
    createdAt: string;
  }>;
  jobs: Array<{
    id: number;
    code: string;
    customer: string;
    route: string;
    date: string;
    vehicleId: number;
    driverId: number;
    status: string;
    value: number;
  }>;
  vehicles: Array<{
    id: number;
    plate: string;
    type: string;
    code: string;
    capacity: string;
    year: number;
    lastService: string;
    status: string;
  }>;
  drivers: Array<{
    id: number;
    name: string;
    phone: string;
    license: string;
    yearsExp: number;
    currentJobId: number | null;
    rating: number;
  }>;
  customers: Array<{
    id: number;
    name: string;
    phone: string;
    email: string;
    moves: number;
    totalValue: number;
    lastMove: string | null;
    tags: string[];
  }>;
  pricing: {
    base: Record<string, number>;
    perKm: number;
    floorSurcharge: number;
    extras: Record<string, number>;
    seasonMultipliers: Record<string, number>;
  };
  services: Array<{
    id: number;
    title: string;
    icon: string;
    desc: string;
    active: boolean;
    order: number;
  }>;
  faqs: Array<{ id: number; q: string; a: string; active: boolean }>;
  testimonials: Array<{
    id: number;
    name: string;
    route: string;
    date: string;
    rating: number;
    text: string;
    approved: boolean;
  }>;
  messages: Array<{
    id: number;
    name: string;
    phone: string;
    subject: string;
    createdAt: string;
    read: boolean;
  }>;
  slides?: Array<{
    id: number;
    image: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    order: number;
    active: boolean;
  }>;
};

async function ensure(): Promise<void> {
  try {
    await fs.access(DB_PATH);
  } catch {
    const seed = await fs.readFile(SEED_PATH, "utf-8");
    await fs.writeFile(DB_PATH, seed, "utf-8");
  }
}

export async function readDb(): Promise<DB> {
  await ensure();
  const raw = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

export async function writeDb(data: DB): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function update(fn: (db: DB) => DB | Promise<DB>): Promise<DB> {
  const db = await readDb();
  const next = await fn(db);
  await writeDb(next);
  return next;
}

export async function resetToSeed(): Promise<void> {
  const seed = await fs.readFile(SEED_PATH, "utf-8");
  await fs.writeFile(DB_PATH, seed, "utf-8");
}

export function nextId<T extends { id: number }>(arr: T[]): number {
  return arr.length === 0 ? 1 : Math.max(...arr.map((a) => a.id)) + 1;
}
