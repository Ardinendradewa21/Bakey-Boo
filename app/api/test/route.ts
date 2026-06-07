import { NextResponse } from "next/server";
import { insforge } from "@/lib/insforge";

export async function GET() {
  const { data, error } = await insforge.database
    .from("products")
    .select(`
      *,
      images:product_images(id, url, sort_order),
      reviews(id, rating, comment, created_at)
    `)
    .eq("slug", "roti-sobek-premium")
    .single();

  return NextResponse.json({ data, error });
}
