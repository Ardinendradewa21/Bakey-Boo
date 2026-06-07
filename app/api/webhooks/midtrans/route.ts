import { NextResponse } from "next/server";
import { insforge } from "@/lib/insforge";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
      payment_type
    } = body;

    // Verify signature
    const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
    const hash = crypto
      .createHash("sha512")
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest("hex");

    if (hash !== signature_key) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    // Determine order status
    let orderStatus = "pending";
    
    if (transaction_status == "capture") {
      if (fraud_status == "challenge") {
        orderStatus = "pending"; // Need manual review
      } else if (fraud_status == "accept") {
        orderStatus = "completed";
      }
    } else if (transaction_status == "settlement") {
      orderStatus = "completed";
    } else if (
      transaction_status == "cancel" ||
      transaction_status == "deny" ||
      transaction_status == "expire"
    ) {
      orderStatus = "failed";
    } else if (transaction_status == "pending") {
      orderStatus = "pending";
    }

    // Update order status in DB
    try {
      await insforge.database
        .from("orders")
        .update({ status: orderStatus })
        .eq("id", order_id);

      // Update payment record
      await insforge.database
        .from("payments")
        .update({
          status: transaction_status,
          payment_method: payment_type,
          midtrans_response: JSON.stringify(body)
        })
        .eq("order_id", order_id);

      // Jika pembayaran berhasil (completed), kirim email produk digital
      if (orderStatus === "completed") {
        try {
          // 1. Ambil data Order (untuk email pembeli)
          const { data: order } = await insforge.database
            .from("orders")
            .select("total_price, buyer_email")
            .eq("id", order_id)
            .single();

          if (order && order.buyer_email) {
            // 2. Ambil data Item & Produk & File
            const { data: items } = await insforge.database
              .from("order_items")
              .select("price, quantity, product:products(id, title, files:product_files(file_url))")
              .eq("order_id", order_id);

            if (items && items.length > 0) {
              // 3. Kirim Email
              const { sendOrderReceiptEmail } = await import("@/lib/email");
              await sendOrderReceiptEmail(
                {
                  orderId: order_id,
                  totalPrice: order.total_price,
                  buyerEmail: order.buyer_email,
                },
                items as any
              );
              console.log(`Email berhasil dikirim ke ${order.buyer_email} untuk order ${order_id}`);
            }
          } else {
            console.warn(`Gagal kirim email: buyer_email tidak ditemukan untuk order ${order_id}`);
          }
        } catch (emailError) {
          console.error("Gagal proses pengiriman email di webhook:", emailError);
        }
      }

    } catch (dbError) {
      console.error("Failed to update database via webhook:", dbError);
    }

    return NextResponse.json({ success: true, status: orderStatus });
  } catch (error: any) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
