"use client";

import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Trash2, X } from "lucide-react";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartSheet() {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <div className={buttonVariants({ variant: "ghost", size: "icon", className: "relative shrink-0 hover:bg-surface-100/50 cursor-pointer" })}>
          <ShoppingCart className="w-5 h-5 text-surface-600" />
          {cart.getItemCount() > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-600 rounded-full border-2 border-white" />
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-lg bg-white border-l-0 sm:p-8 p-6">
        <SheetHeader className="px-0 text-left space-y-2.5 pb-6 border-b border-surface-100">
          <SheetTitle className="font-heading font-bold text-2xl flex items-center gap-2">
            Keranjang Belanja
            <span className="bg-brand-50 text-brand-600 text-sm font-semibold px-2 py-0.5 rounded-md">
              {cart.getItemCount()}
            </span>
          </SheetTitle>
        </SheetHeader>

        {cart.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="size-20 bg-surface-50 rounded-full flex items-center justify-center">
              <ShoppingCart className="size-10 text-surface-300" />
            </div>
            <div className="text-center">
              <h3 className="font-heading font-semibold text-lg text-surface-900">Keranjang masih kosong</h3>
              <p className="text-sm text-surface-500 mt-1 max-w-[250px]">
                Jelajahi aneka roti dan donat kami untuk mulai berbelanja.
              </p>
            </div>
            <Link href="/products" className={buttonVariants({ className: "mt-4 rounded-xl" })} onClick={() => setIsOpen(false)}>
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 sm:-mx-8 px-6 sm:px-8">
              <div className="flex flex-col gap-6 py-6">
                {cart.items.map((item, index) => (
                  <div key={`${item.product.id}-${item.selectedFlavor}-${item.selectedSize}-${index}`} className="flex gap-4 group">
                    {/* Image Container */}
                    <div className="relative size-20 sm:size-24 rounded-xl overflow-hidden bg-surface-50 shrink-0 border border-surface-200">
                      <Image
                        src={item.product.images?.[0]?.url || "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=300"}
                        alt={item.product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col justify-between flex-1 py-0.5">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-semibold text-surface-900 text-sm sm:text-base line-clamp-2 leading-snug mb-1.5">
                            {item.product.title}
                          </h4>
                          <div className="flex items-center gap-2 flex-wrap">
                            {(item.selectedFlavor || item.selectedSize) && (
                              <p className="text-[11px] font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-100">
                                {item.selectedFlavor} {item.selectedSize && `(${item.selectedSize})`}
                              </p>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0 text-surface-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors -mt-1 -mr-1"
                          onClick={() => cart.removeItem(item.product.id, item.selectedFlavor, item.selectedSize)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-surface-50 rounded-lg border border-surface-200">
                          <button
                            type="button"
                            onClick={() => cart.updateQuantity(item.product.id, item.quantity - 1, item.selectedFlavor, item.selectedSize)}
                            className="w-8 h-8 flex items-center justify-center text-surface-500 hover:text-brand-600 hover:bg-brand-50 rounded-l-lg transition-colors font-medium"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (!isNaN(val) && val > 0) {
                                cart.updateQuantity(item.product.id, val, item.selectedFlavor, item.selectedSize);
                              }
                            }}
                            className="w-10 h-8 text-center text-sm font-medium bg-transparent border-x border-surface-200 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <button
                            type="button"
                            onClick={() => cart.updateQuantity(item.product.id, item.quantity + 1, item.selectedFlavor, item.selectedSize)}
                            className="w-8 h-8 flex items-center justify-center text-surface-500 hover:text-brand-600 hover:bg-brand-50 rounded-r-lg transition-colors font-medium"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-extrabold text-brand-600 text-sm sm:text-base">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="pt-6 border-t border-surface-100 space-y-4">
              <div className="flex justify-between items-center text-sm font-medium text-surface-600">
                <span>Subtotal</span>
                <span>{formatPrice(cart.getTotal())}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-lg font-bold text-surface-900">
                <span>Total</span>
                <span className="text-brand-600">{formatPrice(cart.getTotal())}</span>
              </div>
              
              <Link href="/checkout" className={buttonVariants({ className: "w-full h-12 text-base font-semibold rounded-xl bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20" })} onClick={() => setIsOpen(false)}>
                  Checkout Sekarang
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
