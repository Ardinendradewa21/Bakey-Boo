"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Percent } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const thumbnailUrl =
    product.images && product.images.length > 0
      ? product.images[0].url
      : "https://placehold.co/600x400/f5f5f5/a3a3a3?text=No+Image";

  const hasDiscount = product.original_price && product.original_price > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.original_price! - product.price) / product.original_price!) * 100) 
    : 0;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "roti":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "donat":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-surface-100 text-surface-800 border-surface-200";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "roti":
        return "Aneka Roti";
      case "donat":
        return "Donat Spesial";
      default:
        return "Lainnya";
    }
  };

  return (
    <Link href={`/products/${product.slug}`} className="group relative flex flex-col bg-white rounded-2xl border border-surface-200 overflow-hidden hover:shadow-2xl hover:shadow-brand-500/10 hover:border-brand-300 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 block">
      {/* Thumbnail Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-100">
        <Image
          src={thumbnailUrl}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Category Badge overlaying image */}
        <div className="absolute top-3 left-3 z-10">
          <Badge 
            variant="outline" 
            className={cn(
              "font-medium border shadow-sm backdrop-blur-md bg-opacity-90 rounded-xl px-3 py-1",
              getCategoryColor(product.category)
            )}
          >
            {getCategoryLabel(product.category)}
          </Badge>
        </div>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
            <Percent className="size-3" />
            {discountPercentage}% OFF
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title */}
        <h3 className="font-heading font-bold text-lg leading-snug text-surface-900 group-hover:text-brand-600 transition-colors line-clamp-2">
          {product.title}
        </h3>

        {/* Price & Rating */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-surface-100 border-dashed">
          <div>
            {hasDiscount && (
              <p className="text-xs text-surface-400 line-through decoration-red-500/50">
                {formatPrice(product.original_price!)}
              </p>
            )}
            <div className="font-bold text-xl text-surface-900">
              {formatPrice(product.price)}
            </div>
          </div>
          
          <div className="flex items-center gap-1 bg-surface-50 px-2 py-1 rounded-md border border-surface-200 shrink-0">
            <Star className="size-3.5 fill-star text-star" />
            <span className="text-xs font-bold text-surface-800">
              {product.rating_avg ? product.rating_avg.toFixed(1) : "0.0"}
            </span>
            <span className="text-xs text-surface-500">
              ({product.review_count || 0})
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
