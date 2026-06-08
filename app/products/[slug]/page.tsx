import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { insforge } from "@/lib/insforge";
import { Product } from "@/types";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ImageGallery } from "@/components/products/ImageGallery";
import { ReviewSection } from "@/components/products/ReviewSection";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import { Star, CheckCircle, ShieldCheck, Download, Link as LinkIcon } from "lucide-react";
import { ProductCTAButtons } from "@/components/products/ProductCTAButtons";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

// SEO Metadata Generation
export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const { data, error } = await insforge.database
      .from("products")
      .select(`
        title, 
        description,
        images:product_images(url)
      `)
      .eq("slug", slug)
      .single();
    
    if (error || !data) {
      return { title: "Produk Tidak Ditemukan" };
    }

    const firstImage = data.images && data.images.length > 0 ? data.images[0].url : null;
    
    return {
      title: `${data.title} | Bakey Boo`,
      description: data.description?.substring(0, 160) || "Beli aneka roti dan donat segar berkualitas dari Bakey Boo.",
      openGraph: {
        title: `${data.title} | Bakey Boo`,
        description: data.description?.substring(0, 160) || "Beli aneka roti dan donat segar berkualitas dari Bakey Boo.",
        type: "website",
        siteName: "Bakey Boo",
        images: firstImage ? [firstImage] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${data.title} | Bakey Boo`,
        description: data.description?.substring(0, 160) || "Beli aneka roti dan donat segar berkualitas dari Bakey Boo.",
        images: firstImage ? [firstImage] : [],
      }
    };
  } catch (e) {
    return { title: "Detail Produk" };
  }
}

async function getProductDetail(slug: string) {
  try {
    const { data, error } = await insforge.database
      .from("products")
      .select(`
        *,
        images:product_images(id, url, sort_order),
        reviews(id, rating, comment, created_at, buyer_id)
      `)
      .eq("slug", slug)
      .eq("is_published", true)
      .single();
    
    if (error) {
      console.error("PRODUCT FETCH ERROR:", JSON.stringify(error, null, 2));
    }

    if (error || !data) return null;
    
    // Asynchronously increment view count
    insforge.database
      .from("products")
      .update({ view_count: Number(data.view_count || 0) + 1 })
      .eq("id", data.id)
      .then(({ error: updateError }) => {
        if (updateError) console.error("Failed to increment view count:", updateError);
      });
    
    let reviews = data.reviews || [];
    
    // Cross-fetch buyer profiles
    if (reviews.length > 0) {
      const buyerIds = [...new Set(reviews.map((r: any) => r.buyer_id).filter(Boolean))];
      if (buyerIds.length > 0) {
        const { data: buyers } = await insforge.database
          .from("users_profile")
          .select("user_id, name")
          .in("user_id", buyerIds);
          
        if (buyers) {
          reviews = reviews.map((r: any) => {
            const buyer = buyers.find((b: any) => b.user_id === r.buyer_id);
            return {
              ...r,
              buyer: buyer ? { name: buyer.name } : { name: "User" }
            };
          });
        }
      }
    }

    const reviewCount = reviews.length;
    const ratingAvg = reviewCount > 0 
      ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviewCount 
      : 0;

    data.reviews = reviews;

    return {
      ...data,
      price: Number(data.price),
      original_price: data.original_price ? Number(data.original_price) : null,
      is_bundle: data.is_bundle || false,
      rating_avg: ratingAvg,
      review_count: reviewCount,
      flavors: data.flavors || (data.category === 'donat' ? ["Coklat", "Keju", "Matcha", "Strawberry"] : []),
      sizes: data.sizes || (data.category === 'roti' ? ["Reguler", "Jumbo"] : ["Mini", "Reguler"])
    } as Product;
  } catch (error) {
    console.error("Failed to fetch product detail:", error);
    return null;
  }
}

async function getRelatedProducts(categoryId: string, excludeProductId: string) {
  try {
    const { data, error } = await insforge.database
      .from("products")
      .select(`
        id, title, slug, price, category,
        images:product_images(url)
      `)
      .eq("category", categoryId)
      .neq("id", excludeProductId)
      .eq("is_published", true)
      .limit(4);
      
    if (error) return [];
    
    return (data || []).map((row: any) => ({
      ...row,
      price: Number(row.price),
      rating_avg: Number(row.rating_avg || 0),
      review_count: Number(row.review_count || 0)
    })) as Product[];
  } catch (e) {
    return [];
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductDetail(slug);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id);

  return (
    <>
      <Navbar />
      
      <main className="flex-1 bg-surface-50 min-h-screen py-10">
        <div className="container mx-auto px-4">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-surface-500 mb-8">
            <Link href="/" className="hover:text-brand-600">Beranda</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-brand-600">Produk</Link>
            <span>/</span>
            <Link href={`/products?category=${product.category}`} className="hover:text-brand-600 capitalize">
              {product.category.replace("-", " ")}
            </Link>
            <span>/</span>
            <span className="text-surface-900 truncate font-medium">{product.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Column: Images & Reviews */}
            <div className="flex-1 flex flex-col gap-10 min-w-0">
              {/* Product Gallery */}
              <ImageGallery images={product.images || []} title={product.title} />

              {/* Product Description */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-surface-200">
                <h3 className="font-heading font-bold text-2xl text-surface-900 mb-6">Deskripsi Produk</h3>
                <div 
                  className="prose prose-surface max-w-none text-surface-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.description || "Tidak ada deskripsi." }}
                />
              </div>

              {/* Reviews */}
              <ReviewSection 
                reviews={product.reviews || []} 
                ratingAvg={product.rating_avg || 0} 
                reviewCount={product.review_count || 0} 
              />
            </div>

            {/* Right Column: Checkout & Seller (Sticky) */}
            <div className="w-full lg:w-96 shrink-0">
              <div className="sticky top-24 flex flex-col gap-6">
                
                {/* Buy Box */}
                <div className="bg-white rounded-3xl p-6 border border-surface-200 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge variant="outline" className="bg-brand-50 text-brand-700 border-brand-200 capitalize">
                      {product.category}
                    </Badge>
                    {product.is_bundle && (
                      <Badge variant="default" className="bg-brand-600 hover:bg-brand-700 text-white border-transparent">
                        Bundle
                      </Badge>
                    )}
                    {product.original_price && product.original_price > product.price && (
                      <Badge variant="destructive" className="bg-red-500 hover:bg-red-600 text-white border-transparent">
                        Hemat {Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                      </Badge>
                    )}
                  </div>
                  
                  <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-surface-900 leading-tight mb-4">
                    {product.title}
                  </h1>
                  
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-surface-100">
                    <div className="flex items-center gap-1 bg-surface-50 px-2 py-1 rounded-md border border-surface-200">
                      <Star className="size-4 fill-star text-star" />
                      <span className="font-bold text-surface-800">{product.rating_avg ? product.rating_avg.toFixed(1) : "0.0"}</span>
                    </div>
                    <span className="text-surface-500 text-sm">{product.review_count} Ulasan</span>
                  </div>

                  {/* Price and CTA Buttons are now combined to support dynamic variant pricing */}
                  <ProductCTAButtons product={product} />
                  
                  <div className="mt-6 flex flex-col gap-2 text-sm text-surface-600 bg-surface-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-emerald-500" />
                      <span>Dipanggang segar setiap hari</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="size-4 text-emerald-500" />
                      <span>Pembayaran aman dengan Midtrans</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-emerald-500" />
                      <span>Pengiriman aman dan terjamin</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />
          
        </div>
      </main>

      <Footer />
    </>
  );
}
