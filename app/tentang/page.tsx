import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Leaf, Target, Heart, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tentang Kami | Bakey Boo",
  description: "Kenali lebih dalam Bakey Boo — toko roti dan donat premium yang menyajikan kebahagiaan manis setiap harinya.",
  openGraph: {
    title: "Tentang Kami | Bakey Boo",
    description: "Kenali lebih dalam Bakey Boo — toko roti dan donat premium yang menyajikan kebahagiaan manis setiap harinya.",
  },
};

const values = [
  {
    icon: Leaf,
    title: "Bahan Alami",
    description:
      "Kami menggunakan bahan-bahan terbaik, tanpa pengawet buatan, demi menyajikan rasa yang otentik dan aman dikonsumsi setiap hari.",
  },
  {
    icon: Heart,
    title: "Dibuat dengan Cinta",
    description:
      "Setiap adonan diuleni dan dipanggang sepenuh hati. Kami percaya makanan yang dibuat dengan cinta akan terasa lebih lezat.",
  },
  {
    icon: Target,
    title: "Kualitas Premium",
    description:
      "Dari pemilihan mentega, tepung, hingga cokelat pilihan, kami tidak pernah berkompromi soal standar mutu produk kami.",
  },
  {
    icon: Zap,
    title: "Cepat & Hangat",
    description:
      "Layanan pengiriman kami memastikan roti atau donat tiba di rumah Anda dalam kondisi sebaik saat baru keluar dari oven.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface-50 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-surface-200 shadow-sm">
            
            <div className="prose prose-brand max-w-none">
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-surface-900 mb-6">
                  Freshly Baked,<br/>Delivered with Love.
                </h1>
                <p className="text-lg text-surface-600 leading-relaxed max-w-2xl mx-auto">
                  Berawal dari kecintaan kami pada aroma panggangan roti segar di pagi hari, 
                  kami memutuskan untuk membagikan kebahagiaan tersebut kepada Anda melalui Bakey Boo.
                </p>
              </div>

              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12">
                <Image
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200"
                  alt="Bakey Boo Kitchen"
                  fill
                  className="object-cover"
                />
              </div>

              <h2>Cerita Kami</h2>
              <p>
                Bakey Boo adalah toko roti dan donat rumahan yang tumbuh menjadi tempat favorit keluarga. 
                Kami percaya bahwa secangkir kopi pagi atau teh sore tidak akan lengkap tanpa sepotong roti 
                sobek yang empuk atau donat bertabur gula yang manis.
              </p>
              <p>
                Misi kami sederhana: <strong>Membawa kehangatan dapur roti langsung ke meja makan Anda.</strong> 
                Kami memastikan setiap produk yang keluar dari oven Bakey Boo selalu segar, lezat, dan dibuat 
                dengan penuh cinta.
              </p>
            </div>

            <hr className="my-12 border-surface-100" />

            <div className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-surface-900 mb-8 text-center">Nilai-Nilai Kami</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="shrink-0 mt-1">
                      <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                        <value.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-surface-900 mb-2">{value.title}</h3>
                      <p className="text-surface-600 text-sm leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-50 rounded-2xl p-8 text-center mt-12 border border-brand-100">
              <h2 className="text-2xl font-heading font-bold text-brand-900 mb-4">Mulai Cicipi Menu Kami</h2>
              <p className="text-brand-700 mb-6 max-w-lg mx-auto">
                Jelajahi koleksi donat dan roti kami. Pesan hari ini dan nikmati selagi hangat!
              </p>
              <Link href="/products" className={buttonVariants({ size: "lg", className: "bg-brand-600 hover:bg-brand-700" })}>
                Lihat Menu Sekarang
              </Link>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
