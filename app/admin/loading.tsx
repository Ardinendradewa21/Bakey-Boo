import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="size-16 border-4 border-brand-100 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="size-8 text-brand-600 animate-spin" />
        </div>
      </div>
      <h2 className="mt-6 text-lg font-heading font-bold text-surface-900">Memuat Data...</h2>
      <p className="text-surface-500 text-sm mt-1">Harap tunggu sebentar</p>
    </div>
  );
}
