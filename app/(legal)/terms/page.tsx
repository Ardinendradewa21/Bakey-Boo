import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: "Syarat dan Ketentuan layanan Bakey Boo.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-surface-200">
            <h1 className="font-heading font-extrabold text-3xl text-surface-900 mb-6">
              Syarat & Ketentuan Layanan
            </h1>
            <p className="text-surface-500 mb-8">Pembaruan Terakhir: 1 Juni 2026</p>
            
            <div className="prose prose-surface max-w-none text-surface-700 space-y-6">
              <section>
                <h2 className="text-xl font-bold text-surface-900">1. Pendahuluan</h2>
                <p>
                  Selamat datang di Bakey Boo! Dengan mengakses dan menggunakan platform kami, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini. Harap membacanya dengan saksama.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-surface-900">2. Produk dan Pemesanan</h2>
                <p>
                  Semua produk roti dan donat kami dibuat secara segar (freshly baked) setiap hari. Kami berusaha menampilkan produk dengan seakurat mungkin, namun warna atau ukuran asli mungkin sedikit berbeda. Pemesanan akan diproses jika stok tersedia dan pembayaran telah diverifikasi.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-surface-900">3. Harga dan Pembayaran</h2>
                <p>
                  Harga yang tertera pada situs kami dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Pembayaran diproses secara aman menggunakan payment gateway Midtrans. Kami tidak menyimpan informasi kartu kredit Anda di server kami.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-surface-900">4. Pengiriman</h2>
                <p>
                  Kami hanya melayani pengiriman ke area yang tercakup dalam radius operasional kami. Waktu pengiriman adalah estimasi, dan kami tidak bertanggung jawab atas keterlambatan yang disebabkan oleh keadaan di luar kendali kami (force majeure).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-surface-900">5. Pembatalan dan Pengembalian</h2>
                <p>
                  Pesanan yang sudah dibayar dan masuk ke tahap proses tidak dapat dibatalkan. Mengingat sifat produk kami yang mudah rusak (perishable), kami tidak menerima pengembalian produk (return) kecuali terdapat kesalahan pengiriman dari pihak Bakey Boo.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-surface-900">6. Perubahan Syarat & Ketentuan</h2>
                <p>
                  Bakey Boo berhak untuk mengubah, memodifikasi, menambah, atau menghapus bagian mana pun dari Syarat & Ketentuan ini kapan saja. Perubahan akan berlaku segera setelah diposting di situs web kami.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
