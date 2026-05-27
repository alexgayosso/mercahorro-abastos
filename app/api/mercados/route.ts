// ============================================================
// app/api/mercados/route.ts — API endpoint para el dropdown
// ============================================================
import { NextResponse } from "next/server";
import { getMercados } from "@/lib/sanity.queries";

export const revalidate = 300; // refresca cada 5 minutos

export async function GET() {
  try {
    const mercados = await getMercados();
    return NextResponse.json(mercados);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
