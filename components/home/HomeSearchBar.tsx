"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { insforge } from "@/lib/insforge";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export function HomeSearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!searchQuery.trim() || searchQuery.trim().length < 2) {
        setRecommendations([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const { data } = await insforge.database
          .from("products")
          .select("id, title, slug, price, category, images:product_images(url)")
          .ilike("title", `%${searchQuery.trim()}%`)
          .limit(5);
        
        setRecommendations(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    };

    const timer = setTimeout(() => {
      fetchRecommendations();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowRecommendations(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/products`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-surface-200/50 p-2 md:p-4 max-w-4xl mx-auto border border-surface-100 glass">
      <form ref={searchRef} onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2 relative">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-surface-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowRecommendations(true);
            }}
            onFocus={() => setShowRecommendations(true)}
            placeholder="Cari roti cokelat, donat gula, dll..." 
            className="w-full h-12 pl-12 pr-12 bg-surface-50 border-none rounded-xl focus:ring-2 focus:ring-brand-500 transition-shadow text-base"
          />
          {isSearching && (
            <div className="absolute right-4 top-3.5">
              <Loader2 className="w-5 h-5 animate-spin text-surface-400" />
            </div>
          )}
          
          {/* Autocomplete Dropdown */}
          {showRecommendations && searchQuery.trim().length >= 2 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-surface-200 overflow-hidden z-50">
              {recommendations.length > 0 ? (
                <div className="py-2">
                  {recommendations.map((item) => (
                    <Link
                      key={item.id}
                      href={`/products/${item.slug}`}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-surface-50 transition-colors"
                      onClick={() => setShowRecommendations(false)}
                    >
                      <div className="w-10 h-10 rounded-md bg-surface-100 flex-shrink-0 overflow-hidden">
                        {item.images?.[0]?.url ? (
                          <img src={item.images[0].url} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-surface-400">No Image</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-surface-900 truncate">{item.title}</p>
                        <p className="text-xs text-surface-500 capitalize">{item.category.replace("-", " ")}</p>
                      </div>
                      <div className="text-sm font-semibold text-brand-600">
                        {formatPrice(item.price)}
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-surface-100 mt-2">
                    <button
                      type="submit"
                      className="w-full text-center text-sm font-medium text-brand-600 hover:text-brand-700 py-3 hover:bg-surface-50 transition-colors"
                    >
                      Lihat semua hasil untuk "{searchQuery}"
                    </button>
                  </div>
                </div>
              ) : !isSearching && (
                <div className="p-4 text-center text-sm text-surface-500">
                  Tidak ada menu yang cocok dengan "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
        <button type="submit" className={cn(buttonVariants({ size: "default" }), "h-12 px-8 bg-surface-900 hover:bg-surface-800 text-white rounded-xl text-base font-medium")}>
          Cari Menu
        </button>
      </form>
    </div>
  );
}
