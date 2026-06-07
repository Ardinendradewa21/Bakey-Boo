"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const CATEGORIES = [
  { id: "aneka-roti", label: "Aneka Roti" },
  { id: "donat-spesial", label: "Donat Spesial" },
  { id: "kue-kering", label: "Kue Kering" },
  { id: "minuman", label: "Minuman Segar" },
];

export function SidebarFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategories = searchParams.get("category")?.split(",") || [];

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    
    let newCategories = [...currentCategories];
    if (checked) {
      newCategories.push(categoryId);
    } else {
      newCategories = newCategories.filter(id => id !== categoryId);
    }

    if (newCategories.length > 0) {
      params.set("category", newCategories.join(","));
    } else {
      params.delete("category");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-white rounded-2xl border border-surface-200">
      <div className="space-y-1">
        <h3 className="font-heading font-bold text-lg text-surface-900">Kategori Menu</h3>
        <p className="text-sm text-surface-500">Sesuaikan pilihan Anda</p>
      </div>

      <div className="flex flex-col gap-3">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="flex items-center gap-3">
            <Checkbox 
              id={`category-${cat.id}`} 
              checked={currentCategories.includes(cat.id)}
              onCheckedChange={(checked) => handleCategoryChange(cat.id, checked === true)}
            />
            <label
              htmlFor={`category-${cat.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-surface-700 hover:text-surface-900"
            >
              {cat.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
