"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "./actions";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

import { Package, Percent } from "lucide-react";

interface ProductFormProps {
  initialData?: Product;
  allProducts?: any[];
  initialBundleItems?: string[];
}

export function ProductForm({ initialData, allProducts = [], initialBundleItems = [] }: ProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // Extract first image if exists
  const initialImage = initialData?.images && initialData.images.length > 0 
    ? initialData.images[0].url 
    : "";

  // Extract first file url if exists
  const initialFileUrl = initialData?.files && initialData.files.length > 0 
    ? initialData.files[0].file_url 
    : "";

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    original_price: initialData?.original_price || 0,
    category: initialData?.category || "aneka-roti",
    image_url: initialImage,
    is_published: initialData?.is_published ?? true,
    is_bundle: initialData?.is_bundle || false,
    bundle_product_ids: initialBundleItems,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Auto-generate slug from title if slug is not manually edited
    if (name === "title" && !initialData) {
      const generatedSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      setFormData(prev => ({
        ...prev,
        [name]: value,
        slug: generatedSlug
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? Number(value) : value
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const rawValue = value.replace(/\D/g, "");
    setFormData(prev => ({
      ...prev,
      [name]: rawValue ? parseInt(rawValue, 10) : 0
    }));
  };

  const toggleBundleItem = (productId: string) => {
    setFormData(prev => {
      const isSelected = prev.bundle_product_ids.includes(productId);
      if (isSelected) {
        return { ...prev, bundle_product_ids: prev.bundle_product_ids.filter(id => id !== productId) };
      } else {
        return { ...prev, bundle_product_ids: [...prev.bundle_product_ids, productId] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const action = initialData ? updateProduct.bind(null, initialData.id) : createProduct;
      const result = await action(formData);

      if (result.success) {
        toast.success(`Produk berhasil ${initialData ? 'diperbarui' : 'ditambahkan'}`);
        router.push("/admin/products");
      } else {
        toast.error(result.error);
      }
    } catch (error: any) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products" className={buttonVariants({ variant: "outline", size: "icon", className: "shrink-0" })}>
            <ArrowLeft className="size-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-surface-900">
            {initialData ? "Edit Produk" : "Tambah Produk Baru"}
          </h1>
          <p className="text-surface-500 text-sm">
            {initialData ? "Perbarui informasi produk." : "Masukkan detail produk roti atau donat baru Anda."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (Main Info) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-surface-900 mb-1">Informasi Dasar</h2>
                <p className="text-sm text-surface-500 mb-4">Detail utama produk yang akan ditampilkan ke pembeli.</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title" className="font-semibold">Nama Produk *</Label>
                <Input 
                  id="title" 
                  name="title" 
                  required 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="Misal: Roti Sobek Coklat"
                  className="bg-surface-50 h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug" className="font-semibold">Slug URL *</Label>
                <Input 
                  id="slug" 
                  name="slug" 
                  required 
                  value={formData.slug} 
                  onChange={handleChange} 
                  placeholder="roti-sobek-coklat"
                  className="bg-surface-50 h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-semibold">Deskripsi Produk *</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  required 
                  rows={8}
                  value={formData.description} 
                  onChange={handleChange} 
                  placeholder="Jelaskan apa saja yang pembeli dapatkan dari produk ini..."
                  className="bg-surface-50"
                />
              </div>
            </div>
          </div>

          {/* Right Column (Settings) */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-surface-900 mb-1">Pengaturan</h2>
                <p className="text-sm text-surface-500 mb-4">Harga dan kategori produk.</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price" className="font-semibold">Harga Jual (Rp) *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500 font-medium">Rp</span>
                <Input 
                  id="price" 
                  name="price" 
                  type="text"
                  required 
                  value={formData.price === 0 ? "" : new Intl.NumberFormat('id-ID').format(formData.price)} 
                  onChange={handlePriceChange} 
                  className="bg-surface-50 h-11 pl-10"
                  placeholder="0"
                />
              </div>
            </div>

              <div className="space-y-2">
                <Label htmlFor="original_price" className="font-semibold flex items-center gap-2">
                  <Percent className="size-4 text-brand-600" />
                  Harga Coret / Asli (Opsional)
                </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500 font-medium">Rp</span>
                <Input 
                  id="original_price" 
                  name="original_price" 
                  type="text"
                  value={formData.original_price === 0 ? "" : new Intl.NumberFormat('id-ID').format(formData.original_price)} 
                  onChange={handlePriceChange} 
                  className="bg-surface-50 h-11 pl-10"
                  placeholder="0"
                />
              </div>
              <p className="text-xs text-surface-500">Isi jika produk sedang diskon. Harga ini akan dicoret di toko.</p>
            </div>
              
              <div className="space-y-2">
                <Label htmlFor="category" className="font-semibold">Kategori *</Label>
                <select 
                  id="category" 
                  name="category"
                  className="flex h-11 w-full rounded-md border border-input bg-surface-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="aneka-roti">Aneka Roti</option>
                  <option value="donat-spesial">Donat Spesial</option>
                  <option value="kue-kering">Kue Kering</option>
                  <option value="minuman">Minuman Segar</option>
                </select>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm space-y-6">
              <div className="space-y-2">
                <Label htmlFor="image_url" className="font-semibold">URL Gambar Produk (Opsional)</Label>
                <Input 
                  id="image_url" 
                  name="image_url" 
                  value={formData.image_url} 
                  onChange={handleChange} 
                  placeholder="https://contoh.com/gambar-roti.png"
                  className="bg-surface-50 h-11"
                />
              </div>
            </div>

            {/* Bundling Options */}
            <div className={`bg-white p-6 rounded-2xl border ${formData.is_bundle ? 'border-brand-300 ring-1 ring-brand-100' : 'border-surface-200'} shadow-sm space-y-4 transition-all`}>
              <div className="flex items-start gap-3">
                <div className="flex items-center h-5">
                  <input 
                    type="checkbox" 
                    id="is_bundle" 
                    name="is_bundle" 
                    checked={formData.is_bundle} 
                    onChange={handleChange} 
                    className="size-4 rounded border-surface-300 text-brand-600 focus:ring-brand-600 cursor-pointer"
                  />
                </div>
                <div>
                  <Label htmlFor="is_bundle" className="font-bold text-surface-900 cursor-pointer flex items-center gap-2">
                    <Package className="size-4 text-brand-600" />
                    Jadikan Produk Bundle
                  </Label>
                  <p className="text-sm text-surface-500 mt-1">Gabungkan beberapa produk menjadi satu paket harga.</p>
                </div>
              </div>

              {formData.is_bundle && (
                <div className="pt-4 border-t border-surface-100">
                  <Label className="font-semibold mb-3 block">Pilih Produk dalam Bundle:</Label>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                    {allProducts.length === 0 ? (
                      <p className="text-sm text-surface-500 italic">Belum ada produk lain.</p>
                    ) : (
                      allProducts.map((p) => (
                        <label key={p.id} className="flex items-center gap-3 p-3 rounded-lg border border-surface-100 hover:bg-surface-50 cursor-pointer transition-colors">
                          <input 
                            type="checkbox"
                            checked={formData.bundle_product_ids.includes(p.id)}
                            onChange={() => toggleBundleItem(p.id)}
                            className="size-4 rounded border-surface-300 text-brand-600 focus:ring-brand-600"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-surface-900 line-clamp-1">{p.title}</p>
                            <p className="text-xs text-surface-500">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p.price)}</p>
                          </div>
                        </label>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex items-center h-5">
                  <input 
                    type="checkbox" 
                    id="is_published" 
                    name="is_published" 
                    checked={formData.is_published} 
                    onChange={handleChange} 
                    className="size-4 rounded border-surface-300 text-brand-600 focus:ring-brand-600 cursor-pointer"
                  />
                </div>
                <div>
                  <Label htmlFor="is_published" className="font-bold text-surface-900 cursor-pointer">Terbitkan Produk</Label>
                  <p className="text-sm text-surface-500 mt-1">Jika dicentang, produk akan langsung tampil di halaman toko dan bisa dibeli.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-surface-200">
          <Link href="/admin/products" className={buttonVariants({ variant: "outline", className: "h-11 px-6" })}>Batal</Link>
          <Button type="submit" disabled={isLoading} className="bg-brand-600 hover:bg-brand-700 h-11 px-8">
            {isLoading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Save className="size-4 mr-2" />}
            Simpan Produk
          </Button>
        </div>

      </form>
    </div>
  );
}
