import { insforge } from "./lib/insforge";

async function test() {
  const slug = "roti-sobek-premium";
  
  console.log("Testing detail query for slug:", slug);
  const { data, error } = await insforge.database
    .from("products")
    .select(`
      *,
      images:product_images(id, url, sort_order),
      reviews(id, rating, comment, created_at)
    `)
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) {
    console.error("ERROR:", error);
  } else {
    console.log("SUCCESS:", data ? "Found data" : "No data");
  }
}

test();
