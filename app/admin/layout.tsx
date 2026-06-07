import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-50">
      <AdminSidebar />
      <div className="p-4 sm:ml-64">
        {/* Main Content Area */}
        <div className="p-4 sm:p-8 mt-2">
          {children}
        </div>
      </div>
    </div>
  );
}
