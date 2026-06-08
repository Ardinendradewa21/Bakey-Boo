import { createClient } from "@insforge/sdk";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const insforgeUrl = process.env.NEXT_PUBLIC_INSFORGE_URL;
const insforgeKey = process.env.INSFORGE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;

if (!insforgeUrl || !insforgeKey) {
  console.error("Missing Insforge credentials in .env.local");
  process.exit(1);
}

const supabase = createClient({ baseUrl: insforgeUrl, anonKey: insforgeKey });

const makoProducts = [
  {
    id: uuidv4(),
    title: "Floss Roll Mentega",
    slug: "floss-roll-mentega",
    description: "Roti gulung lembut khas Mako yang dilapisi krim mayones manis gurih dan dibalut dengan taburan abon sapi asli yang melimpah.",
    price: 13500,
    original_price: null,
    category: "aneka-roti",
    is_published: true,
    view_count: 0,
    delivery_method: "delivery",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    _images: ["https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=800&auto=format&fit=crop"]
  },
  {
    id: uuidv4(),
    title: "Fire Floss Pedas",
    slug: "fire-floss-pedas",
    description: "Varian pedas dari Floss Roll. Roti super lembut dengan mayones spesial dan abon sapi pedas yang menggugah selera.",
    price: 14000,
    original_price: null,
    category: "aneka-roti",
    is_published: true,
    view_count: 0,
    delivery_method: "delivery",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    _images: ["https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=800&auto=format&fit=crop"]
  },
  {
    id: uuidv4(),
    title: "Choco Meises Classic",
    slug: "choco-meises-classic",
    description: "Roti manis klasik bertabur cokelat meises ceres tebal di atas olesan krim mentega moka yang wangi.",
    price: 11000,
    original_price: 12500,
    category: "aneka-roti",
    is_published: true,
    view_count: 0,
    delivery_method: "delivery",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    _images: ["https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&auto=format&fit=crop"]
  },
  {
    id: uuidv4(),
    title: "Cheese Croissant",
    slug: "cheese-croissant",
    description: "Croissant ala Prancis yang berlapis-lapis dan renyah, dipanggang sempurna dengan isian dan taburan keju cheddar gurih.",
    price: 18000,
    original_price: 20000,
    category: "aneka-roti",
    is_published: true,
    view_count: 0,
    delivery_method: "delivery",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    _images: ["https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?w=800&auto=format&fit=crop"]
  },
  {
    id: uuidv4(),
    title: "Sugar Donut Mako",
    slug: "sugar-donut-mako",
    description: "Donat super empuk dan mengembang sempurna khas racikan Mako, dibalut dengan taburan gula halus yang lumer di mulut.",
    price: 9000,
    original_price: null,
    category: "donat-spesial",
    is_published: true,
    view_count: 0,
    delivery_method: "delivery",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    _images: ["https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop"]
  },
  {
    id: uuidv4(),
    title: "Tiramisu Cake Slice",
    slug: "tiramisu-cake-slice",
    description: "Potongan kue Tiramisu asli Italia dengan lapisan sponge cake rasa kopi, keju mascarpone, dan taburan bubuk kakao.",
    price: 32000,
    original_price: 35000,
    category: "kue",
    is_published: true,
    view_count: 0,
    delivery_method: "delivery",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    _images: ["https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&auto=format&fit=crop"]
  },
  {
    id: uuidv4(),
    title: "Sausage Roll",
    slug: "sausage-roll",
    description: "Sosis sapi utuh premium yang dibalut dengan roti manis empuk, disiram saus tomat dan mayones di atasnya.",
    price: 15500,
    original_price: null,
    category: "aneka-roti",
    is_published: true,
    view_count: 0,
    delivery_method: "delivery",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    _images: ["https://images.unsplash.com/photo-1627308595229-7830f5c92811?w=800&auto=format&fit=crop"]
  },
  {
    id: uuidv4(),
    title: "Matcha Red Bean",
    slug: "matcha-red-bean",
    description: "Perpaduan serasi antara adonan roti rasa green tea (matcha) Jepang asli dengan isian pasta kacang merah (ogura) yang manis legit.",
    price: 13000,
    original_price: null,
    category: "aneka-roti",
    is_published: true,
    view_count: 0,
    delivery_method: "delivery",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    _images: ["https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=800&auto=format&fit=crop"]
  },
  {
    id: uuidv4(),
    title: "Long John Coklat Kacang",
    slug: "long-john-coklat-kacang",
    description: "Donat bentuk memanjang yang lembut, dilapis dengan cokelat cair tebal dan taburan kacang tanah cincang panggang.",
    price: 11500,
    original_price: null,
    category: "donat-spesial",
    is_published: true,
    view_count: 0,
    delivery_method: "delivery",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    _images: ["https://images.unsplash.com/photo-1534353875273-b5887cc1abf5?w=800&auto=format&fit=crop"]
  },
  {
    id: uuidv4(),
    title: "Almond Blanc",
    slug: "almond-blanc",
    description: "Roti manis eksklusif berisi krim vanilla susu dengan topping irisan kacang almond panggang dan gula bubuk.",
    price: 14500,
    original_price: null,
    category: "aneka-roti",
    is_published: true,
    view_count: 0,
    delivery_method: "delivery",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    _images: ["https://images.unsplash.com/photo-1601000854407-3d1911be2bdf?w=800&auto=format&fit=crop"]
  },
  {
    id: uuidv4(),
    title: "Red Velvet Cake Slice",
    slug: "red-velvet-cake-slice",
    description: "Sponge cake merah merona berlapis krim keju (cream cheese) asli yang kaya rasa dan meleleh di mulut.",
    price: 34000,
    original_price: null,
    category: "kue",
    is_published: true,
    view_count: 0,
    delivery_method: "delivery",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    _images: ["https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=800&auto=format&fit=crop"]
  },
  {
    id: uuidv4(),
    title: "Kopi Mako Iced",
    slug: "kopi-mako-iced",
    description: "Kopi susu gula aren andalan ala Mako yang terbuat dari biji kopi pilihan nusantara. Segar untuk pelepas dahaga.",
    price: 22000,
    original_price: 25000,
    category: "minuman",
    is_published: true,
    view_count: 0,
    delivery_method: "delivery",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    _images: ["https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop"]
  }
];

async function seedMako() {
  console.log("Memulai proses injeksi menu ala Mako dengan Native Fetch...");
  let count = 0;

  for (const prod of makoProducts) {
    const { _images, ...productData } = prod;

    // Insert Product
    const { error: errProd } = await supabase.database.from("products").insert(productData as any);
    if (errProd) {
      console.error(`❌ Gagal insert produk ${productData.title}:`, errProd.message);
      continue;
    }

    // Insert Product Image
    const { error: errImg } = await supabase.database.from("product_images").insert({
      id: uuidv4(),
      product_id: productData.id,
      url: _images[0],
      sort_order: 0
    });

    if (errImg) {
      console.error(`❌ Gagal insert gambar untuk ${productData.title}:`, errImg.message);
    } else {
      console.log(`✅ Berhasil insert: ${productData.title}`);
      count++;
    }
  }

  console.log(`\n🎉 SELESAI! Berhasil menginjeksi ${count} menu ala Mako ke dalam database.`);
}

seedMako().catch(console.error);
