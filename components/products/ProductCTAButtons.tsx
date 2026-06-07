"use client";

import { useState } from "react";
import { Product } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCart, Zap } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProductCTAButtonsProps {
  product: Product;
}

export function ProductCTAButtons({ product }: ProductCTAButtonsProps) {
  const cart = useCart();
  const router = useRouter();
  
  // States for variants
  const [selectedFlavor, setSelectedFlavor] = useState<string>(product.flavors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || "");

  const handleAddToCart = () => {
    if ((product.flavors?.length && !selectedFlavor) || (product.sizes?.length && !selectedSize)) {
      toast.error("Pilih varian", { description: "Silakan pilih rasa dan ukuran terlebih dahulu." });
      return;
    }
    
    const added = cart.addItem(product, 1, selectedFlavor, selectedSize);
    if (added) {
      toast.success(`${product.title} ditambahkan ke keranjang`, {
        description: `Varian: ${selectedFlavor ? selectedFlavor : ''} ${selectedSize ? `(${selectedSize})` : ''}`,
      });
    }
  };

  const handleBuyNow = () => {
    if ((product.flavors?.length && !selectedFlavor) || (product.sizes?.length && !selectedSize)) {
      toast.error("Pilih varian", { description: "Silakan pilih rasa dan ukuran terlebih dahulu." });
      return;
    }
    
    cart.addItem(product, 1, selectedFlavor, selectedSize);
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Variants UI */}
      {(product.flavors?.length || product.sizes?.length) ? (
        <div className="flex flex-col gap-4 mb-2">
          {product.flavors && product.flavors.length > 0 && (
            <div>
              <span className="block text-sm font-medium text-surface-700 mb-2">Pilih Rasa</span>
              <div className="flex flex-wrap gap-2">
                {product.flavors.map((flavor) => (
                  <button
                    key={flavor}
                    onClick={() => setSelectedFlavor(flavor)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-full border transition-colors",
                      selectedFlavor === flavor 
                        ? "border-brand-600 bg-brand-50 text-brand-700 font-medium" 
                        : "border-surface-200 text-surface-600 hover:border-brand-300"
                    )}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <span className="block text-sm font-medium text-surface-700 mb-2">Pilih Ukuran</span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-full border transition-colors",
                      selectedSize === size 
                        ? "border-brand-600 bg-brand-50 text-brand-700 font-medium" 
                        : "border-surface-200 text-surface-600 hover:border-brand-300"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}

      <div className="flex flex-col gap-3">
        <button
          onClick={handleBuyNow}
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full rounded-xl bg-brand-600 hover:bg-brand-700 text-md"
          )}
        >
          <Zap className="size-5 mr-2" />
          Beli Sekarang
        </button>
        <button
          onClick={handleAddToCart}
          className={cn(
            buttonVariants({ size: "lg", variant: "outline" }),
            "w-full rounded-xl text-md border-surface-300 hover:bg-surface-50"
          )}
        >
          <ShoppingCart className="size-5 mr-2" />
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}
