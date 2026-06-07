"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, User, LogOut, ShoppingBag, Loader2 } from "lucide-react";
import { insforge } from "@/lib/insforge";
import { CartSheet } from "@/components/cart/CartSheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";

export function NavbarActions() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    insforge.auth.getCurrentUser().then(({ data, error }) => {
      setUser(data?.user || null);
      setIsLoading(false);
    });
  }, []);

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
    }
  };

  const handleLogout = async () => {
    await insforge.auth.signOut();
    
    // Clear secure session cookie
    try {
      await fetch("/api/auth/session", { method: "DELETE" });
    } catch (e) {
      console.error("Failed to clear session", e);
    }

    useCart.getState().clearCart();

    setUser(null);
    toast.success("Berhasil keluar");
    window.location.href = "/";
  };

  return (
    <div className="flex items-center gap-4">
      {/* Search Bar */}
      <form ref={searchRef} onSubmit={handleSearch} className="hidden md:flex relative w-64 z-50">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-surface-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowRecommendations(true);
          }}
          onFocus={() => setShowRecommendations(true)}
          placeholder="Cari roti, donat..."
          className="w-full bg-surface-50 border border-surface-200 rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
        />

        {/* Recommendations Dropdown */}
        {showRecommendations && searchQuery.trim().length >= 2 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-surface-200 shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {isSearching ? (
              <div className="p-4 flex items-center justify-center text-surface-500 gap-2 text-sm">
                <Loader2 className="size-4 animate-spin" /> Mencari...
              </div>
            ) : recommendations.length > 0 ? (
              <div className="py-2">
                {recommendations.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => {
                      setShowRecommendations(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-brand-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded bg-surface-100 overflow-hidden shrink-0 border border-surface-200">
                      {product.images?.[0]?.url ? (
                        <img src={product.images[0].url} alt={product.title} className="w-full h-full object-cover" />
                      ) : (
                        <ShoppingBag className="w-full h-full p-2 text-surface-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-surface-900 truncate group-hover:text-brand-700 transition-colors">
                        {product.title}
                      </p>
                      <p className="text-xs text-surface-500 capitalize mt-0.5">
                        {product.category}
                      </p>
                    </div>
                  </Link>
                ))}
                <button
                  type="submit"
                  onClick={handleSearch}
                  className="w-full text-left px-4 py-3 mt-1 text-sm font-medium text-brand-600 hover:text-brand-700 hover:bg-surface-50 border-t border-surface-100 transition-colors"
                >
                  Lihat semua hasil untuk "{searchQuery}"
                </button>
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-surface-500">
                Produk tidak ditemukan
              </div>
            )}
          </div>
        )}
      </form>

      {/* Cart */}
      <CartSheet />

      {/* User Actions */}
      {!isLoading && (
        <>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/20">
                {user.email.charAt(0).toUpperCase()}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-white rounded-2xl border border-surface-200 shadow-xl p-2">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal p-3">
                    <div className="flex flex-col space-y-1.5">
                      <p className="text-sm font-bold text-surface-900 truncate" title={user.email}>
                        {user.email}
                      </p>
                      <p className="text-xs font-medium text-surface-500">
                        Pelanggan Setia
                      </p>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-surface-100 mx-2" />
                <DropdownMenuSeparator className="bg-surface-100 mx-2" />
                <DropdownMenuItem onClick={() => router.push('/dashboard/profile')} className="cursor-pointer hover:bg-brand-50 focus:bg-brand-50 rounded-xl py-2.5 px-3 mx-1 my-1 transition-colors">
                  <div className="flex items-center text-surface-700 hover:text-brand-700">
                    <User className="mr-3 h-4 w-4 text-brand-500" />
                    <span className="font-medium">Profil & Alamat</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/purchases')} className="cursor-pointer hover:bg-brand-50 focus:bg-brand-50 rounded-xl py-2.5 px-3 mx-1 my-1 transition-colors">
                  <div className="flex items-center text-surface-700 hover:text-brand-700">
                    <ShoppingBag className="mr-3 h-4 w-4 text-brand-500" />
                    <span className="font-medium">Pembelian Saya</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-surface-100 mx-2" />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 focus:bg-red-50 rounded-xl py-2.5 px-3 mx-1 my-1 transition-colors">
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="font-medium">Keluar dari Akun</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm font-medium bg-surface-100 hover:bg-surface-200 text-surface-900 py-2 px-4 rounded-full transition-colors"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Masuk</span>
              </Link>

              <Link
                href="/register"
                className="hidden sm:flex items-center gap-2 text-sm font-medium bg-brand-600 hover:bg-brand-700 text-white py-2 px-4 rounded-full transition-colors shadow-sm shadow-brand-500/20"
              >
                Daftar
              </Link>
            </>
          )}
        </>
      )}
    </div>
  );
}
