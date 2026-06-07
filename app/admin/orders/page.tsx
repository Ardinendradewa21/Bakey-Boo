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
import { Eye } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const { data: orders } = await insforge.database
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-900">Daftar Pesanan</h1>
        <p className="text-surface-500 text-sm mt-1">Pantau seluruh riwayat transaksi pelanggan</p>
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
