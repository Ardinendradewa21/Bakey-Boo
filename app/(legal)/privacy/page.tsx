import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Bakey Boo",
  description: "Kebijakan Privasi penggunaan layanan Bakey Boo.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface-50 min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-surface-200 shadow-sm">
            <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-surface-900 mb-6">
              Kebijakan Privasi (Privacy Policy)
            </h1>
            <p className="text-surface-500 mb-8">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>

            <div className="prose prose-surface max-w-none text-surface-700 space-y-6">
              <section>
                <h2 className="text-xl font-bold text-surface-900 mb-3">1. Informasi yang Kami Kumpulkan</h2>
                <p>
                  Saat Anda menggunakan layanan Bakey Boo, baik sekadar menelusuri menu maupun saat melakukan pembelian, kami dapat mengumpulkan informasi berikut:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Informasi Profil:</strong> Nama lengkap, alamat email, dan nomor WhatsApp.</li>
                  <li><strong>Informasi Pengiriman:</strong> Alamat lengkap untuk tujuan pengantaran kurir.</li>
                  <li><strong>Data Ulasan:</strong> Teks, gambar, dan rating yang Anda bagikan saat mengulas produk kami.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-surface-900 mb-3">2. Bagaimana Kami Menggunakan Data Anda</h2>
                <p>Informasi yang kami kumpulkan hanya akan digunakan untuk:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Memproses, mengelola, dan mengantarkan pesanan makanan Anda dengan akurat.</li>
                  <li>Menghubungi Anda jika terjadi kendala pengiriman atau konfirmasi pesanan (melalui Email atau WhatsApp).</li>
                  <li>Menampilkan nama Anda pada ulasan publik di halaman produk (kecuali Anda memilih untuk tetap anonim/menghapus nama).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-surface-900 mb-3">3. Keamanan Transaksi dan Pembayaran</h2>
                <p>
                  Bakey Boo mengutamakan keamanan transaksi finansial Anda. Kami <strong>TIDAK PERNAH</strong> menyimpan informasi sensitif seperti nomor Kartu Kredit, Kartu Debit, atau kredensial perbankan Anda di server kami. Semua proses pembayaran dialihkan dan diamankan sepenuhnya oleh gerbang pembayaran berlisensi (Midtrans).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-surface-900 mb-3">4. Berbagi Data dengan Pihak Ketiga</h2>
                <p>
                  Kami sangat menghormati privasi Anda. Kami <strong>tidak pernah menjual, menyewakan, atau menukar</strong> informasi pribadi Anda kepada pihak ketiga mana pun untuk tujuan pemasaran (marketing). Data Anda hanya akan dibagikan kepada:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Layanan Ekspedisi/Kurir:</strong> Hanya nama, nomor HP, dan alamat pengiriman Anda untuk tujuan pengantaran.</li>
                  <li><strong>Otoritas Hukum:</strong> Jika diwajibkan oleh undang-undang atau panggilan pengadilan yang sah.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-surface-900 mb-3">5. Hubungi Kami</h2>
                <p>
                  Jika Anda memiliki pertanyaan terkait Kebijakan Privasi ini, atau ingin meminta penghapusan akun dan data Anda dari sistem kami, silakan hubungi kami di <strong>hello@bakeyboo.com</strong>.
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
