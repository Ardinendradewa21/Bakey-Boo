"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export function MobileSearchInput({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter();

  return (
    <div className="w-full md:hidden relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-surface-400" />
      <Input 
        type="text"
        defaultValue={defaultValue}
        placeholder="Cari produk..."
        className="pl-9 w-full bg-white border-surface-200"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const val = e.currentTarget.value;
            if (val) {
              router.push(`/products?search=${encodeURIComponent(val)}`);
            } else {
              router.push(`/products`);
            }
          }
        }}
      />
    </div>
  );
}
