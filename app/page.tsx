import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomeSearchBar } from "@/components/home/HomeSearchBar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Search, ShieldCheck, Truck, Star, Coffee, Utensils } from "lucide-react";
import { HeroAnimation } from "@/components/home/HeroAnimation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bakey Boo — Freshly Baked, Delivered with Love",
  description: "Nikmati aneka roti dan donat lezat yang dipanggang segar setiap hari dari Bakey Boo. Pesan sekarang dan kami antar dengan penuh cinta.",
  openGraph: {
    title: "Bakey Boo — Freshly Baked, Delivered with Love",
    description: "Nikmati aneka roti dan donat lezat yang dipanggang segar setiap hari dari Bakey Boo.",
    type: "website",
    siteName: "Bakey Boo",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-brand-50 pt-20 pb-28 md:pt-32 md:pb-40">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-200/40 blur-3xl opacity-60"></div>
            <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-surface-200/50 blur-3xl opacity-60"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Hero Text */}
              <div className="space-y-8 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-surface-900 tracking-tight leading-[1.1]">
                  Freshly Baked, <br className="hidden md:block"/>
                  <span className="text-brand-600">Delivered with Love</span>
                </h1>
                
                <p className="text-lg md:text-xl text-surface-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Nikmati aneka roti dan donat lezat yang dipanggang segar setiap hari. Bakey Boo siap mengantarkan kebahagiaan manis langsung ke depan pintu Anda.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <Link 
                    href="/products" 
                    className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto text-lg h-14 px-8 bg-brand-600 hover:bg-brand-700 rounded-full shadow-lg shadow-brand-500/25 transition-all hover:scale-105")}
                  >
                    Lihat Menu Kami
                  </Link>
                </div>
              </div>

              {/* Hero Animation */}
              <div className="w-full">
                <HeroAnimation />
              </div>
            </div>
          </div>
        </section>

        {/* Search Bar - Offset overlapping hero */}
        <div className="container mx-auto px-4 -mt-8 relative z-20">
          <HomeSearchBar />
        </div>

        {/* Features / Trust Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-heading font-bold text-surface-900">Mengapa Memilih Kami?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-surface-900">Bahan Premium</h3>
                <p className="text-surface-600">
                  Semua roti dan donat kami dibuat menggunakan bahan-bahan berkualitas tinggi tanpa pengawet buatan.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-surface-50 flex items-center justify-center text-surface-700">
                  <Truck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-surface-900">Pengiriman Aman</h3>
                <p className="text-surface-600">
                  Pesanan Anda akan diantar dengan aman dan tetap segar hingga sampai di tangan Anda.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-surface-900">Higienis Terjamin</h3>
                <p className="text-surface-600">
                  Standar kebersihan yang ketat diterapkan dari proses pembuatan hingga pengemasan produk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-24 bg-surface-50 border-t border-surface-200">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-heading font-bold text-surface-900 mb-12">Eksplorasi Menu Kategori</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Link href="/products?category=aneka-roti" className="group p-8 bg-white rounded-3xl border border-surface-200 hover:border-brand-300 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <Utensils className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-surface-900 mb-2">Aneka Roti</h3>
                <p className="text-surface-600 text-center max-w-sm">Roti manis, roti tawar, dan croissant hangat siap menemani harimu.</p>
              </Link>

              <Link href="/products?category=donat-spesial" className="group p-8 bg-white rounded-3xl border border-surface-200 hover:border-brand-300 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-surface-100 text-surface-700 flex items-center justify-center mb-6 group-hover:bg-surface-700 group-hover:text-white transition-colors">
                  <Coffee className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-surface-900 mb-2">Donat Spesial</h3>
                <p className="text-surface-600 text-center max-w-sm">Berbagai pilihan donat empuk dengan topping berlimpah dan lumer di mulut.</p>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
