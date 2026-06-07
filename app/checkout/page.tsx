"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { insforge } from "@/lib/insforge";
import { ShieldCheck, ShoppingBag, Loader2, LogIn } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import Script from "next/script";
import Link from "next/link";

export default function CheckoutPage() {
  const cart = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // Auth state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  // Shipping state
  const [recipientName, setRecipientName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // @ts-ignore
      const { data } = await insforge.auth.getCurrentUser();
      setUser(data?.user || null);
    } catch (e) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthLoading(true);
    try {
      if (isRegister) {
        const { error } = await insforge.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Registrasi berhasil! Silakan cek email Anda atau langsung login.");
        setIsRegister(false);
      } else {
        const { data, error } = await insforge.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Login berhasil!");
        if (data) setUser(data.user);
      }
    } catch (error: any) {
      toast.error(error.message || "Terjadi kesalahan otentikasi");
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Silakan login terlebih dahulu");
      return;
    }

    if (cart.items.length === 0) {
      toast.error("Keranjang belanja Anda kosong");
      return;
    }

    if (deliveryMethod === "delivery" && (!recipientName || !phone || !address)) {
      toast.error("Lengkapi data pengiriman", { description: "Nama, No. HP, dan Alamat wajib diisi." });
      return;
    }

    if (deliveryMethod === "pickup" && (!recipientName || !phone)) {
      toast.error("Lengkapi data kontak", { description: "Nama dan No. HP wajib diisi." });
      return;
    }

    setIsProcessing(true);
    try {
      // Create order via API
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          recipientName,
          phone,
          address,
          deliveryMethod,
          items: cart.items.map(item => ({
            productId: item.product.id,
            price: item.product.price,
            quantity: item.quantity,
            selectedFlavor: item.selectedFlavor,
            selectedSize: item.selectedSize,
          })),
          amount: cart.getTotal(),
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Gagal membuat pesanan");
      }

      // Trigger Midtrans Snap Popup
      // @ts-ignore
      if (window.snap && data.token) {
        // @ts-ignore
        window.snap.pay(data.token, {
          onSuccess: function (result: any) {
            toast.success("Pembayaran berhasil!");
            cart.clearCart();
            window.location.href = `/checkout/success?order_id=${result.order_id}`;
          },
          onPending: function (result: any) {
            toast.info("Menunggu pembayaran Anda.");
            cart.clearCart();
            window.location.href = `/checkout/success?order_id=${result.order_id}`;
          },
          onError: function (result: any) {
            toast.error("Pembayaran gagal!");
            setIsProcessing(false);
          },
          onClose: function () {
            toast.info("Anda menutup popup sebelum menyelesaikan pembayaran");
            setIsProcessing(false);
          }
        });
      } else {
        toast.error("Midtrans Snap belum dimuat dengan benar");
        setIsProcessing(false);
      }
    } catch (error: any) {
      toast.error(error.message || "Gagal memproses checkout");
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

  return (
    <>
      {/* Load Midtrans Snap. We use NEXT_PUBLIC_MIDTRANS_CLIENT_KEY */}
      <Script 
        src={process.env.NEXT_PUBLIC_MIDTRANS_ENV === "production" 
          ? "https://app.midtrans.com/snap/snap.js" 
          : "https://app.sandbox.midtrans.com/snap/snap.js"} 
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <Navbar />
      
      <main className="min-h-screen bg-surface-50 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-3xl font-heading font-extrabold text-surface-900 mb-8">
            Checkout Pesanan
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Auth & User Details */}
            <div className="flex-1 space-y-6">
              
              {!user ? (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-surface-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-brand-50 p-2 rounded-lg">
                      <LogIn className="w-6 h-6 text-brand-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-surface-900">
                        Masuk untuk Melanjutkan
                      </h2>
                      <p className="text-surface-500 text-sm">
                        Anda harus login atau mendaftar untuk menyelesaikan pesanan
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleAuth} className="space-y-4 max-w-sm">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-1">Email</label>
                      <Input 
                        type="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@email.com"
                        className="bg-surface-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-1">Password</label>
                      <Input 
                        type="password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-surface-50"
                      />
                    </div>
                    <Button type="submit" className="w-full h-11" disabled={isAuthLoading}>
                      {isAuthLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      {isRegister ? "Daftar Sekarang" : "Masuk"}
                    </Button>
                    <div className="text-center text-sm text-surface-500 mt-4">
                      {isRegister ? "Sudah punya akun? " : "Belum punya akun? "}
                      <button 
                        type="button" 
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-brand-600 font-semibold hover:underline"
                      >
                        {isRegister ? "Masuk" : "Daftar"}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-100 rounded-full flex items-center justify-center text-surface-500 font-bold text-lg">
                      {user.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm text-surface-500">Masuk sebagai</p>
                      <p className="font-semibold text-surface-900">{user.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={async () => {
                    await insforge.auth.signOut();
                    setUser(null);
                  }}>
                    Keluar
                  </Button>
                </div>
              )}

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-surface-200 shadow-sm">
                <h3 className="font-bold text-lg text-surface-900 mb-6 border-b border-surface-100 pb-4">
                  Informasi Pengiriman
                </h3>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1">Metode Pengiriman</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="delivery" value="delivery" checked={deliveryMethod === "delivery"} onChange={() => setDeliveryMethod("delivery")} className="accent-brand-600" />
                        <span className="text-sm text-surface-800">Kirim ke Alamat</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="delivery" value="pickup" checked={deliveryMethod === "pickup"} onChange={() => setDeliveryMethod("pickup")} className="accent-brand-600" />
                        <span className="text-sm text-surface-800">Ambil di Toko (Pickup)</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-1">Nama Penerima</label>
                      <Input 
                        type="text" 
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="Cth: Budi Santoso"
                        disabled={!user}
                        className="bg-surface-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-1">No. WhatsApp / HP</label>
                      <Input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Cth: 081234567890"
                        disabled={!user}
                        className="bg-surface-50"
                      />
                    </div>
                  </div>

                  {deliveryMethod === "delivery" && (
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-1">Alamat Lengkap</label>
                      <textarea 
                        className="w-full min-h-[100px] p-3 rounded-lg border border-surface-200 bg-surface-50 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all disabled:opacity-50 resize-none"
                        placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, kota, kode pos."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        disabled={!user}
                      />
                    </div>
                  )}

                  {deliveryMethod === "pickup" && (
                    <div className="bg-brand-50 p-4 rounded-lg border border-brand-100 text-sm text-brand-800">
                      <strong>Lokasi Pengambilan:</strong> Bakey Boo Bakery, Jl. Sudirman No. 123, Jakarta Selatan. Kami akan menghubungi Anda saat pesanan siap diambil.
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-surface-200 shadow-sm">
                <h3 className="font-bold text-lg text-surface-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  Pembayaran Aman
                </h3>
                <p className="text-surface-600 text-sm leading-relaxed">
                  Transaksi Anda diproses secara aman menggunakan enkripsi 256-bit oleh Midtrans. 
                  Pesanan akan segera kami proses setelah pembayaran berhasil dikonfirmasi.
                </p>
              </div>

            </div>

            {/* Right Column: Order Summary */}
            <div className="w-full lg:w-96 shrink-0">
              <div className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm sticky top-24">
                <h3 className="font-bold text-lg text-surface-900 mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Ringkasan Pesanan
                </h3>

                {cart.items.length === 0 ? (
                  <div className="text-center py-6 text-surface-500">
                    <p>Keranjang masih kosong</p>
                    <Link href="/products" className="mt-2 text-brand-600 hover:underline">
                      Mulai Belanja
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.items.map((item, index) => (
                        <div key={`${item.product.id}-${item.selectedFlavor}-${item.selectedSize}-${index}`} className="flex gap-3">
                          <div className="relative w-16 h-12 rounded bg-surface-100 overflow-hidden shrink-0 border border-surface-200">
                            <Image
                              src={item.product.images?.[0]?.url || "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=300"}
                              alt={item.product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-surface-900 truncate">
                              {item.product.title}
                            </p>
                            {(item.selectedFlavor || item.selectedSize) && (
                              <p className="text-[11px] text-surface-500 mt-0.5">
                                {item.selectedFlavor} {item.selectedSize && `(${item.selectedSize})`}
                              </p>
                            )}
                            <p className="text-xs text-surface-500 mt-0.5">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-sm font-bold text-surface-900 shrink-0">
                            {formatPrice(item.product.price * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-surface-100 pt-4 space-y-3">
                      <div className="flex justify-between text-sm text-surface-600">
                        <span>Subtotal</span>
                        <span>{formatPrice(cart.getTotal())}</span>
                      </div>
                      <div className="flex justify-between text-sm text-surface-600">
                        <span>Pajak (0%)</span>
                        <span>Rp 0</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-surface-900 pt-2 border-t border-surface-100">
                        <span>Total Pembayaran</span>
                        <span className="text-brand-600">{formatPrice(cart.getTotal())}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-6 h-12 text-base font-semibold shadow-md shadow-brand-500/20"
                      onClick={handleCheckout}
                      disabled={isProcessing || !user || cart.items.length === 0}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Memproses...
                        </>
                      ) : (
                        `Bayar ${formatPrice(cart.getTotal())}`
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
