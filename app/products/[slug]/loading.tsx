import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProductDetail() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface-50 min-h-screen py-10">
        <div className="container mx-auto px-4">
          
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 mb-8">
            <Skeleton className="h-4 w-16" />
            <span className="text-surface-300">/</span>
            <Skeleton className="h-4 w-16" />
            <span className="text-surface-300">/</span>
            <Skeleton className="h-4 w-24" />
            <span className="text-surface-300">/</span>
            <Skeleton className="h-4 w-40" />
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Column: Images & Reviews Skeleton */}
            <div className="flex-1 flex flex-col gap-10 min-w-0">
              {/* Image Gallery Skeleton */}
              <div className="flex flex-col-reverse md:flex-row gap-4">
                <div className="flex md:flex-col gap-4 overflow-x-auto w-full md:w-24 shrink-0 pb-2 md:pb-0">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="size-20 md:w-full md:h-24 rounded-xl shrink-0" />
                  ))}
                </div>
                <div className="flex-1 relative aspect-square bg-white rounded-2xl border border-surface-200 overflow-hidden">
                  <Skeleton className="w-full h-full" />
                </div>
              </div>

              {/* Product Description Skeleton */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-surface-200">
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            </div>

            {/* Right Column: Checkout & Seller Skeleton */}
            <div className="w-full lg:w-96 shrink-0">
              <div className="sticky top-24 flex flex-col gap-6">
                <div className="bg-white rounded-3xl p-6 border border-surface-200 shadow-sm">
                  {/* Badges */}
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  
                  {/* Title */}
                  <Skeleton className="h-10 w-full mb-2" />
                  <Skeleton className="h-10 w-2/3 mb-4" />
                  
                  {/* Ratings */}
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-surface-100">
                    <Skeleton className="h-8 w-16 rounded-md" />
                    <Skeleton className="h-4 w-20" />
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <Skeleton className="h-4 w-12 mb-2" />
                    <Skeleton className="h-10 w-48" />
                  </div>

                  {/* Actions */}
                  <div className="space-y-4">
                    <Skeleton className="h-14 w-full rounded-2xl" />
                    <Skeleton className="h-14 w-full rounded-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>
      <Footer />
    </>
  );
}
