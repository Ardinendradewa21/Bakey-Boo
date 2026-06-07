import { ProductForm } from "../ProductForm";
import { insforge } from "@/lib/insforge";

export default async function NewProductPage() {
  const { data: allProducts } = await insforge.database
    .from("products")
    .select("id, title, category, price")
    .eq("is_bundle", false)
    .order("title");

  return (
    <div className="py-6">
      <ProductForm allProducts={allProducts || []} />
    </div>
  );
}
