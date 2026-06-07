"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insforge } from "@/lib/insforge";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Leaf, ShieldAlert } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    // Hardcode check email for admin
    if (data.email !== "adrinindadewa2016@gmail.com") {
      setError("Akses ditolak. Email bukan merupakan akun Admin.");
      setIsLoading(false);
      return;
    }

    const { data: authData, error: authError } = await insforge.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (authError || !authData?.user || !authData?.accessToken) {
      setError("Kredensial tidak valid. Silakan periksa kembali password Anda.");
      setIsLoading(false);
      return;
    }

    // Sync session to secure cookie
    try {
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: authData.accessToken }),
      });

      if (!res.ok) {
        setError("Gagal menyinkronkan sesi keamanan. Coba lagi.");
        setIsLoading(false);
        return;
      }
    } catch (e) {
      console.error("Failed to sync session", e);
      setError("Gagal menyinkronkan sesi jaringan.");
      setIsLoading(false);
      return;
    }

    // Success, redirect to admin dashboard
    router.push("/admin");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-surface-800 rounded-full flex items-center justify-center mb-4">
             <ShieldAlert className="size-8 text-brand-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-white flex items-center justify-center gap-2">
            Portal Admin
          </h2>
          <p className="mt-2 text-sm text-surface-400">
            Tumbuh Merekah - Akses Khusus Pengelola
          </p>
        </div>
        
        <div className="bg-surface-800 p-8 rounded-2xl shadow-xl border border-surface-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="bg-red-950/50 border-red-900 text-red-400">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-surface-300">Email Admin</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@tumbuhmerekah.com"
                {...register("email")}
                disabled={isLoading}
                className={`bg-surface-900 border-surface-700 text-white placeholder:text-surface-600 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
              {errors.email && (
                <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-surface-300">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                disabled={isLoading}
                className={`bg-surface-900 border-surface-700 text-white ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
              {errors.password && (
                <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white" disabled={isLoading}>
              {isLoading ? "Memverifikasi..." : "Login ke Dashboard"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
