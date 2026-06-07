import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Search } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-4 bg-surface-50 text-center py-20">
        <div className="relative mb-8">
          <div className="text-[120px] md:text-[180px] font-heading font-black text-surface-200/50 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="size-20 md:size-28 text-brand-500 animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-surface-900 mb-4">
          Halaman Tidak Ditemukan
        </h1>
        
        <p className="text-surface-600 mb-8 max-w-md mx-auto">
          Maaf, halaman atau produk yang Anda cari mungkin telah dihapus, diubah namanya, atau sementara tidak tersedia.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className={buttonVariants({ size: "lg", className: "bg-brand-600 hover:bg-brand-700 h-12 px-8" })}>
            Kembali ke Beranda
          </Link>
          <Link href="/products" className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 px-8" })}>
            Jelajahi Produk
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
