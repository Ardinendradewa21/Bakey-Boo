"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { insforge } from "@/lib/insforge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Loader2, User, Mail, Shield, ShieldCheck, Phone, Settings } from "lucide-react";
import { AddressManager } from "@/components/profile/AddressManager";
import { EditProfileForm } from "@/components/profile/EditProfileForm";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      // @ts-ignore
      const { data: authData } = await insforge.auth.getCurrentUser();

      if (!authData?.user) {
        router.push("/login");
        return;
      }
      setUser(authData.user);

      // Fetch users_profile
      const { data: profileData } = await insforge.database
        .from("users_profile")
        .select("*")
        .eq("user_id", authData.user.id)
        .single();
        
      if (profileData) {
        setProfile(profileData);
      }
    } catch (err) {
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-brand-600" />
      </div>
    );
  }

  const role = user?.user_metadata?.role || "user";
  const isAdmin = role === "admin";

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-surface-50 min-h-screen py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                <User className="size-5 text-brand-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-surface-900">Profil Saya</h1>
                <p className="text-surface-500 text-sm">Kelola informasi pribadi dan alamat pengiriman Anda</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: User Details */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-surface-200 text-center relative overflow-hidden">
                {isEditing ? (
                  <EditProfileForm 
                    user={user} 
                    profile={profile} 
                    onCancel={() => setIsEditing(false)}
                    onSuccess={(updatedProfile, updatedUser) => {
                      if (updatedProfile) setProfile(updatedProfile);
                      if (updatedUser) setUser(updatedUser);
                      setIsEditing(false);
                    }}
                  />
                ) : (
                  <>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="absolute top-4 right-4 p-2 text-surface-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                      title="Edit Profil"
                    >
                      <Settings className="size-5" />
                    </button>

                    <div className="w-24 h-24 bg-gradient-to-tr from-brand-100 to-brand-50 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold border-4 border-white shadow-sm overflow-hidden relative">
                      {user?.user_metadata?.avatar_url ? (
                        <Image src={user.user_metadata.avatar_url} alt="Avatar" fill className="object-cover" />
                      ) : (
                        (profile?.name || user?.email)?.charAt(0).toUpperCase()
                      )}
                    </div>
                    <h2 className="font-bold text-surface-900 text-lg mb-1 truncate px-2" title={profile?.name || user?.email}>
                      {profile?.name || user?.user_metadata?.name || user?.email?.split('@')[0]}
                    </h2>
                    <div className="flex items-center justify-center gap-1.5 text-surface-500 text-sm mb-6">
                      {isAdmin ? <ShieldCheck className="size-4 text-brand-500" /> : <Shield className="size-4 text-emerald-500" />}
                      <span className="capitalize">{isAdmin ? 'Administrator' : 'Pelanggan'}</span>
                    </div>
                    
                    <div className="space-y-3 text-left">
                      <div className="bg-surface-50 p-3 rounded-xl flex items-center gap-3">
                        <Mail className="size-5 text-surface-400" />
                        <div className="min-w-0">
                          <p className="text-xs text-surface-500 font-medium">Email</p>
                          <p className="text-sm font-semibold text-surface-900 truncate">{user?.email}</p>
                        </div>
                      </div>

                      {user?.user_metadata?.phone && (
                        <div className="bg-surface-50 p-3 rounded-xl flex items-center gap-3">
                          <Phone className="size-5 text-surface-400" />
                          <div className="min-w-0">
                            <p className="text-xs text-surface-500 font-medium">WhatsApp</p>
                            <p className="text-sm font-semibold text-surface-900 truncate">{user.user_metadata.phone}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Address Manager */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-surface-200">
                <AddressManager userId={user?.id} />
              </div>
            </div>
          </div>
          
        </div>
      </main>

      <Footer />
    </>
  );
}
