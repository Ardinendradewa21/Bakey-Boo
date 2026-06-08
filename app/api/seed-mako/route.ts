import { NextResponse } from "next/server";
import { insforge } from "@/lib/insforge";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const makoProducts = [
    {
      id: uuidv4(),
      title: "Floss Roll Mentega",
      slug: "floss-roll-mentega-" + Date.now(),
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
      slug: "fire-floss-pedas-" + Date.now(),
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
      slug: "choco-meises-classic-" + Date.now(),
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
      slug: "cheese-croissant-" + Date.now(),
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
      slug: "sugar-donut-mako-" + Date.now(),
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
      slug: "tiramisu-cake-slice-" + Date.now(),
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
      slug: "sausage-roll-" + Date.now(),
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
      slug: "matcha-red-bean-" + Date.now(),
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
      slug: "long-john-coklat-kacang-" + Date.now(),
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
      slug: "almond-blanc-" + Date.now(),
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
      slug: "red-velvet-cake-slice-" + Date.now(),
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
      slug: "kopi-mako-iced-" + Date.now(),
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

  let successCount = 0;
  const errors = [];

  for (const prod of makoProducts) {
    const { _images, ...productData } = prod;

    const { error: errProd } = await insforge.database.from("products").insert(productData);
    
    if (errProd) {
      errors.push({ title: productData.title, error: errProd });
      continue;
    }

    const { error: errImg } = await insforge.database.from("product_images").insert({
      id: uuidv4(),
      product_id: productData.id,
      url: _images[0],
      sort_order: 0
    });

    if (errImg) {
      errors.push({ title: productData.title, imageError: errImg });
    } else {
      successCount++;
    }
  }

  return NextResponse.json({
    message: "Seeding complete",
    successCount,
    errors
  });
}
