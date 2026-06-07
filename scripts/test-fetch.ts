import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL;
// Use Anon Key to simulate a non-logged in user!
const supabaseAnonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Anon Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const slug = "ebook-panduan-karir-fresh-graduate";
  console.log("Fetching slug:", slug, "as ANON user");
  
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      images:product_images(id, url, sort_order),
      reviews(id, rating, comment, created_at, buyer:users_profile(name))
    `)
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  
  if (error) {
    console.error("RAW POSTGREST ERROR:", JSON.stringify(error, null, 2));
  } else {
    console.log("Data found successfully:", data?.title);
  }
}

run();
