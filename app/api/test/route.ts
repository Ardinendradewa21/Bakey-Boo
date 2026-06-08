import { NextResponse } from "next/server";
import { insforge } from "@/lib/insforge";

export async function GET() {
  const { data, error } = await insforge.database
    .from("reviews")
    .select("*")
    .limit(1);
    
  return NextResponse.json({ data, error });
}
