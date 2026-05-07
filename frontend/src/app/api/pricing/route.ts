import { NextResponse } from "next/server";
import { getPricing } from "@/lib/site-server";

export async function GET() {
  const pricing = await getPricing();
  return NextResponse.json(pricing);
}
