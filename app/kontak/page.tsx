import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Hubungi Kami | Bakey Boo",
  description: "Ada pertanyaan? Tim Bakey Boo siap membantu Anda.",
};

export default function KontakPage() {
  return (
    <>
      <Navbar />
      <main className="bg-surface-50 min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-heading text-surface-900 mb-4">Hubungi Kami</h1>
          <p className="text-lg text-surface-600 max-w-2xl mx-auto">
            Ada pertanyaan tentang pesanan Anda? Atau ingin memberikan masukan? Jangan ragu untuk menghubungi tim kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden border border-surface-200 shadow-sm">
          {/* Informasi Kontak */}
          <div className="bg-brand-600 text-white p-10 lg:p-12">
            <h2 className="text-2xl font-bold mb-8">Informasi Kontak</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Alamat Toko</h3>
                  <p className="text-brand-100 leading-relaxed">
                    Jl. Affandi No. 123, Gejayan<br />
                    Depok, Sleman<br />
                    Daerah Istimewa Yogyakarta 55281
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Telepon & WhatsApp</h3>
                  <p className="text-brand-100">+62 812-3456-7890</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-brand-100">hello@bakeyboo.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Jam Operasional</h3>
                  <p className="text-brand-100">Setiap Hari: 07:00 - 21:00 WIB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Kontak */}
          <div className="p-10 lg:p-12 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-surface-900 mb-6">Kirim Pesan</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-surface-700">Nama Lengkap</label>
                  <input 
                    type="text" 
                    id="name"
                    className="w-full bg-surface-50 border border-surface-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-surface-700">Alamat Email</label>
                  <input 
                    type="email" 
                    id="email"
                    className="w-full bg-surface-50 border border-surface-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                    placeholder="contoh@email.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-surface-700">Subjek</label>
                <input 
                  type="text" 
                  id="subject"
                  className="w-full bg-surface-50 border border-surface-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                  placeholder="Subjek pesan Anda"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-surface-700">Pesan</label>
                <textarea 
                  id="message"
                  rows={5}
                  className="w-full bg-surface-50 border border-surface-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors resize-none"
                  placeholder="Tuliskan pesan Anda di sini..."
                ></textarea>
              </div>
              <button 
                type="button"
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
