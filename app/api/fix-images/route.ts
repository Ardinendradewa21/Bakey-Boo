import { NextResponse } from "next/server";
import { insforge } from "@/lib/insforge";

export async function GET() {
  const fixes = [
    {
      broken: "https://images.unsplash.com/photo-1601000854407-3d1911be2bdf?w=800&auto=format&fit=crop",
      fixed: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop"
    },
    {
      broken: "https://images.unsplash.com/photo-1627308595229-7830f5c92811?w=800&auto=format&fit=crop",
      fixed: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&auto=format&fit=crop"
    }
  ];

  const results = [];

  for (const item of fixes) {
    const { error } = await insforge.database
      .from("product_images")
      .update({ url: item.fixed })
      .eq("url", item.broken);
    
    if (error) {
      results.push({ broken: item.broken, status: "error", message: error.message });
    } else {
      results.push({ broken: item.broken, status: "fixed" });
    }
  }

  return NextResponse.json({ results });
}
