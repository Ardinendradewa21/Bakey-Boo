"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { insforge } from "@/lib/insforge";
import { Coffee } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const handleCallback = async () => {
      try {
        // Wait a moment for Insforge SDK to automatically exchange the OAuth code
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Get the current user to ensure auth is complete
        const { data: userData, error: userError } = await insforge.auth.getCurrentUser();
        
        if (userError && !userError.message.includes("Session not found")) {
          throw userError;
        }

        // Retrieve access token
        let token = null;
        
        // Method 1: Try internal tokenManager
        const tokenManager = (insforge as any).tokenManager;
        if (tokenManager && typeof tokenManager.getAccessToken === 'function') {
          token = tokenManager.getAccessToken();
        }
        
        // Method 2: Try localStorage fallback
        if (!token) {
          const keys = Object.keys(window.localStorage).filter(k => k.toLowerCase().includes('insforge'));
          for (const key of keys) {
            try {
              const val = window.localStorage.getItem(key);
              if (val) {
                const parsed = JSON.parse(val);
                token = parsed.access_token || parsed.accessToken;
                if (token) break;
              }
            } catch (e) {}
          }
        }

        if (token) {
          // Sync session with our server-side cookie
          const res = await fetch("/api/auth/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ access_token: token }),
          });

          if (!res.ok) {
            throw new Error("Gagal menyinkronkan sesi login");
          }

          // Sukses, arahkan ke halaman utama
          if (isMounted) {
            router.push("/");
          }
        } else {
          // Jika tidak ada session, mungkin error
          if (isMounted) setError("Tidak dapat menemukan sesi login atau akses token.");
        }
      } catch (err: any) {
        console.error("Auth callback error:", err);
        if (isMounted) setError(err.message || "Terjadi kesalahan saat memproses login");
      }
    };

    handleCallback();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-surface-200 text-center max-w-sm w-full">
        <Coffee className="size-12 mx-auto text-brand-600 animate-pulse mb-4" />
        <h1 className="text-xl font-bold text-surface-900 mb-2">Memproses Login...</h1>
        {error ? (
          <div className="mt-4 p-3 bg-error/10 text-error rounded-lg text-sm">
            {error}
            <button 
              onClick={() => router.push("/login")}
              className="block mt-2 font-semibold hover:underline"
            >
              Kembali ke Login
            </button>
          </div>
        ) : (
          <p className="text-surface-500 text-sm">Harap tunggu sebentar, kami sedang memverifikasi akun Anda.</p>
        )}
      </div>
    </div>
  );
}
