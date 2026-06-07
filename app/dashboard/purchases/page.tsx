"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { insforge } from "@/lib/insforge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { formatPrice } from "@/lib/utils";
import { Leaf, Package, ExternalLink, Loader2, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export default function PurchasesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserAndFetch();
  }, []);

  const checkUserAndFetch = async () => {
    try {
      // @ts-ignore
      const { data: authData } = await insforge.auth.getCurrentUser();

      if (!authData?.user) {
        router.push("/login");
        return;
      }

      setUser(authData.user);

      // Fetch orders for this user
      const { data: ordersData } = await insforge.database
        .from("orders")
        .select("*, items:order_items(*, product:products(id, title, slug, category, images:product_images(url))), payment:payments(midtrans_response)")
        .eq("buyer_id", authData.user.id)
        .order("created_at", { ascending: false });

      setOrders(ordersData || []);
    } catch (err) {
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
      case "settlement":
      case "capture":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Berhasil</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Menunggu Pembayaran</Badge>;
      default:
        return <Badge className="bg-red-100 text-red-800 border-red-200">Gagal</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-brand-600" />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-surface-50 min-h-screen py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                <ShoppingBag className="size-5 text-brand-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-surface-900">Riwayat Pembelian</h1>
                <p className="text-surface-500 text-sm">Lacak pesanan roti dan donat Anda</p>
              </div>
            </div>
          </div>

          {/* Orders List */}
          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-surface-200 p-16 text-center">
              <div className="w-20 h-20 bg-surface-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="size-10 text-surface-400" />
              </div>
              <h3 className="font-bold text-xl text-surface-900 mb-2">Belum Ada Pembelian</h3>
              <p className="text-surface-500 mb-6">
                Anda belum pernah memesan roti atau donat kami. Cicipi menu lezat kami sekarang!
              </p>
              <Link href="/products" className={buttonVariants({ className: "bg-brand-600 hover:bg-brand-700" })}>
                Jelajahi Menu
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order: any) => (
                <div key={order.id} className="bg-white rounded-2xl border border-surface-200 overflow-hidden">
                  {/* Order Header */}
                  <div className="flex items-center justify-between px-6 py-4 bg-surface-50 border-b border-surface-200">
                    <div>
                      <p className="text-xs text-surface-500 font-mono">Order #{order.id.substring(0, 12)}...</p>
                      <p className="text-sm text-surface-500 mt-0.5">
                        {formatDistanceToNow(new Date(order.created_at), { addSuffix: true, locale: id })}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-surface-900">{formatPrice(order.total_price)}</span>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="divide-y divide-surface-100">
                    {(order.items || []).map((item: any) => {
                      const product = item.product;
                      if (!product) return null;
                      const imageUrl = product.images?.[0]?.url;
                      
                      // Extract variants from JSON if exists
                      let variantFlavor = item.selected_flavor;
                      let variantSize = item.selected_size;
                      let extraMeta: any = null;
                      if (order.payment && order.payment.length > 0 && order.payment[0].midtrans_response) {
                        try {
                          extraMeta = JSON.parse(order.payment[0].midtrans_response);
                          const variant = extraMeta.variants?.find((v: any) => v.id === item.product_id);
                          if (variant) {
                            variantFlavor = variant.flavor;
                            variantSize = variant.size;
                          }
                        } catch(e) {}
                      }

                      return (
                        <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-5">
                          {/* Thumbnail */}
                          <div className="w-16 h-16 rounded-xl bg-surface-100 flex-shrink-0 flex items-center justify-center overflow-hidden relative border border-surface-200">
                            {imageUrl ? (
                              <Image src={imageUrl} alt={product.title} fill className="object-cover" />
                            ) : (
                              <span className="text-xs text-surface-400">No Image</span>
                            )}
                          </div>
                          
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <Link href={`/products/${product.slug}`} className="font-semibold text-surface-900 hover:text-brand-600 transition-colors line-clamp-1">
                              {product.title}
                            </Link>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <p className="text-xs text-surface-500 capitalize">
                                {product.category}
                              </p>
                              {(variantFlavor || variantSize) && (
                                <p className="text-[11px] font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-100">
                                  {variantFlavor} {variantSize && `(${variantSize})`}
                                </p>
                              )}
                            </div>
                            <p className="text-sm font-semibold text-brand-600 mt-1">
                              {formatPrice(item.price)} <span className="text-xs text-surface-400 font-normal">x {item.quantity || 1}</span>
                            </p>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Shipping Info */}
                  {(() => {
                    let shippingInfo: any = null;
                    if (order.payment && order.payment.length > 0 && order.payment[0].midtrans_response) {
                      try {
                        const parsed = JSON.parse(order.payment[0].midtrans_response);
                        shippingInfo = parsed.shipping;
                      } catch(e) {}
                    }
                    // Fallback to order columns if they exist (old orders)
                    const deliveryMethod = shippingInfo?.deliveryMethod || order.delivery_method;
                    const recipientName = shippingInfo?.recipientName || order.recipient_name || order.buyer_email;
                    const phone = shippingInfo?.phone || order.phone;
                    const address = shippingInfo?.address || order.address;

                    if (!deliveryMethod) return null;

                    return (
                      <div className="bg-surface-50 px-6 py-4 border-t border-surface-200 text-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-surface-500 font-medium mb-1">Metode Pengiriman</p>
                            <p className="text-surface-900 capitalize font-semibold">{deliveryMethod}</p>
                          </div>
                          <div>
                            <p className="text-surface-500 font-medium mb-1">Penerima</p>
                            <p className="text-surface-900">{recipientName} • {phone}</p>
                          </div>
                          {deliveryMethod === "delivery" && address && (
                            <div className="sm:col-span-2">
                              <p className="text-surface-500 font-medium mb-1">Alamat Tujuan</p>
                              <p className="text-surface-900 bg-white p-2 border border-surface-200 rounded-lg">{address}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                  
                  {/* End of Order Items */}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
