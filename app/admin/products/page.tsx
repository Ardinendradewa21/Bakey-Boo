import { insforge } from "@/lib/insforge";
import { ProductTableClient } from "./ProductTableClient";
import { Product } from "@/types";

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const { data: products } = await insforge.database
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <ProductTableClient initialProducts={(products as Product[]) || []} />
  );
}
