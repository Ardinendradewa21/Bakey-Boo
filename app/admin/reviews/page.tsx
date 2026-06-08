"use client";

import { useEffect, useState } from "react";
import { insforge } from "@/lib/insforge";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { Star, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await insforge.database
        .from("reviews")
        .select(`
          id, rating, comment, created_at, buyer_id,
          product:products(id, title, slug)
        `)
        .order("created_at", { ascending: false });

      let reviewsData = data || [];

      // Cross-fetch buyer profiles
      if (reviewsData.length > 0) {
        const buyerIds = [...new Set(reviewsData.map((r: any) => r.buyer_id).filter(Boolean))];
        if (buyerIds.length > 0) {
          const { data: buyers } = await insforge.database
            .from("users_profile")
            .select("user_id, name")
            .in("user_id", buyerIds);
            
          if (buyers) {
            reviewsData = reviewsData.map((r: any) => {
              const buyer = buyers.find((b: any) => b.user_id === r.buyer_id);
              return {
                ...r,
                buyer: buyer ? { name: buyer.name } : { name: "User" }
              };
            });
          }
        }
      }

      setReviews(reviewsData);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      toast.error("Gagal memuat ulasan.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus ulasan ini? Tindakan ini tidak dapat dibatalkan.")) return;
    
    try {
      const { error } = await insforge.database
        .from("reviews")
        .delete()
        .eq("id", reviewId);
        
      if (error) throw error;
      
      toast.success("Ulasan berhasil dihapus");
      setReviews(reviews.filter(r => r.id !== reviewId));
    } catch (err: any) {
      toast.error(`Gagal menghapus ulasan: ${err.message || ""}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Kelola Ulasan</h1>
        <p className="text-surface-500 text-sm mt-1">Lihat dan kelola ulasan produk dari pelanggan</p>
      </div>

      <div className="bg-white rounded-xl border border-surface-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-surface-600">
            <thead className="bg-surface-50 text-surface-900 border-b border-surface-200 font-semibold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Tanggal</th>
                <th className="px-6 py-4">Produk</th>
                <th className="px-6 py-4">Pembeli</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4 min-w-[250px]">Komentar</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-brand-600 mx-auto" />
                  </td>
                </tr>
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-surface-500">
                    Belum ada ulasan produk.
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-surface-500">
                      {formatDistanceToNow(new Date(review.created_at), { addSuffix: true, locale: id })}
                    </td>
                    <td className="px-6 py-4">
                      {review.product ? (
                        <Link href={`/products/${review.product.slug}`} className="text-brand-600 hover:underline font-medium" target="_blank">
                          {review.product.title}
                        </Link>
                      ) : (
                        <span className="text-surface-400 italic">Produk dihapus</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-surface-900">{review.buyer?.name || "User"}</div>
                      {review.buyer?.email && <div className="text-xs text-surface-500">{review.buyer.email}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-0.5 text-star">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`size-4 ${i < review.rating ? "fill-star text-star" : "fill-star-empty text-star-empty"}`} 
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-surface-700">
                      {review.comment || <span className="italic text-surface-400">Tidak ada teks ulasan</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDelete(review.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="size-4 mr-1" />
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
