"use client";

import { useState } from "react";
import { insforge } from "@/lib/insforge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Camera, Phone, User as UserIcon } from "lucide-react";
import Image from "next/image";

interface EditProfileFormProps {
  user: any;
  profile: any;
  onSuccess: (updatedProfile: any, updatedUser: any) => void;
  onCancel: () => void;
}

export function EditProfileForm({ user, profile, onSuccess, onCancel }: EditProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(profile?.name || user?.user_metadata?.name || "");
  const [phone, setPhone] = useState(user?.user_metadata?.phone || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Check if profile exists, then update or insert manually
      // We do this instead of upsert because user_id might not have a UNIQUE constraint
      const { data: existingProfile } = await insforge.database
        .from("users_profile")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (existingProfile) {
        const { error: updateError } = await insforge.database
          .from("users_profile")
          .update({ name })
          .eq("user_id", user.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await insforge.database
          .from("users_profile")
          .insert([{ user_id: user.id, name }]);
        if (insertError) throw insertError;
      }

      // 2. Update auth.users metadata for phone, avatar_url, and name using setProfile
      const { data: authData, error: authError } = await insforge.auth.setProfile({
        name, phone, avatar_url: avatarUrl
      });

      if (authError) throw authError;

      toast.success("Profil berhasil diperbarui!");
      onSuccess(
        { ...profile, name }, 
        { ...user, user_metadata: { ...user.user_metadata, name, phone, avatar_url: avatarUrl } }
      );
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Gagal memperbarui profil.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        {/* Avatar Preview */}
        <div className="flex flex-col items-center justify-center gap-2 mb-6">
          <div className="size-24 rounded-full border-4 border-surface-100 overflow-hidden bg-surface-50 flex items-center justify-center relative group">
            {avatarUrl ? (
              <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
            ) : (
              <UserIcon className="size-10 text-surface-300" />
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1">
            URL Foto Profil
          </label>
          <div className="relative">
            <Camera className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-surface-400" />
            <Input 
              type="url" 
              placeholder="https://..." 
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="pl-10"
            />
          </div>
          <p className="text-xs text-surface-500 mt-1">Tempelkan link/URL gambar (opsional)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1">
            Nama Lengkap
          </label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-surface-400" />
            <Input 
              type="text" 
              required
              placeholder="Nama Anda" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1">
            Nomor WhatsApp
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-surface-400" />
            <Input 
              type="tel" 
              placeholder="08123456789" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          className="flex-1"
          onClick={onCancel}
          disabled={isLoading}
        >
          Batal
        </Button>
        <Button 
          type="submit" 
          className="flex-1 bg-brand-600 hover:bg-brand-700"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
          Simpan Profil
        </Button>
      </div>
    </form>
  );
}
