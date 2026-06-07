"use client";

import { useState } from "react";
import { insforge } from "@/lib/insforge";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock, Save, Loader2, ShieldCheck } from "lucide-react";

interface SettingsFormProps {
  user: {
    name: string;
    email: string;
  };
}

export function SettingsForm({ user }: SettingsFormProps) {
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user.name || "",
    email: user.email || "", // we'll make email read-only for now
  });

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    
    try {
      const { data: userData, error: userError } = await insforge.auth.getCurrentUser();
      if (userError || !userData?.user) throw new Error("Sesi tidak valid");

      const { error } = await insforge.database
        .from("users_profile")
        .update({ name: profileData.name })
        .eq("id", userData.user.id);

      if (error) throw error;
      toast.success("Profil berhasil diperbarui!");
    } catch (err: any) {
      toast.error(err.message || "Gagal memperbarui profil");
    }
    
    setProfileLoading(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.password !== passwordData.confirmPassword) {
      toast.error("Password konfirmasi tidak cocok!");
      return;
    }
    if (passwordData.password.length < 6) {
      toast.error("Password harus minimal 6 karakter!");
      return;
    }

    setPasswordLoading(true);
    try {
      // @insforge/sdk doesn't expose updateUser directly, so we use the HTTP client
      await insforge.getHttpClient().put("/auth/v1/user", {
        password: passwordData.password,
      });
      
      toast.success("Password berhasil diubah!");
      setPasswordData({ password: "", confirmPassword: "" });
    } catch (err: any) {
      toast.error(err.message || "Gagal mengubah password");
    }
    
    setPasswordLoading(false);
  };

  return (
    <div className="max-w-4xl space-y-8">
      
      {/* Profil Section */}
      <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-surface-100 flex items-center gap-3">
          <div className="p-2 bg-brand-50 rounded-lg">
            <User className="size-5 text-brand-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-surface-900">Informasi Profil</h2>
            <p className="text-sm text-surface-500">Ubah nama dan informasi publik toko Anda.</p>
          </div>
        </div>
        
        <form onSubmit={handleProfileSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-semibold">Nama Tampilan</Label>
              <Input 
                id="name" 
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                required
                className="bg-surface-50 h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold text-surface-500">Email Akun (Tidak bisa diubah)</Label>
              <Input 
                id="email" 
                value={profileData.email}
                disabled
                className="bg-surface-100 h-11 cursor-not-allowed text-surface-500"
              />
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={profileLoading} className="bg-brand-600 hover:bg-brand-700">
              {profileLoading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Save className="size-4 mr-2" />}
              Simpan Profil
            </Button>
          </div>
        </form>
      </div>

      {/* Password Section */}
      <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-surface-100 flex items-center gap-3">
          <div className="p-2 bg-red-50 rounded-lg">
            <ShieldCheck className="size-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-surface-900">Keamanan & Password</h2>
            <p className="text-sm text-surface-500">Ubah password akun admin Anda secara berkala untuk keamanan.</p>
          </div>
        </div>
        
        <form onSubmit={handlePasswordSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="new_password" className="font-semibold">Password Baru</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400"><Lock className="size-4" /></span>
                <Input 
                  id="new_password" 
                  type="password"
                  value={passwordData.password}
                  onChange={(e) => setPasswordData({...passwordData, password: e.target.value})}
                  required
                  placeholder="Minimal 6 karakter"
                  className="bg-surface-50 h-11 pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm_password" className="font-semibold">Konfirmasi Password Baru</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400"><Lock className="size-4" /></span>
                <Input 
                  id="confirm_password" 
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  required
                  placeholder="Ketik ulang password baru"
                  className="bg-surface-50 h-11 pl-10"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={passwordLoading} variant="destructive">
              {passwordLoading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Lock className="size-4 mr-2" />}
              Update Password
            </Button>
          </div>
        </form>
      </div>
      
    </div>
  );
}
