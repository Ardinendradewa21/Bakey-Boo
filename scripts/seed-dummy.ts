import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL;
const supabaseKey = process.env.INSFORGE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const dummyProducts = [
  {
    id: uuidv4(),
    title: "Roti Sisir Mentega Spesial",
    slug: "roti-sisir-mentega-spesial",
    description: "Roti sisir klasik dengan olesan mentega manis yang berlimpah. Lembut dan cocok untuk teman minum teh.",
    price: 35000,
    original_price: 45000,
    category: "aneka-roti",
    is_published: true,
    view_count: 0,
    delivery_method: "delivery",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    _images: ["https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=800&auto=format&fit=crop"],
    _fileUrl: ""
  },
  {
    id: uuidv4(),
    title: "Donat Kentang Gula Halus",
    slug: "donat-kentang-gula-halus",
    description: "Donat kampung berbahan dasar kentang yang super empuk dengan taburan gula halus klasik.",
    price: 45000,
    original_price: null,
    category: "donat-spesial",
    is_published: true,
    view_count: 0,
    delivery_method: "delivery",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    _images: ["https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop"],
    _fileUrl: ""
  },
  {
    id: uuidv4(),
    title: "Roti Sobek Premium Coklat",
    slug: "roti-sobek-premium-coklat",
    description: "Roti sobek aneka rasa dengan tekstur awan yang sangat lembut. Isian coklat lumer premium.",
    price: 55000,
    original_price: 75000,
    category: "aneka-roti",
    is_published: true,
    view_count: 0,
    delivery_method: "delivery",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    _images: ["https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&auto=format&fit=crop"],
    _fileUrl: ""
  },
  {
    id: uuidv4(),
    title: "Es Kopi Susu Gula Aren",
    slug: "es-kopi-susu-gula-aren",
    description: "Perpaduan espresso pekat dengan susu segar dan manisnya gula aren murni.",
    price: 25000,
    original_price: null,
    category: "minuman",
    is_published: true,
    view_count: 0,
    delivery_method: "delivery",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    _images: ["https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop"],
    _fileUrl: ""
  }
];

async function seed() {
  console.log("Mulai menambahkan dummy data...");

  // 1. Tambahkan kolom buyer_email ke tabel orders (jika belum ada)
  // Perhatian: Ini menggunakan SQL RPC atau REST. Supabase REST API tidak bisa langsung DDL (ALTER TABLE),
  // jadi kita hanya akan mengingatkan user untuk menjalankannya.
  console.log("-----------------------------------------");
  console.log("⚠️ PENTING: Jalankan perintah SQL berikut di Supabase Dashboard Anda (SQL Editor):");
  console.log("ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS buyer_email text;");
  console.log("-----------------------------------------");

  for (const prod of dummyProducts) {
    const { _images, _fileUrl, ...productData } = prod;

    // Insert Product
    const { error: errProd } = await supabase.from("products").insert(productData as any);
    if (errProd) {
      console.error(`Gagal insert produk ${productData.title}:`, errProd.message);
      continue;
    }

    // Insert Product Image
    const { error: errImg } = await supabase.from("product_images").insert({
      id: uuidv4(),
      product_id: productData.id,
      url: _images[0],
      sort_order: 0
    });
    if (errImg) console.error("Gagal insert image:", errImg.message);

    // Insert Product File (berisi Link Download untuk Email)
    const { error: errFile } = await supabase.from("product_files").insert({
      id: uuidv4(),
      product_id: productData.id,
      file_url: _fileUrl,
      file_name: productData.title + " (Access)",
      file_type: "link",
      file_size: 0
    });
    if (errFile) console.error("Gagal insert file link:", errFile.message);

    console.log(`✅ Produk berhasil ditambahkan: ${productData.title}`);
  }

  console.log("🎉 Proses seeding selesai!");
}

seed().catch(console.error);
