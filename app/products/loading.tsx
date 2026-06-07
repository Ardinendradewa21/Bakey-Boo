import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProducts() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface-50 py-8">
        <div className="container mx-auto px-4">
          
          {/* Header Skeleton */}
          <div className="mb-10 text-center flex flex-col items-center">
            <Skeleton className="h-10 w-64 mb-4" />
            <Skeleton className="h-4 w-96 max-w-full" />
          </div>

          {/* Search Bar Skeleton */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <Search className="size-5 text-surface-300" />
              </div>
              <Skeleton className="w-full h-14 rounded-2xl" />
            </div>
          </div>

          {/* Category Tabs Skeleton */}
          <div className="flex overflow-x-auto pb-4 mb-8 gap-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full shrink-0" />
            ))}
          </div>

          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-3 sm:p-4 border border-surface-100 shadow-sm flex flex-col gap-2">
                <Skeleton className="aspect-[4/3] rounded-xl mb-2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <div className="flex items-center justify-between mt-auto pt-2">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="size-8 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </main>
      <Footer />
    </>
  );
}
