import { Metadata } from "next";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SidebarFilter } from "@/components/products/SidebarFilter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { insforge } from "@/lib/insforge";
import { Product } from "@/types";
import { Search } from "lucide-react";
import { MobileSearchInput } from "@/components/products/MobileSearchInput";

export const metadata: Metadata = {
  title: "Semua Menu | Bakey Boo",
  description: "Aneka roti dan donat segar pilihan dari Bakey Boo untuk menemani harimu.",
  openGraph: {
    title: "Semua Menu | Bakey Boo",
    description: "Aneka roti dan donat segar pilihan dari Bakey Boo.",
    siteName: "Bakey Boo",
  },
};

async function getProducts(searchQuery?: string, categoryFilters?: string[]) {
  try {
    let query = insforge.database
      .from("products")
      .select(`
        id, title, slug, price, category,
        images:product_images(url),
        reviews(rating)
      `)
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (searchQuery) {
      // Create a more flexible search matching title, category, and description
      const terms = searchQuery.split(' ').filter(t => t.trim().length > 0);
      if (terms.length > 0) {
        // We search if ANY of the terms match ANY of the fields (loose search)
        const orConditions = terms.map(term => `title.ilike.%${term}%,category.ilike.%${term}%,description.ilike.%${term}%`);
        query = query.or(orConditions.join(','));
      }
    }

    if (categoryFilters && categoryFilters.length > 0) {
      query = query.in("category", categoryFilters);
    }

    const { data, error } = await query.limit(24);
      
    if (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
    
    // Transform data and calculate average rating
    return (data || []).map((row: any) => {
      const reviews = row.reviews || [];
      const reviewCount = reviews.length;
      const ratingAvg = reviewCount > 0 
        ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviewCount 
        : 0;

      return {
        ...row,
        price: Number(row.price),
        rating_avg: Number(ratingAvg),
        review_count: Number(reviewCount)
      };
    }) as Product[];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const searchQuery = typeof params.search === "string" ? params.search : undefined;
  const categoryFilters = typeof params.category === "string" ? params.category.split(",") : undefined;
  
  const products = await getProducts(searchQuery, categoryFilters);

  return (
    <>
      <Navbar />
      
      <main className="flex-1 bg-surface-50 min-h-screen pb-20">
        {/* Header Section */}
        <section className="bg-white border-b border-surface-200 pt-8 pb-8 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-surface-900 mb-4 tracking-tight">
                Katalog Menu
              </h1>
              <p className="text-surface-600 text-lg">
                Temukan aneka roti dan donat lezat yang dipanggang segar setiap hari.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pt-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar (Desktop) */}
            <aside className="w-full lg:w-72 shrink-0">
              <div className="sticky top-24">
                <SidebarFilter />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-6">
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-surface-900">
                    {searchQuery ? `Hasil Pencarian: "${searchQuery}"` : "Semua Menu"}
                  </h2>
                  <p className="text-sm text-surface-500 mt-1">
                    Menampilkan {products.length} menu
                  </p>
                </div>
                
                {/* Search Bar Mobile */}
                <MobileSearchInput defaultValue={searchQuery} />
              </div>

              {/* Product Grid */}
              {products.length > 0 ? (
                <ProductGrid>
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </ProductGrid>
              ) : (
                <div className="flex flex-col items-center justify-center bg-white border border-surface-200 border-dashed rounded-3xl py-20 px-4 text-center">
                  <div className="size-16 bg-surface-100 rounded-full flex items-center justify-center mb-4 text-3xl">
                    🔍
                  </div>
                  <h3 className="font-heading font-bold text-xl text-surface-900 mb-2">Belum Ada Menu</h3>
                  <p className="text-surface-500 max-w-sm">
                    Kami tidak dapat menemukan menu yang sesuai dengan pencarian Anda. Cobalah menghapus beberapa filter.
                  </p>
                </div>
              )}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
