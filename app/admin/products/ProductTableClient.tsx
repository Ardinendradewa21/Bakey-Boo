"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { deleteProduct } from "./actions";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Edit, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function ProductTableClient({ initialProducts }: { initialProducts: Product[] }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus produk "${title}"?`)) return;
    
    setIsDeleting(id);
    const result = await deleteProduct(id);
    
    if (result.success) {
      toast.success("Produk berhasil dihapus");
    } else {
      toast.error(result.error);
    }
    
    setIsDeleting(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Daftar Produk</h1>
          <p className="text-surface-500 text-sm mt-1">Kelola semua produk digital Tumbuh Merekah</p>
        </div>
        <Link href="/admin/products/new" className={buttonVariants({ className: "bg-brand-600 hover:bg-brand-700" })}>
            <Plus className="size-4 mr-2" />
            Tambah Produk
        </Link>
      </div>

      <div className="rounded-xl border border-surface-200 bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-surface-50">
            <TableRow>
              <TableHead className="w-[300px]">Nama Produk</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead className="text-center">Dilihat</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-surface-500">
                  Belum ada produk. Tambahkan produk pertama Anda!
                </TableCell>
              </TableRow>
            ) : (
              initialProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium text-surface-900">
                    <span className="line-clamp-1">{product.title}</span>
                  </TableCell>
                  <TableCell className="capitalize">{product.category}</TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="font-mono bg-surface-100 text-surface-700">
                      {product.view_count || 0}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {product.is_published ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Eye className="size-3 mr-1" /> Published
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-surface-100 text-surface-600 border-surface-200">
                        <EyeOff className="size-3 mr-1" /> Draft
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/products/${product.id}/edit`} className={buttonVariants({ variant: "outline", size: "sm", className: "h-8" })}>
                          <Edit className="size-4 mr-1" /> Edit
                      </Link>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="h-8"
                        onClick={() => handleDelete(product.id, product.title)}
                        disabled={isDeleting === product.id}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
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
