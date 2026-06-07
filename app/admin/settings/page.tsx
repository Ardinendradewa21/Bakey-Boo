"use client";

import { useEffect, useState } from "react";
import { insforge } from "@/lib/insforge";
import { SettingsForm } from "./SettingsForm";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const { data: userData, error } = await insforge.auth.getCurrentUser();
      
      if (error || !userData?.user) {
        router.push("/admin-login");
        return;
      }

      // Get profile data
      const { data: profile } = await insforge.database
        .from("users_profile")
        .select("*")
        .eq("id", userData.user.id)
        .single();

      setUser({
        name: profile?.name || "Admin",
        email: userData.user.email || "",
      });
      setLoading(false);
    }

    loadUser();
  }, [router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-brand-600" />
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-surface-900">
          Pengaturan Admin
        </h1>
        <p className="text-surface-500 mt-1">
          Atur informasi profil toko dan ubah password akun Anda.
        </p>
      </div>

      <SettingsForm user={user} />
    </div>
  );
}
