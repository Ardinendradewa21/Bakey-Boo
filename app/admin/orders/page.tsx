import { insforge } from "@/lib/insforge";
import { formatPrice } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Search } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const dateFilter = typeof params.date === "string" ? params.date : "";

  let query = insforge.database
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (dateFilter) {
    // start of day WIB (+07:00)
    const startDate = new Date(`${dateFilter}T00:00:00+07:00`).toISOString();
    // end of day WIB
    const endDate = new Date(`${dateFilter}T23:59:59+07:00`).toISOString();
    query = query.gte("created_at", startDate).lte("created_at", endDate);
  }

  const { data: orders } = await query;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
      case "settlement":
      case "capture":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Berhasil</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Menunggu</Badge>;
      case "failed":
      case "expire":
      case "cancel":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Gagal</Badge>;
      default:
        return <Badge className="bg-surface-100 text-surface-800">{status}</Badge>;
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Daftar Pesanan</h1>
          <p className="text-surface-500 text-sm mt-1">Pantau seluruh riwayat transaksi pelanggan</p>
        </div>
        
        <form className="flex items-center gap-2 bg-white p-1 rounded-lg border border-surface-200 shadow-sm">
          <input 
            type="date" 
            name="date"
            defaultValue={dateFilter}
            className="text-sm px-3 py-1.5 focus:outline-none bg-transparent"
          />
          <button type="submit" className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-md font-medium text-sm transition-colors flex items-center gap-1.5">
            <Search className="size-3.5" />
            Filter
          </button>
          {dateFilter && (
            <Link href="/admin/orders" className="px-3 py-1.5 bg-surface-100 hover:bg-surface-200 text-surface-600 rounded-md font-medium text-sm transition-colors">
              Reset
            </Link>
          )}
        </form>
      </div>

      <div className="rounded-xl border border-surface-200 bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-surface-50">
            <TableRow>
              <TableHead className="w-[120px]">Order ID</TableHead>
              <TableHead>Pembeli</TableHead>
              <TableHead>Total Harga</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!orders || orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-surface-500">
                  Belum ada transaksi.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order: any) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs text-surface-600">
                    {order.id.split("-")[1] || order.id.substring(0, 8)}
                  </TableCell>
                  <TableCell className="font-medium text-surface-900">
                    {order.buyer_id ? "Pelanggan Terdaftar" : "Guest"}
                  </TableCell>
                  <TableCell className="font-semibold">{formatPrice(order.total_price)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-sm text-surface-500">
                    {formatDistanceToNow(new Date(order.created_at), { addSuffix: true, locale: id })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link 
                      href={`/admin/orders/${order.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-100 hover:bg-surface-200 text-surface-700 text-xs font-medium rounded-md transition-colors"
                    >
                      <Eye className="size-3.5" />
                      Detail
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
