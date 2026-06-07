"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, ArrowRight, Mail, ExternalLink, Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { insforge } from "@/lib/insforge";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const statusCode = searchParams.get("status_code");
  const transactionStatus = searchParams.get("transaction_status");
  
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // @ts-ignore
    insforge.auth.getCurrentUser().then(({ data }: any) => setUser(data?.user));
  }, []);

  return (
    <div className="bg-white p-8 sm:p-12 rounded-3xl border border-surface-200 shadow-xl max-w-2xl w-full text-center relative overflow-hidden">
      {/* Decorative top pattern */}
      <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600"></div>
      
      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-12 h-12 text-green-500" />
      </div>
      
      <h1 className="text-3xl font-heading font-extrabold text-surface-900 mb-4">
        Pesanan Berhasil Dibuat!
      </h1>
      
      <p className="text-surface-600 text-lg mb-8 max-w-lg mx-auto">
        Terima kasih atas pesanan Anda. Kami sedang memproses transaksi Anda.
      </p>

      <div className="bg-surface-50 p-6 rounded-2xl border border-surface-200 mb-8 max-w-md mx-auto text-left">
        <div className="flex justify-between items-center mb-3">
          <span className="text-surface-500 text-sm">Order ID</span>
          <span className="font-mono font-semibold text-surface-900">{orderId || "M-TXN-XXXXXXXX"}</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-surface-500 text-sm">Status</span>
          <span className="bg-green-100 text-green-700 font-bold px-2.5 py-0.5 rounded-md text-sm">
            {transactionStatus === "pending" ? "Menunggu Pembayaran" : "Berhasil / Diproses"}
          </span>
        </div>
        {user && (
          <div className="flex justify-between items-center">
            <span className="text-surface-500 text-sm">Email Akun</span>
            <span className="font-medium text-surface-900 text-sm">{user.email}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/dashboard/purchases" className={buttonVariants({ className: "w-full sm:w-auto h-12 rounded-xl bg-brand-600 hover:bg-brand-700" })}>
            Lacak Pesanan
            <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
        <Link href="/" className={buttonVariants({ variant: "outline", className: "w-full sm:w-auto h-12 rounded-xl" })}>
            Kembali ke Beranda
        </Link>
      </div>

      <div className="mt-10 pt-6 border-t border-surface-100 flex items-center justify-center gap-2 text-sm text-surface-500">
        <Mail className="w-4 h-4" />
        Bukti transaksi dan rincian pengiriman juga telah dikirimkan ke email Anda.
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface-50 py-12 px-4 flex items-center justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <Suspense fallback={
          <div className="p-12 text-center flex flex-col items-center">
            <Loader2 className="w-8 h-8 animate-spin text-brand-600 mb-4" />
            <p className="text-surface-600">Memuat status pesanan...</p>
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
