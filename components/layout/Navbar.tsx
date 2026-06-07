import Link from "next/link";
import { Coffee } from "lucide-react";
import { NavbarActions } from "@/components/layout/NavbarActions";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-surface-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo & Main Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="font-heading font-extrabold text-xl text-brand-700 flex items-center gap-2">
            <Coffee className="size-6 text-brand-500 fill-brand-100" />
            Bakey Boo
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-surface-600">
            <Link href="/products" className="hover:text-brand-600 transition-colors">Semua Menu</Link>
            <Link href="/products?category=aneka-roti" className="hover:text-brand-600 transition-colors">Aneka Roti</Link>
            <Link href="/products?category=donat-spesial" className="hover:text-brand-600 transition-colors">Donat Spesial</Link>
            <Link href="/tentang" className="hover:text-brand-600 transition-colors">Tentang Kami</Link>
          </div>
        </div>

        {/* Search, Cart, User - Delegated to Client Component */}
        <NavbarActions />
      </div>
    </nav>
  );
}
