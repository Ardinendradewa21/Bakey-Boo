"use client";

import { useState, useEffect } from "react";
import { insforge } from "@/lib/insforge";
import { Plus, MapPin, Trash2, Edit2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddressAutocomplete } from "./AddressAutocomplete";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface Address {
  id: string;
  label: string;
  recipient_name: string;
  phone: string;
  full_address: string;
  is_default: boolean;
}

export function AddressManager({ userId }: { userId: string }) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form State
  const [formId, setFormId] = useState("");
  const [label, setLabel] = useState("Rumah");
  const [recipient, setRecipient] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchAddresses();
  }, [userId]);

  const fetchAddresses = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await insforge.database
        .from("addresses")
        .select("*")
        .eq("user_id", userId)
        .order("is_default", { ascending: false });
        
      if (!error && data) {
        setAddresses(data);
      } else {
        // Fallback to local storage if table doesn't exist
        const localData = localStorage.getItem(`addresses_${userId}`);
        if (localData) setAddresses(JSON.parse(localData));
      }
    } catch (e) {
      const localData = localStorage.getItem(`addresses_${userId}`);
      if (localData) setAddresses(JSON.parse(localData));
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormId("");
    setLabel("Rumah");
    setRecipient("");
    setPhone("");
    setAddress("");
    setIsFormOpen(false);
  };

  const handleEdit = (addr: Address) => {
    setFormId(addr.id);
    setLabel(addr.label);
    setRecipient(addr.recipient_name);
    setPhone(addr.phone);
    setAddress(addr.full_address);
    setIsFormOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !phone || !address) {
      toast.error("Mohon lengkapi semua data alamat");
      return;
    }

    setIsSaving(true);
    const isNew = !formId;
    const newId = isNew ? uuidv4() : formId;
    const isFirstAddress = addresses.length === 0;

    const payload = {
      id: newId,
      user_id: userId,
      label,
      recipient_name: recipient,
      phone,
      full_address: address,
      is_default: isFirstAddress || (isNew ? false : addresses.find(a => a.id === formId)?.is_default)
    };

    try {
      // Try DB first
      const { error } = await insforge.database.from("addresses").upsert(payload);
      
      let newAddresses = [...addresses];
      if (isNew) {
        newAddresses.push(payload as Address);
      } else {
        newAddresses = newAddresses.map(a => a.id === formId ? (payload as Address) : a);
      }
      
      setAddresses(newAddresses);
      // Backup to localStorage
      localStorage.setItem(`addresses_${userId}`, JSON.stringify(newAddresses));
      
      toast.success(isNew ? "Alamat ditambahkan" : "Alamat diperbarui");
      resetForm();
    } catch (error) {
      // DB failed, just use localStorage
      let newAddresses = [...addresses];
      if (isNew) {
        newAddresses.push(payload as Address);
      } else {
        newAddresses = newAddresses.map(a => a.id === formId ? (payload as Address) : a);
      }
      setAddresses(newAddresses);
      localStorage.setItem(`addresses_${userId}`, JSON.stringify(newAddresses));
      
      toast.success(isNew ? "Alamat disimpan (Lokal)" : "Alamat diperbarui (Lokal)");
      resetForm();
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus alamat ini?")) return;
    
    try {
      await insforge.database.from("addresses").delete().eq("id", id);
    } catch (e) {} // Ignore DB errors

    const newAddresses = addresses.filter(a => a.id !== id);
    setAddresses(newAddresses);
    localStorage.setItem(`addresses_${userId}`, JSON.stringify(newAddresses));
    toast.success("Alamat dihapus");
  };

  const handleSetDefault = async (id: string) => {
    try {
      // Remove all defaults first in DB
      await insforge.database.from("addresses").update({ is_default: false }).eq("user_id", userId);
      // Set new default
      await insforge.database.from("addresses").update({ is_default: true }).eq("id", id);
    } catch (e) {} // Ignore DB errors

    const newAddresses = addresses.map(a => ({
      ...a,
      is_default: a.id === id
    }));
    // Sort so default is first
    newAddresses.sort((a, b) => (a.is_default === b.is_default) ? 0 : a.is_default ? -1 : 1);
    
    setAddresses(newAddresses);
    localStorage.setItem(`addresses_${userId}`, JSON.stringify(newAddresses));
    toast.success("Alamat utama diperbarui");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-surface-900">Alamat Pengiriman</h3>
        {!isFormOpen && (
          <Button onClick={() => setIsFormOpen(true)} className="bg-brand-50 text-brand-700 hover:bg-brand-100 hover:text-brand-800">
            <Plus className="size-4 mr-2" />
            Tambah Alamat
          </Button>
        )}
      </div>

      {isFormOpen && (
        <div className="bg-surface-50 p-6 rounded-2xl border border-surface-200">
          <h4 className="font-bold text-surface-900 mb-4">{formId ? "Edit Alamat" : "Alamat Baru"}</h4>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Label Alamat</Label>
                <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Contoh: Rumah, Kantor" required />
              </div>
              <div className="space-y-2">
                <Label>Nama Penerima</Label>
                <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Nama lengkap" required />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Nomor Handphone (WhatsApp)</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} placeholder="08123456789" type="tel" required />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Alamat Lengkap</Label>
                <AddressAutocomplete 
                  value={address} 
                  onChange={setAddress} 
                  placeholder="Ketik untuk mencari alamat..." 
                />
                <p className="text-xs text-surface-500 mt-1">Pilih dari rekomendasi atau ketik detail alamat Anda selengkapnya.</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-surface-200">
              <Button type="button" variant="outline" onClick={resetForm} disabled={isSaving}>Batal</Button>
              <Button type="submit" disabled={isSaving} className="bg-brand-600 hover:bg-brand-700">
                {isSaving ? "Menyimpan..." : "Simpan Alamat"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {!isLoading && !isFormOpen && addresses.length === 0 && (
        <div className="text-center py-10 bg-white border border-surface-200 border-dashed rounded-2xl">
          <MapPin className="size-10 text-surface-300 mx-auto mb-3" />
          <p className="text-surface-500 font-medium">Belum ada alamat tersimpan</p>
        </div>
      )}

      {!isFormOpen && addresses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map(addr => (
            <div key={addr.id} className={`p-5 rounded-2xl border ${addr.is_default ? 'border-brand-500 bg-brand-50/30' : 'border-surface-200 bg-white'} relative group`}>
              {addr.is_default && (
                <div className="absolute top-0 right-0 bg-brand-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl flex items-center gap-1">
                  <CheckCircle2 className="size-3" /> Utama
                </div>
              )}
              
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-surface-100 text-surface-700 text-xs font-bold px-2.5 py-1 rounded-md">{addr.label}</span>
              </div>
              
              <div className="space-y-1 mb-4">
                <p className="font-bold text-surface-900">{addr.recipient_name}</p>
                <p className="text-sm text-surface-500">{addr.phone}</p>
                <p className="text-sm text-surface-600 line-clamp-2 mt-2">{addr.full_address}</p>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-surface-100">
                {!addr.is_default && (
                  <Button variant="ghost" size="sm" onClick={() => handleSetDefault(addr.id)} className="text-xs h-8 px-2 text-surface-500 hover:text-brand-600">
                    Jadikan Utama
                  </Button>
                )}
                <div className="flex-1"></div>
                <Button variant="ghost" size="icon" onClick={() => handleEdit(addr)} className="h-8 w-8 text-surface-400 hover:text-brand-600">
                  <Edit2 className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(addr.id)} className="h-8 w-8 text-surface-400 hover:text-red-600">
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
