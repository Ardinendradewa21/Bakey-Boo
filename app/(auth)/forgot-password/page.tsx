"use client";

import { useState } from "react";
import Link from "next/link";
import { insforge } from "@/lib/insforge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email wajib diisi");
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error: resetError } = await insforge.auth.sendResetPasswordEmail({
      email,
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (resetError) {
      setError(resetError.message || "Gagal mengirim tautan reset password. Pastikan email terdaftar.");
    } else {
      setSuccess(true);
    }
    
    setIsLoading(false);
  };

  if (success) {
    return (
      <Card className="shadow-lg border-surface-200 text-center py-8">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="size-8" />
          </div>
          <CardTitle className="text-2xl font-bold">Cek Email Anda!</CardTitle>
          <CardDescription className="text-base mt-2">
            Kami telah mengirimkan tautan untuk mengatur ulang password ke <br/>
            <span className="font-semibold text-surface-900">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center mt-4">
          <Link href="/login" className="text-brand-600 hover:text-brand-700 font-medium hover:underline">
            Kembali ke halaman Masuk
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-surface-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Lupa Password</CardTitle>
        <CardDescription className="text-center">
          Masukkan email Anda untuk menerima tautan reset password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700" disabled={isLoading}>
            {isLoading ? "Memproses..." : "Kirim Tautan Reset"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-surface-100 pt-6">
        <p className="text-sm text-surface-600">
          Ingat password Anda?{" "}
          <Link href="/login" className="text-brand-600 hover:text-brand-700 font-medium hover:underline">
            Masuk di sini
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
