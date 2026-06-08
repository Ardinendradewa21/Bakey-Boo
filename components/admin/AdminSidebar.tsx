"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  LogOut,
  Leaf,
  Settings,
  Users,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { insforge } from "@/lib/insforge";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Overview" },
  { href: "/admin/products", icon: Package, label: "Produk" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Pesanan" },
  { href: "/admin/reviews", icon: Star, label: "Ulasan" },
  { href: "/admin/users", icon: Users, label: "Pengguna" },
  { href: "/admin/settings", icon: Settings, label: "Pengaturan" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await insforge.auth.signOut();
    try {
      await fetch("/api/auth/session", { method: "DELETE" });
    } catch (e) {
      console.error("Failed to clear session", e);
    }
    window.location.href = "/";
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-surface-200 bg-white transition-transform">
      <div className="flex h-full flex-col px-3 py-4">
        {/* Brand */}
        <div className="mb-8 px-3">
          <Link href="/" className="flex items-center gap-2 font-heading text-xl font-bold text-brand-600">
            <Leaf className="size-6 fill-brand-100 text-brand-500" />
            Admin Panel
          </Link>
        </div>

        {/* Nav Links */}
        <ul className="space-y-2 font-medium">
          {navItems.map((item) => {
            const isActive = 
              item.href === "/admin" 
                ? pathname === "/admin" 
                : pathname?.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                    isActive 
                      ? "bg-brand-50 text-brand-700 font-semibold" 
                      : "text-surface-600 hover:bg-surface-100 hover:text-surface-900"
                  )}
                >
                  <item.icon className={cn("size-5", isActive ? "text-brand-600" : "text-surface-400")} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Footer Actions */}
        <div className="mt-auto pt-4 border-t border-surface-200 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-surface-600 hover:bg-surface-100 transition-colors"
          >
            <LogOut className="size-5 text-surface-400" />
            Ke Halaman Toko
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="size-5 text-red-500" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
