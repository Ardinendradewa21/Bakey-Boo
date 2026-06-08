import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan | Bakey Boo",
  description: "Syarat dan Ketentuan penggunaan layanan Bakey Boo.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface-50 min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-surface-200 shadow-sm">
            <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-surface-900 mb-6">
              Syarat & Ketentuan (Terms of Service)
            </h1>
            <p className="text-surface-500 mb-8">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>

            <div className="prose prose-surface max-w-none text-surface-700 space-y-6">
              <section>
                <h2 className="text-xl font-bold text-surface-900 mb-3">1. Pendahuluan</h2>
                <p>
                  Selamat datang di Bakey Boo! Syarat dan Ketentuan ini mengatur penggunaan Anda atas situs web dan layanan kami. Dengan mengakses atau menggunakan layanan kami, Anda setuju untuk terikat oleh Ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari ketentuan ini, Anda tidak boleh mengakses layanan ini.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-surface-900 mb-3">2. Akun Pengguna</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Anda bertanggung jawab untuk menjaga kerahasiaan kata sandi (password) akun Anda.</li>
                  <li>Anda setuju untuk tidak membagikan kredensial login Anda kepada pihak ketiga.</li>
                  <li>Bakey Boo berhak menangguhkan atau menghentikan akun yang terbukti melakukan aktivitas penipuan atau melanggar ketentuan ini.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-surface-900 mb-3">3. Pemesanan dan Pembayaran</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Semua harga yang tercantum dalam Rupiah (IDR) dan dapat berubah sewaktu-waktu tanpa pemberitahuan.</li>
                  <li>Pesanan baru akan mulai diproses dan dipanggang setelah sistem pembayaran (Midtrans) mengonfirmasi bahwa pembayaran telah berhasil.</li>
                  <li>Bakey Boo menggunakan gerbang pembayaran aman Midtrans. Kami tidak menyimpan atau memiliki akses langsung ke data kartu kredit/debit Anda.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-surface-900 mb-3">4. Kebijakan Pengiriman (Delivery)</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Karena kami menyajikan produk makanan segar (bakery), keterlambatan penerimaan yang disebabkan oleh ketiadaan pembeli di alamat tujuan berada di luar tanggung jawab kami.</li>
                  <li>Estimasi waktu pengiriman bergantung pada kurir/jasa pengantaran. Segala risiko dalam masa pengantaran (setelah pesanan diserahkan ke kurir) adalah tanggung jawab pihak ketiga.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-surface-900 mb-3">5. Kebijakan Pengembalian (Refund Policy)</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Karena sifat produk makanan yang mudah rusak, <strong>semua penjualan adalah final dan tidak dapat di-refund atau dikembalikan</strong>, kecuali terjadi kesalahan pengiriman pesanan oleh pihak Bakey Boo.</li>
                  <li>Jika Anda menerima produk yang salah atau rusak secara ekstrem akibat kelalaian kami, harap hubungi layanan pelanggan kami dalam waktu maksimal 2 jam setelah produk diterima beserta bukti foto/video unboxing.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-surface-900 mb-3">6. Perubahan Ketentuan</h2>
                <p>
                  Kami berhak untuk mengubah atau mengganti Ketentuan ini kapan saja. Perubahan yang material akan diberitahukan minimal 30 hari sebelum ketentuan baru mulai berlaku.
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
