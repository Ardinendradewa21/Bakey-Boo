"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insforge } from "@/lib/insforge";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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

    const { data: authData, error: authError } = await insforge.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    const token = authData?.session?.access_token || (authData as any)?.accessToken;
    if (authError || !token) {
      setError(authError?.message || "Gagal masuk. Periksa kembali email dan password Anda.");
      setIsLoading(false);
      return;
    }

    // Sync session to secure cookie
    try {
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: token }),
      });
      
      if (!res.ok) {
        setError("Gagal menyinkronkan sesi keamanan. Silakan coba lagi.");
        setIsLoading(false);
        return;
      }
    } catch (e) {
      console.error("Failed to sync session", e);
      setError("Terjadi kesalahan jaringan.");
      setIsLoading(false);
      return;
    }

    // Success login
    const urlParams = new URLSearchParams(window.location.search);
    const callbackUrl = urlParams.get('callbackUrl') || "/";
    window.location.href = callbackUrl;
  };

  return (
    <Card className="shadow-lg border-surface-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Masuk ke Akun</CardTitle>
        <CardDescription className="text-center">
          Selamat datang kembali! Silakan masuk untuk melanjutkan.
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-sm text-brand-600 hover:text-brand-700 hover:underline"
              >
                Lupa password?
              </Link>
            </div>
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

          <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700" disabled={isLoading}>
            {isLoading ? "Memproses..." : "Masuk"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-surface-100 pt-6">
        <p className="text-sm text-surface-600">
          Belum punya akun?{" "}
          <Link href="/register" className="text-brand-600 hover:text-brand-700 font-medium hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
