"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { insforge } from "@/lib/insforge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Optional: check if user is actually in a recovery session
    const checkSession = async () => {
      const { data: { session } } = await insforge.auth.getSession();
      if (!session) {
        // Not necessarily an error if they just clicked the link, 
        // Supabase handles the #access_token in URL automatically
      }
    };
    checkSession();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error: updateError } = await insforge.auth.updateUser({
      password: password
    });

    if (updateError) {
      setError(updateError.message || "Gagal memperbarui password");
      setIsLoading(false);
      return;
    }

    toast.success("Password berhasil diperbarui!");
    router.push("/dashboard/profile");
  };

  return (
    <Card className="shadow-lg border-surface-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Buat Password Baru</CardTitle>
        <CardDescription className="text-center">
          Masukkan password baru Anda di bawah ini.
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
            <Label htmlFor="password">Password Baru</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className="pr-10"
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
                className="pr-10"
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
          </div>

          <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 mt-2" disabled={isLoading}>
            {isLoading ? "Memproses..." : "Simpan Password Baru"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
