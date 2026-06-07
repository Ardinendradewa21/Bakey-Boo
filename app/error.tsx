"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface-50 py-20 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-surface-200">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="size-10" />
            </div>
            
            <h1 className="text-3xl font-heading font-extrabold text-surface-900 mb-4">
              Oops! Ovennya Kepanasan
            </h1>
            <p className="text-surface-600 mb-8 leading-relaxed">
              Maaf, terjadi kesalahan teknis saat memuat halaman ini. Tim teknisi kami sedang memperbaikinya agar Anda bisa segera menikmati roti hangat kembali.
            </p>
            
            <button
              onClick={() => reset()}
              className={cn(buttonVariants({ size: "lg" }), "w-full bg-brand-600 hover:bg-brand-700 text-white rounded-xl h-14 flex items-center gap-2 text-lg transition-transform hover:scale-105")}
            >
              <RefreshCw className="size-5" />
              Coba Lagi
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
