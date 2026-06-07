import { Resend } from "resend";
import { Product, OrderItem, ProductFile } from "@/types";
import { formatPrice } from "@/lib/utils";

// Inisialisasi Resend (Gunakan API Key dari environment variable)
const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key_for_build");

interface OrderDetails {
  orderId: string;
  totalPrice: number;
  buyerEmail: string;
}

export async function sendOrderReceiptEmail(
  orderDetails: OrderDetails,
  items: (OrderItem & { product: Product & { files?: ProductFile[] } })[]
) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn("⚠️ RESEND_API_KEY tidak ditemukan. Simulasi pengiriman email ke:", orderDetails.buyerEmail);
      console.log("Daftar produk yang dikirim:", items.map(i => i.product.title).join(", "));
      return { success: true, simulated: true };
    }

    const { data, error } = await resend.emails.send({
      from: "Tumbuh Merekah <noreply@tumbuhmerekah.com>", // Ganti dengan domain verified Anda nanti
      to: [orderDetails.buyerEmail],
      subject: `[Tumbuh Merekah] Pesanan Berhasil - Akses Produk Anda (${orderDetails.orderId})`,
      html: generateEmailHtml(orderDetails, items),
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Gagal mengirim email:", error);
    return { success: false, error };
  }
}

function generateEmailHtml(
  order: OrderDetails,
  items: (OrderItem & { product: Product & { files?: ProductFile[] } })[]
) {
  // Generate HTML List of products and their links
  const productsHtml = items
    .map((item) => {
      const p = item.product;
      
      // Ambil file URL (asumsi 1 file utama per produk)
      const fileUrl = p.files && p.files.length > 0 
        ? p.files[0].file_url 
        : "Hubungi admin untuk link produk.";

      return `
        <div style="margin-bottom: 24px; padding: 16px; border: 1px solid #E5E7EB; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #111827; font-size: 16px;">${p.title}</h3>
          <p style="color: #6B7280; font-size: 14px; margin-bottom: 24px;">Silakan klik tombol di bawah ini untuk melihat status dan melacak pesanan Anda.</p>
        <div style="text-align: center; margin-bottom: 32px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/purchases" style="display: inline-block; background-color: #f97316; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">Lacak Pesanan</a>
        </div>
        </div>
      `;
    })
    .join("");

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #374151;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="color: #059669; margin-bottom: 8px;">Tumbuh Merekah</h1>
        <p style="color: #6B7280; font-size: 16px;">Terima kasih atas pembelian Anda!</p>
      </div>

      <div style="background-color: #F9FAFB; padding: 24px; border-radius: 12px; margin-bottom: 32px;">
        <h2 style="margin-top: 0; color: #111827; font-size: 18px; border-bottom: 1px solid #E5E7EB; padding-bottom: 12px;">Ringkasan Pesanan</h2>
        <table style="width: 100%; margin-top: 16px;">
          <tr>
            <td style="padding-bottom: 8px; color: #6B7280;">Order ID:</td>
            <td style="padding-bottom: 8px; text-align: right; font-weight: 500; color: #111827;">${order.orderId}</td>
          </tr>
          <tr>
            <td style="padding-bottom: 8px; color: #6B7280;">Total Bayar:</td>
            <td style="padding-bottom: 8px; text-align: right; font-weight: bold; color: #059669;">${formatPrice(order.totalPrice)}</td>
          </tr>
        </table>
      </div>

      <div style="margin-bottom: 32px;">
        <h2 style="color: #111827; font-size: 18px; margin-bottom: 16px;">Produk Anda</h2>
        <p style="color: #6B7280; font-size: 14px; margin-bottom: 24px;">Silakan klik tombol di bawah ini untuk mengakses atau mengunduh produk digital yang telah Anda beli.</p>
        
        ${productsHtml}
      </div>

      <div style="text-align: center; padding-top: 32px; border-top: 1px solid #E5E7EB; color: #9CA3AF; font-size: 12px;">
        <p>Jika Anda mengalami kendala saat mengakses produk, silakan balas email ini.</p>
        <p>&copy; ${new Date().getFullYear()} Tumbuh Merekah. Hak Cipta Dilindungi.</p>
      </div>
    </div>
  `;
}
