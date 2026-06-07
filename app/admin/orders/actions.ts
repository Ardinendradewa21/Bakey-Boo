"use server";

import { insforge } from "@/lib/insforge";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    const { error } = await insforge.database
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      throw error;
    }

    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath("/dashboard/purchases");
    
    return { success: true };
  } catch (error: any) {
    console.error("Update Order Status Error:", error);
    return { success: false, error: error.message || "Failed to update order status" };
  }
}
