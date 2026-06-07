import { Coffee, Users, Target, Heart } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Tentang Kami | Bakey Boo",
  description: "Mengenal lebih dekat tim di balik Bakey Boo.",
};

const team = [
  {
    name: "Faqih Aulia Ardinanendra Dewa",
    nim: "124230150",
    role: "Project Manager",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Faqih&backgroundColor=fef3c7",
  },
  {
    name: "Lusiana Dwi Wahyuni",
    nim: "124230019",
    role: "UI/UX Designer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lusiana&backgroundColor=fce7f3",
  },
  {
    name: "Syaiful Akmal Aufa Rofiqi",
    nim: "124230132",
    role: "Backend Developer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Syaiful&backgroundColor=dbeafe",
  },
  {
    name: "Anastasya Eutikes",
    nim: "124230138",
    role: "Frontend Developer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anastasya&backgroundColor=e0e7ff",
  },
  {
    name: "Kadek Panji Nugraha Kresnawan",
    nim: "124230160",
    role: "Quality Assurance",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kadek&backgroundColor=dcfce3",
  },
];

export default function TentangPage() {
  return (
    <>
      <Navbar />
      <main className="bg-surface-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-brand-600 text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Coffee className="size-16 mx-auto mb-6 text-brand-200" />
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Cerita di Balik Bakey Boo</h1>
          <p className="text-lg text-brand-100 leading-relaxed">
            Berawal dari kecintaan pada aroma roti yang baru dipanggang, kami memiliki misi untuk mengantarkan kebahagiaan manis ke setiap rumah. Kami menggabungkan resep tradisional dengan teknologi modern.
          </p>
        </div>
      </section>

      {/* Nilai-nilai */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-brand-50 rounded-full flex items-center justify-center mb-4">
                <Heart className="size-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-surface-900 mb-2">Dibuat Penuh Cinta</h3>
              <p className="text-surface-600">Setiap roti dan donat kami buat seolah-olah untuk keluarga kami sendiri.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-brand-50 rounded-full flex items-center justify-center mb-4">
                <Target className="size-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-surface-900 mb-2">Kualitas Premium</h3>
              <p className="text-surface-600">Hanya menggunakan bahan-bahan segar pilihan tanpa pengawet buatan.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-brand-50 rounded-full flex items-center justify-center mb-4">
                <Users className="size-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-surface-900 mb-2">Layanan Terbaik</h3>
              <p className="text-surface-600">Kemudahan memesan secara online dan pengiriman langsung ke depan pintu Anda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tim IT / Kelompok */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-surface-900 mb-4 font-heading">Tim Pengembang (IT)</h2>
            <p className="text-surface-600 max-w-2xl mx-auto">
              Sistem toko online Bakey Boo dibangun dan dikembangkan dengan dedikasi tinggi oleh talenta-talenta IT luar biasa berikut ini.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl border border-surface-200 p-6 shadow-sm hover:shadow-md transition-shadow text-center w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-24 h-24 mx-auto rounded-full border-4 border-brand-50 mb-4 bg-surface-100"
                />
                <h3 className="text-lg font-bold text-surface-900 line-clamp-1" title={member.name}>{member.name}</h3>
                <p className="text-sm font-mono text-surface-500 mb-2 bg-surface-100 inline-block px-2 py-0.5 rounded mt-1">NIM: {member.nim}</p>
                <p className="font-medium text-brand-600 mt-2">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
