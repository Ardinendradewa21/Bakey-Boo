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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

export default function PurchasesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Review state
  const [reviewOrderId, setReviewOrderId] = useState<string | null>(null);
  const [reviewProductId, setReviewProductId] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

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

  const submitReview = async () => {
    if (!reviewOrderId || !reviewProductId || !user) return;
    setIsSubmittingReview(true);
    try {
      const { error } = await insforge.database
        .from("reviews")
        .insert({
          product_id: reviewProductId,
          user_id: user.id,
          order_id: reviewOrderId,
          rating,
          comment: reviewText
        });
        
      if (error) throw error;
      
      toast.success("Ulasan berhasil dikirim!");
      setReviewOrderId(null);
      setReviewText("");
      setRating(5);
      
      // Optionally re-fetch orders or mark the item as reviewed locally
      // For now, simple re-fetch
      checkUserAndFetch();
    } catch (err) {
      toast.error("Gagal mengirim ulasan.");
    } finally {
      setIsSubmittingReview(false);
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
                          <div className="w-20 h-20 rounded-xl bg-surface-100 flex-shrink-0 flex items-center justify-center overflow-hidden relative border border-surface-200">
                            {imageUrl ? (
                              <Image src={imageUrl} alt={product.title} fill className="object-cover" />
                            ) : (
                              <span className="text-xs text-surface-400">No Image</span>
                            )}
                          </div>
                          
                          {/* Info */}
                          <div className="flex-1 min-w-0 flex flex-col sm:flex-row justify-between w-full gap-4">
                            <div>
                              <Link href={`/products/${product.slug}`} className="font-semibold text-lg text-surface-900 hover:text-brand-600 transition-colors line-clamp-1">
                                {product.title}
                              </Link>
                              <div className="flex flex-wrap items-center gap-2 mt-1 mb-2">
                                <p className="text-sm text-surface-500 capitalize">
                                  {product.category}
                                </p>
                                {(variantFlavor || variantSize) && (
                                  <p className="text-xs font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-100">
                                    {variantFlavor} {variantSize && `(${variantSize})`}
                                  </p>
                                )}
                              </div>
                              <p className="text-sm font-semibold text-surface-700">
                                {formatPrice(item.price)} <span className="text-surface-400 font-normal">x {item.quantity || 1}</span>
                              </p>
                            </div>
                            
                            {/* Action / Price */}
                            <div className="flex flex-col items-end justify-between">
                              <p className="font-bold text-brand-600">
                                {formatPrice(item.price * (item.quantity || 1))}
                              </p>
                              
                              {(order.status === "completed" || order.status === "capture" || order.status === "settlement") && (
                                <Dialog open={reviewOrderId === order.id && reviewProductId === product.id} onOpenChange={(open) => {
                                  if (open) {
                                    setReviewOrderId(order.id);
                                    setReviewProductId(product.id);
                                  } else {
                                    setReviewOrderId(null);
                                  }
                                }}>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="mt-2 h-8 text-xs font-semibold text-brand-700 border-brand-200 hover:bg-brand-50">
                                      Beri Ulasan
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                      <DialogTitle>Beri Ulasan Produk</DialogTitle>
                                      <DialogDescription>
                                        Bagaimana pendapat Anda tentang {product.title}?
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4 space-y-4">
                                      <div className="flex items-center justify-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                          >
                                            <Star 
                                              className={`w-8 h-8 ${rating >= star ? 'fill-star text-star' : 'text-surface-300'}`} 
                                            />
                                          </button>
                                        ))}
                                      </div>
                                      <Textarea
                                        placeholder="Tulis ulasan Anda di sini..."
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        className="min-h-[100px]"
                                      />
                                      <Button 
                                        className="w-full bg-brand-600 hover:bg-brand-700" 
                                        onClick={submitReview}
                                        disabled={isSubmittingReview}
                                      >
                                        {isSubmittingReview ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Kirim Ulasan"}
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </div>
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
                        <div className="flex flex-col sm:flex-row justify-between gap-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
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
                          <div className="bg-white p-4 rounded-xl border border-surface-200 min-w-[200px] flex flex-col justify-center">
                            <p className="text-surface-500 font-medium mb-1">Total Belanja</p>
                            <p className="text-2xl font-extrabold text-brand-600">{formatPrice(order.total_price)}</p>
                          </div>
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
