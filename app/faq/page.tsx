import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "FAQ | Bakey Boo",
  description: "Jawaban untuk pertanyaan umum seputar pemesanan roti dan donat di Bakey Boo.",
};

const faqs = [
  {
    question: "Apakah produk Bakey Boo selalu fresh?",
    answer: "Ya, semua produk kami dipanggang setiap hari (freshly baked) untuk memastikan kualitas dan rasa terbaik saat sampai di tangan Anda."
  },
  {
    question: "Berapa lama pesanan saya akan sampai?",
    answer: "Untuk metode pengiriman langsung, pesanan akan dikirim dalam 1-2 jam setelah konfirmasi pembayaran jika stok tersedia. Untuk pesanan khusus, kami akan menginformasikan waktu estimasinya."
  },
  {
    question: "Metode pembayaran apa saja yang tersedia?",
    answer: "Kami menerima berbagai metode pembayaran melalui payment gateway Midtrans, termasuk GoPay, ShopeePay, Qris, Virtual Account berbagai bank (BCA, BNI, Mandiri, dll), dan kartu kredit/debit."
  },
  {
    question: "Apakah saya bisa membatalkan pesanan?",
    answer: "Karena produk kami adalah makanan segar yang dibuat setiap harinya, pesanan yang sudah diproses tidak dapat dibatalkan atau dikembalikan."
  },
  {
    question: "Apakah ada minimum pembelian?",
    answer: "Tidak ada minimum pembelian! Anda bisa membeli satu buah roti atau selusin donat, kami akan melayani dengan sepenuh hati."
  }
];

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface-50 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-surface-900 mb-4">
              Tanya Jawab (FAQ)
            </h1>
            <p className="text-surface-600">
              Temukan jawaban untuk pertanyaan yang paling sering diajukan seputar pemesanan dan produk Bakey Boo.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 md:p-8 border border-surface-200 shadow-sm">
                <h3 className="text-lg font-bold text-surface-900 mb-3">{faq.question}</h3>
                <p className="text-surface-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center bg-brand-50 rounded-2xl p-8 border border-brand-100">
            <h3 className="text-xl font-bold text-brand-900 mb-2">Masih punya pertanyaan?</h3>
            <p className="text-brand-700 mb-6">Hubungi kami melalui email dan kami akan dengan senang hati membantu Anda.</p>
            <a href="mailto:adrinindadewa2016@gmail.com" className="inline-block bg-brand-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors">
              Hubungi Bantuan
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
