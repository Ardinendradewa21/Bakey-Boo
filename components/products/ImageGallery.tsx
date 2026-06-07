"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ProductImage } from "@/types";

interface ImageGalleryProps {
  images: ProductImage[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Jika tidak ada gambar, tampilkan placeholder
  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/3] w-full rounded-3xl bg-surface-100 flex items-center justify-center border border-surface-200">
        <span className="text-surface-400 font-medium">Tidak ada gambar</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-surface-100 border border-surface-200">
        <Image
          src={images[activeIndex].url}
          alt={`${title} - Image ${activeIndex + 1}`}
          fill
          priority
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                activeIndex === index
                  ? "border-brand-500 ring-2 ring-brand-500/20"
                  : "border-surface-200 opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="112px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
