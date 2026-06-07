"use client";

import { useState, useEffect } from "react";
import { 
  ShoppingBag, Truck, Heart, ArrowRight,
  Flame, Utensils, Coffee, 
  Smile, Star, Package
} from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroAnimation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000); // Ganti slide setiap 4 detik
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] sm:aspect-video rounded-3xl bg-gradient-to-br from-brand-50 to-surface-50 border border-brand-100 shadow-2xl shadow-brand-500/10 p-8 flex flex-col justify-center items-center overflow-hidden">
      {/* Decorative background vines/leaves (Abstract) */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-50 350 C 100 350, 150 150, 300 150 C 400 150, 450 50, 450 -50" stroke="currentColor" strokeWidth="20" strokeLinecap="round" className="text-brand-500" />
        <path d="M-50 250 C 50 250, 100 50, 200 50 C 300 50, 350 -50, 350 -150" stroke="currentColor" strokeWidth="15" strokeLinecap="round" className="text-brand-300" />
      </svg>

      {/* SLIDE 1: Makna Bakey Boo */}
      <div className={cn(
        "absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-700",
        currentSlide === 0 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"
      )}>
        <h3 className="text-sm font-bold text-brand-600 mb-8 uppercase tracking-widest relative z-10 bg-white/80 px-4 py-1 rounded-full backdrop-blur-sm border border-brand-100">
          Dibuat Penuh Cinta
        </h3>
        <div className="flex items-end justify-center gap-6 h-32">
          <div className="flex flex-col items-center animate-in slide-in-from-bottom-8 duration-700 fade-in fill-mode-both">
            <Flame className="w-10 h-10 text-orange-400 mb-2" />
            <div className="h-2 w-12 bg-brand-200 rounded-full"></div>
          </div>
          <div className="flex flex-col items-center animate-in slide-in-from-bottom-12 duration-700 delay-300 fade-in fill-mode-both">
            <Utensils className="w-14 h-14 text-brand-500 mb-2" />
            <div className="h-2 w-16 bg-brand-300 rounded-full"></div>
          </div>
          <div className="flex flex-col items-center animate-in slide-in-from-bottom-16 duration-700 delay-500 fade-in fill-mode-both relative">
            <Star className="w-8 h-8 text-yellow-500 absolute -top-8 -right-4 animate-spin-slow" />
            <Heart className="w-16 h-16 text-red-500 mb-2 fill-red-500" />
            <div className="h-2 w-20 bg-brand-500 rounded-full"></div>
          </div>
        </div>
        <p className="mt-6 text-sm text-surface-600 text-center max-w-[250px] font-medium">
          Roti segar dipanggang setiap hari dengan resep rahasia dan penuh kehangatan.
        </p>
      </div>

      {/* SLIDE 2: Produk Kami */}
      <div className={cn(
        "absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-700",
        currentSlide === 1 ? "opacity-100 translate-x-0" : currentSlide < 1 ? "opacity-0 translate-x-full pointer-events-none" : "opacity-0 -translate-x-full pointer-events-none"
      )}>
        <h3 className="text-sm font-bold text-brand-600 mb-8 uppercase tracking-widest relative z-10 bg-white/80 px-4 py-1 rounded-full backdrop-blur-sm border border-brand-100">
          Koleksi Pilihan
        </h3>
        <div className="flex items-center justify-center gap-6 w-full">
          <div className="flex flex-col items-center gap-3 animate-in zoom-in-75 duration-500 delay-100 fill-mode-both">
            <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shadow-sm">
              <Package className="w-8 h-8" />
            </div>
            <span className="text-xs font-semibold text-surface-600">Roti Manis</span>
          </div>
          <div className="flex flex-col items-center gap-3 animate-in zoom-in-75 duration-500 delay-300 fill-mode-both mt-8">
            <div className="w-20 h-20 rounded-full bg-brand-600 border border-brand-700 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Coffee className="w-10 h-10" />
            </div>
            <span className="text-xs font-semibold text-surface-600">Donat Spesial</span>
          </div>
          <div className="flex flex-col items-center gap-3 animate-in zoom-in-75 duration-500 delay-500 fill-mode-both">
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-sm">
              <Utensils className="w-8 h-8" />
            </div>
            <span className="text-xs font-semibold text-surface-600">Croissant</span>
          </div>
        </div>
      </div>

      {/* SLIDE 3: Cara Kerja */}
      <div className={cn(
        "absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-700",
        currentSlide === 2 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        <h3 className="text-sm font-bold text-brand-600 mb-8 uppercase tracking-widest relative z-10 bg-white/80 px-4 py-1 rounded-full backdrop-blur-sm border border-brand-100">
          Pengiriman Cepat
        </h3>
        <div className="flex items-center justify-between w-full max-w-[320px] mx-auto relative z-10">
          <div className="flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-surface-200 shadow-sm flex items-center justify-center text-brand-600">
              <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <span className="text-xs font-semibold text-surface-600 text-center leading-tight">Pilih<br/>Menu</span>
          </div>

          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-brand-300 animate-pulse" />

          <div className="flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-brand-600 border border-brand-700 shadow-md shadow-brand-500/30 flex items-center justify-center text-white relative">
              <Truck className="w-7 h-7 sm:w-8 sm:h-8" />
              <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 bg-orange-400 rounded-full animate-ping opacity-75"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 bg-orange-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-xs font-semibold text-surface-600 text-center leading-tight">Kami<br/>Antar</span>
          </div>

          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-brand-300 animate-pulse" />

          <div className="flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500 fill-mode-both">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-surface-200 shadow-sm flex items-center justify-center text-brand-600">
              <Smile className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-500" />
            </div>
            <span className="text-xs font-semibold text-surface-600 text-center leading-tight">Nikmati<br/>Segar</span>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 flex gap-2">
        {[0, 1, 2].map((i) => (
          <button 
            key={i} 
            onClick={() => setCurrentSlide(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentSlide === i ? "bg-brand-600 w-4" : "bg-brand-200 hover:bg-brand-300"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
