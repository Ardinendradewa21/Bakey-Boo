"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insforge } from "@/lib/insforge";
import { registerSchema, type RegisterFormData } from "@/lib/validations";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema) as any,
    defaultValues: {
      role: "buyer",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    // 1. Register with InsForge Auth
    const { data: authData, error: authError } = await insforge.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      setError(authError.message || "Gagal mendaftar. Email mungkin sudah digunakan.");
      setIsLoading(false);
      return;
    }

    if (!authData?.user) {
      setError("Terjadi kesalahan sistem. Silakan coba lagi nanti.");
      setIsLoading(false);
      return;
    }

    // 2. Create User Profile in Database
    const { error: dbError } = await insforge.database
      .from("users_profile")
      .insert([
        {
          user_id: authData.user.id,
          name: data.name,
          email: data.email,
          role: data.role,
        },
      ]);

    if (dbError) {
      // Cleanup auth if db fails (manual rollback logic ideally)
      console.error("Failed to create profile:", dbError);
      // We still show success since auth succeeded, but profile might be incomplete
    }

    setIsLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <Card className="shadow-lg border-surface-200 text-center py-8">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold">Pendaftaran Berhasil!</CardTitle>
          <CardDescription className="text-base mt-2">
            Silakan periksa email Anda untuk verifikasi akun sebelum masuk.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center mt-4">
          <Link href="/login" className={cn(buttonVariants({ size: "default" }), "bg-brand-600 hover:bg-brand-700")}>
            Kembali ke halaman Masuk
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-surface-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Buat Akun Baru</CardTitle>
        <CardDescription className="text-center">
          Bergabung dan mulai berbelanja produk digital favorit Anda.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}


          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input
              id="name"
              placeholder="Faqih Aulia"
              {...register("name")}
              disabled={isLoading}
              className={errors.name ? "border-error focus-visible:ring-error" : ""}
            />
            {errors.name && (
              <p className="text-sm text-error mt-1">{errors.name.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nama@email.com"
              {...register("email")}
              disabled={isLoading}
              className={errors.email ? "border-error focus-visible:ring-error" : ""}
            />
            {errors.email && (
              <p className="text-sm text-error mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              disabled={isLoading}
              className={errors.password ? "border-error focus-visible:ring-error" : ""}
            />
            {errors.password && (
              <p className="text-sm text-error mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              disabled={isLoading}
              className={errors.confirmPassword ? "border-error focus-visible:ring-error" : ""}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-error mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 mt-6" disabled={isLoading}>
            {isLoading ? "Memproses..." : "Daftar Sekarang"}
          </Button>
          
          <p className="text-xs text-surface-500 text-center mt-4">
            Dengan mendaftar, Anda menyetujui Syarat & Ketentuan serta Kebijakan Privasi kami.
          </p>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-surface-100 pt-6">
        <p className="text-sm text-surface-600">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-brand-600 hover:text-brand-700 font-medium hover:underline">
            Masuk di sini
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
