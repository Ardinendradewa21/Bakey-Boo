import { NextResponse } from "next/server";
import { insforge } from "@/lib/insforge";

// TEMPORARY: API route untuk reset dan rebuild database
// HAPUS FILE INI setelah migrasi selesai!
export async function POST(request: Request) {
  try {
    const { action } = await request.json();

    if (action === "drop_all") {
      // Hapus semua tabel lama (urutan penting karena foreign key)
      const tablesToDrop = [
        "messages",
        "notifications", 
        "seller_profiles",
        "seller_stores",
        "seller_balances",
        "withdrawals",
        "wishlist",
        "reviews",
        "payments",
        "order_items",
        "orders",
        "product_files",
        "product_tags",
        "product_images",
        "products",
        "promo_codes",
        "users_profile",
        "sellers",
      ];

      const results: string[] = [];

      for (const table of tablesToDrop) {
        // Coba hapus semua data dari tabel (jika ada)
        const { error } = await insforge.database
          .from(table)
          .delete()
          .neq("id", "00000000-0000-0000-0000-000000000000"); // delete all rows
        
        if (error) {
          results.push(`${table}: ${error.message}`);
        } else {
          results.push(`${table}: cleared ✓`);
        }
      }

      return NextResponse.json({ message: "Drop attempted", results });
    }

    if (action === "check_tables") {
      const tables = ["users_profile", "products", "product_images", "product_files", "product_tags", "orders", "order_items", "payments", "reviews", "wishlist", "promo_codes", "sellers"];
      const results: Record<string, any> = {};

      for (const table of tables) {
        const { data, error } = await insforge.database
          .from(table)
          .select("*", { count: "exact", head: true });

        results[table] = error ? `ERROR: ${error.message}` : `exists (${data} rows)`;
      }

      return NextResponse.json({ tables: results });
    }

    if (action === "seed") {
      // Seed sample data untuk Bakey Boo (10 Produk)
      const { v4: uuidv4 } = await import("uuid");
      
      const productSeeds = [
        {
          title: "Roti Sisir Mentega Spesial",
          slug: "roti-sisir-mentega-spesial",
          desc: "Roti sisir klasik dengan olesan mentega manis yang berlimpah. Lembut dan cocok untuk teman minum teh.",
          price: 35000,
          category: "aneka-roti",
          img: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=600"
        },
        {
          title: "Donat Kentang Gula Halus",
          slug: "donat-kentang-gula-halus",
          desc: "Donat kampung berbahan dasar kentang yang super empuk dengan taburan gula halus klasik.",
          price: 45000,
          category: "donat-spesial",
          img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600"
        },
        {
          title: "Roti Sobek Premium Coklat",
          slug: "roti-sobek-premium-coklat",
          desc: "Roti sobek aneka rasa dengan tekstur awan yang sangat lembut. Isian coklat lumer premium.",
          price: 55000,
          category: "aneka-roti",
          img: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=600"
        },
        {
          title: "Kue Kering Nastar Nanas",
          slug: "kue-kering-nastar-nanas",
          desc: "Kue kering renyah dengan isian selai nanas asli yang manis dan asam menyegarkan.",
          price: 85000,
          category: "kue-kering",
          img: "https://images.unsplash.com/photo-1557308536-ee471ef2c390?w=600"
        },
        {
          title: "Es Kopi Susu Gula Aren",
          slug: "es-kopi-susu-gula-aren",
          desc: "Perpaduan espresso pekat dengan susu segar dan manisnya gula aren murni.",
          price: 25000,
          category: "minuman",
          img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600"
        },
        {
          title: "Donat Bomboloni Vanilla",
          slug: "donat-bomboloni-vanilla",
          desc: "Donat tanpa lubang khas Italia dengan isian krim vanilla custard yang melimpah.",
          price: 48000,
          category: "donat-spesial",
          img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600"
        },
        {
          title: "Roti Tawar Gandum",
          slug: "roti-tawar-gandum",
          desc: "Roti tawar sehat berbahan dasar tepung gandum utuh, cocok untuk menu sarapan diet Anda.",
          price: 32000,
          category: "aneka-roti",
          img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600"
        },
        {
          title: "Kastengel Keju Edam",
          slug: "kastengel-keju-edam",
          desc: "Kue kering gurih dan renyah dengan baluran keju Edam kualitas premium.",
          price: 95000,
          category: "kue-kering",
          img: "https://images.unsplash.com/photo-1557308536-ee471ef2c390?w=600"
        },
        {
          title: "Matcha Latte Dingin",
          slug: "matcha-latte-dingin",
          desc: "Minuman serbuk teh hijau Jepang yang diseduh dengan susu segar.",
          price: 28000,
          category: "minuman",
          img: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=600"
        },
        {
          title: "Croissant Butter",
          slug: "croissant-butter",
          desc: "Pastry klasik khas Prancis dengan lapisan mentega yang gurih dan renyah di luar, namun lembut di dalam.",
          price: 25000,
          category: "aneka-roti",
          img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600"
        }
      ];

      const insertedIds = [];

      for (const item of productSeeds) {
        const id = uuidv4();
        const { error: pErr } = await insforge.database.from("products").insert({
          id,
          title: item.title,
          slug: item.slug,
          description: item.desc,
          price: item.price,
          category: item.category,
          is_published: true,
          view_count: 0,
          delivery_method: "delivery",
        });

        if (pErr) throw pErr;

        await insforge.database.from("product_images").insert({
          id: uuidv4(),
          product_id: id,
          url: item.img,
          sort_order: 1,
        });

        insertedIds.push(id);
      }

      return NextResponse.json({ 
        message: "Seeded 10 bakery products successfully!", 
        products: insertedIds
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
