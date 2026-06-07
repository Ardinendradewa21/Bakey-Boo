import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan Privasi layanan Bakey Boo.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-surface-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-surface-200">
            <h1 className="font-heading font-extrabold text-3xl text-surface-900 mb-6">
              Kebijakan Privasi
            </h1>
            <p className="text-surface-500 mb-8">Pembaruan Terakhir: 1 Juni 2026</p>
            
            <div className="prose prose-surface max-w-none text-surface-700 space-y-6">
              <section>
                <h2 className="text-xl font-bold text-surface-900">1. Pendahuluan</h2>
                <p>
                  Bakey Boo sangat menghargai privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan melindungi informasi pribadi Anda saat menggunakan platform kami.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-surface-900">2. Informasi yang Kami Kumpulkan</h2>
                <p>
                  Kami dapat mengumpulkan informasi pribadi seperti nama, alamat email, nomor telepon, dan alamat pengiriman saat Anda mendaftar akun atau melakukan pembelian. Kami juga mengumpulkan data penggunaan secara otomatis (seperti IP address dan jenis browser) untuk meningkatkan layanan kami.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-surface-900">3. Penggunaan Informasi</h2>
                <p>
                  Informasi yang kami kumpulkan digunakan untuk:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Memproses dan mengirimkan pesanan Anda.</li>
                  <li>Berkomunikasi dengan Anda mengenai pesanan, promosi, atau pembaruan layanan.</li>
                  <li>Meningkatkan kualitas situs web dan pengalaman pengguna kami.</li>
                  <li>Mencegah aktivitas penipuan dan menjaga keamanan platform.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-surface-900">4. Pembagian Informasi</h2>
                <p>
                  Kami tidak akan menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Kami hanya membagikan data kepada mitra terpercaya yang membantu kami beroperasi, seperti jasa ekspedisi dan payment gateway (Midtrans), sejauh yang diperlukan untuk menyelesaikan transaksi Anda.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-surface-900">5. Keamanan Data</h2>
                <p>
                  Kami menerapkan langkah-langkah keamanan teknis yang wajar untuk melindungi informasi pribadi Anda dari akses, pengungkapan, atau modifikasi yang tidak sah. Namun, perlu diketahui bahwa tidak ada transmisi data melalui internet yang 100% aman.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-surface-900">6. Hak Anda</h2>
                <p>
                  Anda memiliki hak untuk mengakses, memperbarui, atau menghapus informasi pribadi Anda kapan saja melalui pengaturan akun. Jika Anda memerlukan bantuan, Anda dapat menghubungi tim layanan pelanggan kami.
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
