import { insforge } from "@/lib/insforge";
import { ProductForm } from "../../ProductForm";
import { notFound } from "next/navigation";
import { Product } from "@/types";

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const { data: product, error } = await insforge.database
    .from("products")
    .select("*, images:product_images(*), files:product_files(*)")
    .eq("id", resolvedParams.id)
    .single();

  if (error || !product) {
    return notFound();
  }

  // Fetch all non-bundle products for the bundle selector
  const { data: allProducts } = await insforge.database
    .from("products")
    .select("id, title, category, price")
    .eq("is_bundle", false)
    .neq("id", resolvedParams.id) // Exclude itself
    .order("title");

  // If this product is a bundle, fetch its bundle_items
  let initialBundleItems: string[] = [];
  if (product.is_bundle) {
    const { data: bItems } = await insforge.database
      .from("bundle_items")
      .select("product_id")
      .eq("bundle_id", product.id);
      
    if (bItems) {
      initialBundleItems = bItems.map((b: any) => b.product_id);
    }
  }

  return (
    <div className="py-6">
      <ProductForm 
        initialData={product as Product} 
        allProducts={allProducts || []} 
        initialBundleItems={initialBundleItems}
      />
    </div>
  );
}
