import { insforge } from "@/lib/insforge";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, CreditCard, ShoppingBag, Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { OrderActions } from "./OrderActions";

export const dynamic = 'force-dynamic';

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  // Fetch order details with joined items and payment
  const { data: order, error: orderError } = await insforge.database
    .from("orders")
    .select("*, items:order_items(*, product:products(id, title, slug, category, images:product_images(url))), payment:payments(*)")
    .eq("id", resolvedParams.id)
    .single();

  if (orderError || !order) {
    notFound();
  }

  let orderItems = order.items || [];
  const payment = order.payment && order.payment.length > 0 ? order.payment[0] : null;

  // Fallback if order_items are missing (e.g. failed to insert due to RLS)
  if (orderItems.length === 0 && payment?.midtrans_response) {
    try {
      const meta = JSON.parse(payment.midtrans_response);
      if (meta.variants && meta.variants.length > 0) {
        const productIds = meta.variants.map((v: any) => v.id);
        const { data: productsData } = await insforge.database
          .from("products")
          .select("id, title, slug, price, category, images:product_images(url)")
          .in("id", productIds);
        
        if (productsData) {
          orderItems = meta.variants.map((v: any) => {
            const p = productsData.find((p: any) => p.id === v.id);
            return {
              id: v.id + "-fallback",
              product_id: v.id,
              price: v.price || (p ? p.price : 0),
              quantity: v.quantity || 1,
              selected_flavor: v.flavor,
              selected_size: v.size,
              product: p
            };
          });
        }
      }
    } catch(e) {}
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
      case "settlement":
      case "capture":
        return {
          label: "Berhasil",
          icon: <CheckCircle className="size-5 text-green-600" />,
          bgColor: "bg-green-50",
          textColor: "text-green-700",
          borderColor: "border-green-200"
        };
      case "pending":
        return {
          label: "Menunggu Pembayaran",
          icon: <Clock className="size-5 text-yellow-600" />,
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-700",
          borderColor: "border-yellow-200"
        };
      case "failed":
      case "expire":
      case "cancel":
        return {
          label: "Gagal / Dibatalkan",
          icon: <AlertCircle className="size-5 text-red-600" />,
          bgColor: "bg-red-50",
          textColor: "text-red-700",
          borderColor: "border-red-200"
        };
      default:
        return {
          label: status,
          icon: <AlertCircle className="size-5 text-surface-600" />,
          bgColor: "bg-surface-50",
          textColor: "text-surface-700",
          borderColor: "border-surface-200"
        };
    }
  };

  const statusConfig = getStatusConfig(order.status);

  // Extract shipping info from payment response
  let shippingInfo: any = null;
  if (payment?.midtrans_response) {
    try {
      const parsed = JSON.parse(payment.midtrans_response);
      shippingInfo = parsed.shipping;
    } catch (e) {}
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link 
          href="/admin/orders" 
          className="p-2 bg-white border border-surface-200 rounded-lg hover:bg-surface-50 transition-colors"
        >
          <ArrowLeft className="size-5 text-surface-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-surface-900 flex items-center gap-3">
            Detail Pesanan
            <Badge className={`${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor} border font-medium`}>
              {statusConfig.label}
            </Badge>
          </h1>
          <p className="text-surface-500 font-mono text-sm mt-1">ID: {order.id}</p>
        </div>
        <div className="ml-auto">
          <OrderActions orderId={order.id} currentStatus={order.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Order Items & Payment Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-200 flex items-center gap-2 bg-surface-50/50">
              <ShoppingBag className="size-5 text-surface-500" />
              <h2 className="font-semibold text-surface-900">Produk yang Dibeli</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {orderItems?.map((item: any, index: number) => {
                  const product = item.product || item.products;
                  
                  // Extract variants from payment info if exists
                  let variantFlavor = item.selected_flavor;
                  let variantSize = item.selected_size;
                  if (shippingInfo && shippingInfo.variants) {
                    const variant = shippingInfo.variants.find((v: any) => v.id === item.product_id);
                    if (variant) {
                      variantFlavor = variant.flavor;
                      variantSize = variant.size;
                    }
                  }

                  return (
                  <div key={`${item.id}-${index}`} className="flex gap-4 p-4 rounded-lg border border-surface-100 bg-surface-50/30">
                    <div className="w-16 h-16 bg-surface-100 rounded-md flex items-center justify-center overflow-hidden shrink-0 relative border border-surface-200">
                      {product?.images?.[0]?.url ? (
                        <img src={product.images[0].url} alt={product.title} className="w-full h-full object-cover" />
                      ) : (
                        <ShoppingBag className="size-6 text-surface-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Link href={`/product/${product?.slug}`} className="font-medium text-surface-900 hover:text-brand-600 transition-colors line-clamp-1">
                        {product?.title || 'Produk Tidak Ditemukan'}
                      </Link>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <p className="text-sm text-surface-500 capitalize">{product?.category || '-'}</p>
                        {(variantFlavor || variantSize) && (
                          <p className="text-xs font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-100">
                            {variantFlavor} {variantSize && `(${variantSize})`}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-surface-900">{formatPrice(item.price)}</p>
                      <p className="text-xs text-surface-500 mt-1">Qty: {item.quantity || 1}</p>
                    </div>
                  </div>
                )})}
              </div>

              {/* Total Calculation */}
              <div className="mt-6 pt-6 border-t border-surface-200 space-y-3">
                <div className="flex justify-between text-sm text-surface-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.total_price)}</span>
                </div>
                {/* Asumsi tidak ada pajak/ongkir untuk produk digital */}
                <div className="flex justify-between font-bold text-lg text-surface-900 pt-3 border-t border-surface-200 border-dashed">
                  <span>Total Bayar</span>
                  <span className="text-brand-600">{formatPrice(order.total_price)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          {shippingInfo && (
            <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-surface-200 flex items-center gap-2 bg-surface-50/50">
                <ShoppingBag className="size-5 text-surface-500" />
                <h2 className="font-semibold text-surface-900">Rincian Pengiriman</h2>
              </div>
              <div className="p-6">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <dt className="text-sm font-medium text-surface-500">Metode Pengiriman</dt>
                    <dd className="mt-1 text-sm font-semibold text-surface-900 capitalize">
                      {shippingInfo.deliveryMethod}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-surface-500">Penerima</dt>
                    <dd className="mt-1 text-sm text-surface-900">
                      {shippingInfo.recipientName} • {shippingInfo.phone}
                    </dd>
                  </div>
                  {shippingInfo.deliveryMethod === "delivery" && (
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-surface-500">Alamat Lengkap</dt>
                      <dd className="mt-1 text-sm text-surface-900 bg-surface-50 p-3 rounded-lg border border-surface-200">
                        {shippingInfo.address}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          )}

          {/* Payment Info */}
          <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-200 flex items-center gap-2 bg-surface-50/50">
              <CreditCard className="size-5 text-surface-500" />
              <h2 className="font-semibold text-surface-900">Rincian Pembayaran</h2>
            </div>
            <div className="p-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <dt className="text-sm font-medium text-surface-500">Metode Pembayaran</dt>
                  <dd className="mt-1 text-sm font-semibold text-surface-900 uppercase">
                    {payment?.payment_method?.replace(/_/g, ' ') || 'Belum dipilih'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-surface-500">Transaction ID (Midtrans)</dt>
                  <dd className="mt-1 text-sm font-mono text-surface-900">
                    {payment?.transaction_id || '-'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-surface-500">Status Pembayaran</dt>
                  <dd className="mt-1 text-sm text-surface-900 capitalize">
                    {payment?.status || order.status}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-surface-500">Waktu Pembayaran</dt>
                  <dd className="mt-1 text-sm text-surface-900">
                    {payment?.midtrans_response?.settlement_time 
                      ? format(new Date(payment.midtrans_response.settlement_time), "d MMMM yyyy HH:mm", { locale: idLocale }) 
                      : '-'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Right Column: Customer & Timeline */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-200 flex items-center gap-2 bg-surface-50/50">
              <User className="size-5 text-surface-500" />
              <h2 className="font-semibold text-surface-900">Informasi Pelanggan</h2>
            </div>
            <div className="p-6">
              {shippingInfo ? (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                    {shippingInfo.recipientName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-surface-900">{shippingInfo.recipientName}</h3>
                    <p className="text-sm text-surface-500 mt-0.5 break-all">ID: {order.buyer_id}</p>
                    {shippingInfo.phone && (
                      <p className="text-sm text-surface-600 mt-2">{shippingInfo.phone}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <User className="size-8 mx-auto text-surface-300 mb-2" />
                  <p className="text-sm text-surface-500">Pelanggan</p>
                  <p className="text-xs text-surface-400 mt-1 font-mono">{order.buyer_id}</p>
                </div>
              )}
            </div>
          </div>

          {/* Timestamp Info */}
          <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-200 flex items-center gap-2 bg-surface-50/50">
              <Calendar className="size-5 text-surface-500" />
              <h2 className="font-semibold text-surface-900">Waktu Pesanan</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Clock className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-surface-900">Dibuat pada</p>
                  <p className="text-xs text-surface-500 mt-0.5">
                    {format(new Date(order.created_at), "EEEE, d MMMM yyyy HH:mm", { locale: idLocale })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
