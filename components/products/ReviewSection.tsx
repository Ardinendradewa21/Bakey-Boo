import { Review } from "@/types";
import { Star } from "lucide-react";

interface ReviewSectionProps {
  reviews: Review[];
  ratingAvg: number;
  reviewCount: number;
}

export function ReviewSection({ reviews, ratingAvg, reviewCount }: ReviewSectionProps) {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-surface-200">
      <h3 className="font-heading font-bold text-2xl text-surface-900 mb-6">Ulasan Pembeli</h3>
      
      {reviewCount > 0 ? (
        <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-surface-100">
          <div className="flex flex-col items-center justify-center bg-surface-50 rounded-2xl p-6 min-w-[200px]">
            <div className="text-5xl font-heading font-black text-surface-900 mb-2">
              {ratingAvg.toFixed(1)}
            </div>
            <div className="flex gap-1 mb-2 text-star">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`size-5 ${i < Math.round(ratingAvg) ? "fill-star" : "fill-star-empty text-star-empty"}`} />
              ))}
            </div>
            <div className="text-sm text-surface-500 font-medium">
              Dari {reviewCount} ulasan
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center gap-2">
            {/* Simulasi rating bars */}
            {[5, 4, 3, 2, 1].map((rating) => {
              // Simulasi data untuk demo
              const percentage = rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 10 : 0;
              return (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12 text-sm font-medium text-surface-700">
                    {rating} <Star className="size-3 fill-star text-star" />
                  </div>
                  <div className="flex-1 h-2 bg-surface-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-star rounded-full" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="w-8 text-right text-xs text-surface-500">{percentage}%</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-10 bg-surface-50 rounded-2xl mb-8">
          <span className="text-surface-500">Belum ada ulasan untuk produk ini.</span>
        </div>
      )}

      {/* Review List */}
      {reviews && reviews.length > 0 && (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="pb-6 border-b border-surface-100 last:border-0 last:pb-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-bold">
                    {review.buyer?.name?.substring(0, 1) || "U"}
                  </div>
                  <div>
                    <div className="font-semibold text-surface-900">{review.buyer?.name || "User"}</div>
                    <div className="text-xs text-surface-500">{new Date(review.created_at).toLocaleDateString('id-ID')}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 text-star">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`size-3.5 ${i < review.rating ? "fill-star" : "fill-star-empty text-star-empty"}`} />
                  ))}
                </div>
              </div>
              <p className="text-surface-700 mt-3 text-sm leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
