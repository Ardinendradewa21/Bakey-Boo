"use server";

import { insforge } from "@/lib/insforge";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

export async function deleteProduct(productId: string) {
  try {
    const { error } = await insforge.database
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      throw error;
    }

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete product" };
  }
}

export async function createProduct(data: any) {
  try {
    const productId = uuidv4();
    
    // Single-vendor: tidak perlu seller_id, gunakan default database 'admin-system'
    const { error } = await insforge.database
      .from("products")
      .insert({
        id: productId,
        title: data.title,
        slug: data.slug,
        description: data.description,
        price: data.price,
        original_price: data.original_price || null,
        is_bundle: data.is_bundle || false,
        category: data.category,
        is_published: data.is_published,
        stock: null, // Unlimited
      });

    if (error) throw error;

    // Handle bundle items
    if (data.is_bundle && data.bundle_product_ids && data.bundle_product_ids.length > 0) {
      const bundleItemsData = data.bundle_product_ids.map((pId: string) => ({
        bundle_id: productId,
        product_id: pId
      }));
      await insforge.database.from("bundle_items").insert(bundleItemsData);
    }

    // Insert Image if provided
    if (data.image_url) {
      await insforge.database.from("product_images").insert({
        id: uuidv4(),
        product_id: productId,
        url: data.image_url,
        sort_order: 1,
      });
    }

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/");
    
    return { success: true, id: productId };
  } catch (error: any) {
    console.error("Create Product Error:", error);
    return { success: false, error: error.message || "Failed to create product" };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    // Update Product
    const { error } = await insforge.database
      .from("products")
      .update({
        title: data.title,
        slug: data.slug,
        description: data.description,
        price: data.price,
        original_price: data.original_price || null,
        is_bundle: data.is_bundle || false,
        category: data.category,
        is_published: data.is_published,
      })
      .eq("id", id);

    if (error) throw error;

    // Handle bundle items
    // Delete existing
    await insforge.database.from("bundle_items").delete().eq("bundle_id", id);
    // Insert new
    if (data.is_bundle && data.bundle_product_ids && data.bundle_product_ids.length > 0) {
      const bundleItemsData = data.bundle_product_ids.map((pId: string) => ({
        bundle_id: id,
        product_id: pId
      }));
      await insforge.database.from("bundle_items").insert(bundleItemsData);
    }

    // We will just do a simple update or insert for images to keep MVP simple.
    // If an image URL is provided, we can clear existing and insert a new one, 
    // or just leave it if we don't have complex image management yet.
    if (data.image_url) {
      await insforge.database.from("product_images").delete().eq("product_id", id);
      await insforge.database.from("product_images").insert({
        id: uuidv4(),
        product_id: id,
        url: data.image_url,
        sort_order: 1,
      });
    }

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath(`/products/${data.slug}`);
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    console.error("Update Product Error:", error);
    return { success: false, error: error.message || "Failed to update product" };
  }
}
