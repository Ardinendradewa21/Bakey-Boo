import { NextResponse } from "next/server";
import { insforge } from "@/lib/insforge";

export async function GET() {
  const { data, error } = await insforge.database
    .from("orders")
    .insert({
      id: "TRX-TEST-1234",
      buyer_id: "00000000-0000-0000-0000-000000000000",
      total_price: 10000,
      status: "pending",
    })
    .select();

  return NextResponse.json({ data, error });
}
