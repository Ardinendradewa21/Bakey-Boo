import { insforge } from "@/lib/insforge";
import { formatPrice } from "@/lib/utils";
import { DollarSign, Package, ShoppingCart, Eye, TrendingUp, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { RevenueChart } from "@/components/admin/RevenueChart";

async function getStats() {
  try {
    // Fetch total products
    const { count: productCount } = await insforge.database
      .from("products")
      .select("*", { count: "exact", head: true });

    // Fetch total orders
    const { count: orderCount } = await insforge.database
      .from("orders")
      .select("*", { count: "exact", head: true });

    // Fetch all completed orders to calculate revenue
    const { data: orders } = await insforge.database
      .from("orders")
      .select("total_price, created_at")
      .eq("status", "completed");

    const totalRevenue = orders?.reduce((acc, order) => acc + (order.total_price || 0), 0) || 0;

    // Total views (sum of view_count across all products)
    const { data: productsViewData } = await insforge.database
      .from("products")
      .select("id, title, view_count, price")
      .order("view_count", { ascending: false });
    
    const totalViews = productsViewData?.reduce((acc, prod) => acc + (prod.view_count || 0), 0) || 0;
    const topProducts = productsViewData?.slice(0, 5) || [];

    // Recent orders
    const { data: recentOrders } = await insforge.database
      .from("orders")
      .select("id, total_price, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5);

    // Chart Data (Last 7 Days)
    const chartDataMap: Record<string, number> = {};
    const today = new Date();
    // Inisialisasi 7 hari terakhir
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateString = d.toLocaleDateString("id-ID", { weekday: 'short' }); // e.g. "Sen"
      chartDataMap[dateString] = 0;
    }
    
    orders?.forEach((order) => {
      const orderDate = new Date(order.created_at);
      // Filter out orders older than 7 days
      const diffTime = Math.abs(today.getTime() - orderDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      if (diffDays <= 7) {
        const dateString = orderDate.toLocaleDateString("id-ID", { weekday: 'short' });
        if (chartDataMap[dateString] !== undefined) {
           chartDataMap[dateString] += (order.total_price || 0);
        }
      }
    });

    const chartData = Object.keys(chartDataMap).map(key => ({
      date: key,
      revenue: chartDataMap[key]
    }));

    return {
      productCount: productCount || 0,
      orderCount: orderCount || 0,
      totalRevenue,
      totalViews,
      topProducts,
      recentOrders: recentOrders || [],
      chartData,
    };
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    return { productCount: 0, orderCount: 0, totalRevenue: 0, totalViews: 0, topProducts: [], recentOrders: [], chartData: [] };
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-surface-900">
          Dashboard Overview
        </h1>
        <p className="text-surface-500 mt-1">
          Pantau performa toko Bakey Boo hari ini.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Revenue Card */}
        <div className="bg-white p-6 rounded-xl border border-surface-200 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-surface-600 text-sm">Total Pendapatan</h3>
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="size-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-surface-900">
            {formatPrice(stats.totalRevenue)}
          </p>
        </div>

        {/* Orders Card */}
        <div className="bg-white p-6 rounded-xl border border-surface-200 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-surface-600 text-sm">Total Pesanan</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <ShoppingCart className="size-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-surface-900">
            {stats.orderCount}
          </p>
        </div>

        {/* Products Card */}
        <div className="bg-white p-6 rounded-xl border border-surface-200 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-surface-600 text-sm">Total Produk</h3>
            <div className="p-2 bg-purple-50 rounded-lg">
              <Package className="size-5 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-surface-900">
            {stats.productCount}
          </p>
        </div>

        {/* Views Card */}
        <div className="bg-white p-6 rounded-xl border border-surface-200 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-surface-600 text-sm">Total Kunjungan</h3>
            <div className="p-2 bg-orange-50 rounded-lg">
              <Eye className="size-5 text-orange-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-surface-900">
            {stats.totalViews}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <RevenueChart data={stats.chartData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Products */}
        <div className="bg-white rounded-xl border border-surface-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-surface-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-surface-900 flex items-center gap-2">
              <TrendingUp className="size-5 text-brand-500" />
              Produk Terpopuler
            </h2>
            <Link href="/admin/products" className="text-sm font-medium text-brand-600 hover:text-brand-700">Lihat Semua</Link>
          </div>
          <div className="p-6">
            {stats.topProducts.length === 0 ? (
              <div className="text-center py-8 text-surface-500">
                <AlertCircle className="size-8 mx-auto mb-3 text-surface-300" />
                <p>Belum ada produk yang dilihat</p>
              </div>
            ) : (
              <div className="space-y-6">
                {stats.topProducts.map((product: any, index: number) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-100 text-surface-600 font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-surface-900 line-clamp-1">{product.title}</p>
                        <p className="text-xs text-surface-500 mt-1">{formatPrice(product.price)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full text-xs font-medium">
                      <Eye className="size-3" />
                      {product.view_count || 0}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-surface-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-surface-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-surface-900 flex items-center gap-2">
              <Clock className="size-5 text-brand-500" />
              Pesanan Terbaru
            </h2>
            <Link href="/admin/orders" className="text-sm font-medium text-brand-600 hover:text-brand-700">Lihat Semua</Link>
          </div>
          <div className="p-6">
            {stats.recentOrders.length === 0 ? (
              <div className="text-center py-8 text-surface-500">
                <ShoppingCart className="size-8 mx-auto mb-3 text-surface-300" />
                <p>Belum ada pesanan terbaru</p>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentOrders.map((order: any) => (
                  <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border border-surface-100 bg-surface-50">
                    <div>
                      <p className="font-mono text-xs text-surface-500 mb-1">#{order.id.substring(0,8).toUpperCase()}</p>
                      <p className="font-medium text-surface-900">{formatPrice(order.total_price)}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        order.status === 'failed' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status === 'completed' ? 'Berhasil' : order.status === 'failed' ? 'Gagal' : 'Pending'}
                      </span>
                      <p className="text-xs text-surface-500 mt-1">
                        {new Date(order.created_at).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Action */}
      <div className="bg-gradient-to-r from-brand-50 to-brand-100 p-8 rounded-3xl border border-brand-200 relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-2xl font-bold text-brand-900 mb-2">
            Selamat Datang di Admin Panel!
          </h2>
          <p className="text-brand-700 mb-6">
            Di sini Anda bisa mengontrol semua aspek penjualan Bakey Boo Anda. Tambahkan produk roti dan donat baru untuk meningkatkan pendapatan.
          </p>
        </div>
        <TrendingUp className="absolute -right-4 -bottom-4 size-48 text-brand-500 opacity-10" />
      </div>
    </div>
  );
}
