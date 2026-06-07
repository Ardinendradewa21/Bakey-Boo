import { NextResponse } from "next/server";
import { insforge } from "@/lib/insforge";

export async function GET() {
  const { error: pErr } = await insforge.database.from("products").insert({
    id: "e5aa9a8b-c8c7-43c3-b4e6-d98394a5049a", // fixed uuid to test
    title: "Test",
    slug: "test-123",
    description: "test",
    price: 35000,
    category: "aneka-roti",
    is_published: true,
    view_count: 12,
    delivery_method: "delivery",
  });

  return NextResponse.json({ error: pErr });
}
