import { NextResponse } from "next/server";
import { insforge } from "@/lib/insforge";

export async function GET() {
  const orderId = "TRX-1780809223671-761";
  const { data: order, error: orderError } = await insforge.database
    .from("orders")
    .select("*, users_profile:buyer_id(*)")
    .eq("id", orderId)
    .single();

  return NextResponse.json({ order, orderError });
}
