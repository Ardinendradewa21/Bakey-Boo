import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Blog | Bakey Boo",
  description: "Artikel terbaru, resep, dan berita dari Bakey Boo.",
};

const posts = [
  {
    title: "5 Tips Menyimpan Roti Agar Tetap Lembut Berhari-hari",
    excerpt: "Sering kesal karena roti cepat keras? Ikuti tips praktis dari ahli kami untuk menjaga kelembutan roti favorit Anda di rumah.",
    date: "8 Juni 2026",
    readTime: "3 min read",
    category: "Tips & Trik",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Mengenal Sejarah Croissant yang Tidak Banyak Diketahui",
    excerpt: "Tahukah Anda bahwa croissant sebenarnya bukan berasal dari Prancis? Mari telusuri jejak sejarah pastry populer ini.",
    date: "5 Juni 2026",
    readTime: "5 min read",
    category: "Edukasi",
    image: "https://images.unsplash.com/photo-1555507036-ab1e4006aaeb?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Peluncuran Menu Baru: Donat Matcha Almond Spesial",
    excerpt: "Bakey Boo menghadirkan varian rasa baru yang menggabungkan kelembutan donat dengan segarnya matcha asli Jepang.",
    date: "1 Juni 2026",
    readTime: "2 min read",
    category: "Berita",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop"
  }
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="bg-surface-50 min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-heading text-surface-900 mb-4">Blog Bakey Boo</h1>
          <p className="text-lg text-surface-600 max-w-2xl mx-auto">
            Temukan cerita menarik, tips seputar roti, dan pembaruan terbaru dari dapur kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article key={index} className="bg-white rounded-2xl border border-surface-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-brand-600 rounded-full">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-surface-500 mb-3">
                  <span className="flex items-center gap-1"><Calendar className="size-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="size-3.5" /> {post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-surface-900 mb-3 line-clamp-2 hover:text-brand-600 transition-colors">
                  <Link href="#">{post.title}</Link>
                </h2>
                <p className="text-surface-600 text-sm mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <Link href="#" className="inline-flex items-center gap-2 text-brand-600 font-medium text-sm hover:text-brand-700">
                    Baca Selengkapnya <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-6 py-3 bg-white border border-surface-200 text-surface-700 font-medium rounded-lg hover:bg-surface-50 transition-colors">
            Muat Lebih Banyak Artikel
          </button>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
