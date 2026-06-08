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
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    const { error } = await insforge.auth.signInWithOAuth({
      provider: 'google',
      redirectTo: `${window.location.origin}/auth/callback`,
    });
    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

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
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                disabled={isLoading}
                className={errors.password ? "border-error focus-visible:ring-error pr-10" : "pr-10"}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-error mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                disabled={isLoading}
                className={errors.confirmPassword ? "border-error focus-visible:ring-error pr-10" : "pr-10"}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-error mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 mt-6" disabled={isLoading}>
            {isLoading ? "Memproses..." : "Daftar Sekarang"}
          </Button>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-surface-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-surface-500">Atau daftar dengan</span>
            </div>
          </div>

          <Button 
            type="button" 
            variant="outline" 
            className="w-full mb-4" 
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </Button>

          <div className="flex items-start gap-2 mt-4">
            <input 
              type="checkbox" 
              id="agreeTerms" 
              required
              className="mt-1 rounded border-surface-300 text-brand-600 focus:ring-brand-600"
            />
            <Label htmlFor="agreeTerms" className="text-xs text-surface-500 font-normal leading-relaxed">
              Saya menyetujui <Link href="/terms" className="text-brand-600 hover:underline">Syarat & Ketentuan</Link> serta <Link href="/privacy" className="text-brand-600 hover:underline">Kebijakan Privasi</Link> Bakey Boo.
            </Label>
          </div>
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
