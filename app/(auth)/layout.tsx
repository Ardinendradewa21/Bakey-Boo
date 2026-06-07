import { Coffee } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-brand-600 flex items-center justify-center gap-2">
            <Coffee className="size-8 text-brand-500 fill-brand-100" />
            Bakey Boo
          </h2>
          <p className="mt-2 text-sm text-surface-600">
            Toko roti dan donat premium terlezat di kota Anda
          </p>
        </div>
        
        {children}
      </div>
    </div>
  );
}
