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
  
  // States for variants and quantity
  const [selectedFlavor, setSelectedFlavor] = useState<string>(product.flavors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    if ((product.flavors?.length && !selectedFlavor) || (product.sizes?.length && !selectedSize)) {
      toast.error("Pilih varian", { description: "Silakan pilih rasa dan ukuran terlebih dahulu." });
      return;
    }
    
    const added = cart.addItem(product, quantity, selectedFlavor, selectedSize);
    if (added) {
      toast.success(`${product.title} ditambahkan ke keranjang`, {
        description: `Jumlah: ${quantity} | Varian: ${selectedFlavor ? selectedFlavor : ''} ${selectedSize ? `(${selectedSize})` : ''}`,
      });
    }
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

      {/* Quantity UI */}
      <div>
        <span className="block text-sm font-medium text-surface-700 mb-2">Atur Jumlah</span>
        <div className="flex items-center w-32 bg-surface-50 rounded-xl border border-surface-200">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center text-surface-500 hover:text-brand-600 hover:bg-brand-50 rounded-l-xl transition-colors font-medium text-lg"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val) && val > 0) setQuantity(val);
            }}
            className="flex-1 w-full h-10 text-center font-medium bg-transparent border-x border-surface-200 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center text-surface-500 hover:text-brand-600 hover:bg-brand-50 rounded-r-xl transition-colors font-medium text-lg"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <button
          onClick={handleAddToCart}
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full rounded-xl bg-brand-600 hover:bg-brand-700 text-md text-white shadow-md"
          )}
        >
          <ShoppingCart className="size-5 mr-2" />
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}
