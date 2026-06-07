"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, User, LogOut, ShoppingBag } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    insforge.auth.getCurrentUser().then(({ data, error }) => {
      setUser(data?.user || null);
      setIsLoading(false);
    });
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
      <form onSubmit={handleSearch} className="hidden md:flex relative w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-surface-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari roti, donat..."
          className="w-full bg-surface-50 border border-surface-200 rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
        />
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
