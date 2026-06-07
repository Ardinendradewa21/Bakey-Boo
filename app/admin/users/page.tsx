import { insforge } from "@/lib/insforge";
import { formatPrice } from "@/lib/utils";
import { Users, Shield, ShieldCheck, Phone, Mail, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

async function getUsers() {
  try {
    // We fetch users_profile and addresses separately because their foreign key might point to auth.users, causing join errors
    const { data: users, error } = await insforge.database
      .from("users_profile")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch users:", error);
      return [];
    }

    const { data: addresses } = await insforge.database
      .from("addresses")
      .select("user_id, phone, is_default");

    const mappedUsers = (users || []).map(user => {
      const userAddresses = addresses?.filter(a => a.user_id === user.user_id) || [];
      return {
        ...user,
        addresses: userAddresses
      };
    });

    return mappedUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-surface-900">
            Manajemen Pengguna
          </h1>
          <p className="text-surface-500 mt-1">
            Kelola data pelanggan dan admin Bakey Boo
          </p>
        </div>
        <div className="bg-brand-50 text-brand-700 px-4 py-2 rounded-xl font-medium flex items-center gap-2">
          <Users className="size-5" />
          Total: {users.length} Pengguna
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden">
        {users.length === 0 ? (
          <div className="text-center py-16">
            <Users className="size-12 text-surface-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-surface-900 mb-2">Belum ada pengguna</h3>
            <p className="text-surface-500">Daftar pengguna akan muncul di sini ketika ada yang mendaftar.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-50 border-b border-surface-200 text-sm">
                  <th className="font-semibold text-surface-600 px-6 py-4">Pengguna</th>
                  <th className="font-semibold text-surface-600 px-6 py-4">Kontak</th>
                  <th className="font-semibold text-surface-600 px-6 py-4">Peran (Role)</th>
                  <th className="font-semibold text-surface-600 px-6 py-4">Tanggal Bergabung</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {users.map((user: any) => {
                  // Get phone from addresses (prefer default address if exists)
                  let phone = "-";
                  if (user.addresses && user.addresses.length > 0) {
                    const defaultAddress = user.addresses.find((a: any) => a.is_default);
                    phone = defaultAddress ? defaultAddress.phone : user.addresses[0].phone;
                  }

                  const isAdmin = user.role === "admin";

                  return (
                    <tr key={user.id} className="hover:bg-surface-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-surface-100 rounded-full flex items-center justify-center text-surface-600 font-bold border border-surface-200 shrink-0">
                            {(user.name || user.email || "U").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-surface-900">{user.name || "Tanpa Nama"}</div>
                            <div className="text-xs text-surface-500 font-mono mt-0.5">ID: {user.user_id?.substring(0,8) || user.id?.substring(0,8)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1.5 text-sm">
                          {user.email && (
                            <div className="flex items-center gap-2 text-surface-700">
                              <Mail className="size-3.5 text-surface-400 shrink-0" />
                              <span className="truncate max-w-[200px]" title={user.email}>{user.email}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-surface-700">
                            <Phone className="size-3.5 text-surface-400 shrink-0" />
                            <span>{phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {isAdmin ? (
                          <Badge className="bg-brand-100 text-brand-800 border-brand-200 font-medium">
                            <ShieldCheck className="size-3 mr-1" /> Admin
                          </Badge>
                        ) : (
                          <Badge className="bg-surface-100 text-surface-700 border-surface-200 font-medium">
                            <Shield className="size-3 mr-1 text-emerald-500" /> Pelanggan
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-surface-600">
                        {user.created_at ? new Date(user.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        }) : "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
