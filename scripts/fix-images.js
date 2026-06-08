const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const insforgeUrl = process.env.NEXT_PUBLIC_INSFORGE_URL;
const insforgeKey = process.env.INSFORGE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;

const headers = {
  "apikey": insforgeKey,
  "Authorization": `Bearer ${insforgeKey}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

async function fixImages() {
  const fixes = [
    {
      broken: "https://images.unsplash.com/photo-1601000854407-3d1911be2bdf?w=800&auto=format&fit=crop",
      fixed: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop"
    },
    {
      broken: "https://images.unsplash.com/photo-1627308595229-7830f5c92811?w=800&auto=format&fit=crop",
      fixed: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&auto=format&fit=crop"
    }
  ];

  for (const item of fixes) {
    const res = await fetch(`${insforgeUrl}/rest/v1/product_images?url=eq.${encodeURIComponent(item.broken)}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ url: item.fixed })
    });
    
    if (!res.ok) {
      console.error("Failed to fix image:", await res.text());
    } else {
      console.log("Fixed image successfully!");
    }
  }
}

fixImages();
