"use client";

import { useState } from "react";
import { updateOrderStatus } from "../actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, Clock, XCircle } from "lucide-react";

interface OrderActionsProps {
  orderId: string;
  currentStatus: string;
}

export function OrderActions({ orderId, currentStatus }: OrderActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateStatus = async (newStatus: string) => {
    setIsLoading(true);
    try {
      const result = await updateOrderStatus(orderId, newStatus);
      if (result.success) {
        toast.success(`Status pesanan berhasil diubah menjadi ${newStatus}`);
      } else {
        toast.error(result.error || "Gagal mengubah status pesanan");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button 
        variant={currentStatus === "pending" ? "default" : "outline"}
        size="sm"
        disabled={isLoading || currentStatus === "pending"}
        onClick={() => handleUpdateStatus("pending")}
        className={currentStatus === "pending" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
      >
        <Clock className="w-4 h-4 mr-2" />
        Pending
      </Button>
      
      <Button 
        variant={currentStatus === "completed" ? "default" : "outline"}
        size="sm"
        disabled={isLoading || currentStatus === "completed"}
        onClick={() => handleUpdateStatus("completed")}
        className={currentStatus === "completed" ? "bg-green-600 hover:bg-green-700" : ""}
      >
        <CheckCircle className="w-4 h-4 mr-2" />
        Selesai
      </Button>

      <Button 
        variant={currentStatus === "failed" ? "default" : "outline"}
        size="sm"
        disabled={isLoading || currentStatus === "failed"}
        onClick={() => handleUpdateStatus("failed")}
        className={currentStatus === "failed" ? "bg-red-600 hover:bg-red-700" : ""}
      >
        <XCircle className="w-4 h-4 mr-2" />
        Gagal / Batal
      </Button>
      
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-surface-500 ml-2" />}
    </div>
  );
}
