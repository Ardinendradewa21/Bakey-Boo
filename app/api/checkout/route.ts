import { NextResponse } from "next/server";
import { snap } from "@/lib/midtrans";
import { v4 as uuidv4 } from "uuid";
import { insforge } from "@/lib/insforge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, email, recipientName, phone, address, deliveryMethod, items, amount } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Keranjang kosong" }, { status: 400 });
    }

    // Generate Order ID
    const orderId = `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Optional: Prepare Midtrans item details
    const itemDetails = items.map((item: any) => {
      let name = `Produk ${item.productId.substring(0,8)}`;
      if (item.selectedFlavor || item.selectedSize) {
        name += ` (${item.selectedFlavor || ''} ${item.selectedSize || ''})`.trim();
      }
      return {
        id: item.productId,
        price: item.price,
        quantity: item.quantity,
        name: name.substring(0, 50), // Midtrans max name length is 50 chars
      };
    });

    // Midtrans Transaction Params
    const transactionParams = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      item_details: itemDetails,
      customer_details: {
        first_name: recipientName || email.split("@")[0],
        email: email,
        phone: phone || "",
        ...(deliveryMethod === "delivery" && address ? {
          shipping_address: {
            first_name: recipientName,
            phone: phone,
            address: address,
          }
        } : {})
      },
      // You can define custom callbacks or expiry here
    };

    try {
      // 1. Insert order to DB (Assuming tables exist, catching error if not)
      const { data: orderData, error: orderError } = await insforge.database
        .from("orders")
        .insert({
          id: orderId,
          buyer_id: userId,
          total_price: amount,
          status: "pending",
        })
        .select()
        .single();

      if (orderError) {
        console.warn("DB Insert Warning (Orders table might not exist yet):", orderError);
        // We might want to throw here in a real production, but for MVP let it pass 
        // if we are just testing midtrans popup.
      } else {
        // Insert order items
        const orderItemsToInsert = items.map((item: any) => ({
          id: uuidv4(),
          order_id: orderId,
          product_id: item.productId,
          price: item.price,
          quantity: item.quantity,
        }));
        
        await insforge.database.from("order_items").insert(orderItemsToInsert);
      }
    } catch (dbError) {
      console.error("Database operation failed:", dbError);
    }

    // 2. Request Snap Token
    const transaction = await snap.createTransaction(transactionParams);

    // 3. Save initial payment record
    try {
      await insforge.database.from("payments").insert({
        id: uuidv4(),
        order_id: orderId,
        snap_token: transaction.token,
        status: "pending",
        midtrans_response: JSON.stringify({
          shipping: { recipientName, phone, address, deliveryMethod },
          variants: items.map((i: any) => ({ id: i.productId, flavor: i.selectedFlavor, size: i.selectedSize }))
        })
      });
    } catch (e) {
      console.error("Failed to save payment record:", e);
    }

    return NextResponse.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
      order_id: orderId,
    });
    
  } catch (error: any) {
    console.error("Checkout Error:", error);
    return NextResponse.json(
      { error: error.message || "Gagal membuat pesanan" },
      { status: 500 }
    );
  }
}
