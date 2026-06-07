import { Briefcase, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Karir | Bakey Boo",
  description: "Bergabung dengan tim Bakey Boo.",
};

const jobs = [
  {
    title: "Senior Baker",
    type: "Full-time",
    location: "Yogyakarta",
    department: "Kitchen",
  },
  {
    title: "Digital Marketing Specialist",
    type: "Full-time",
    location: "Remote / Yogyakarta",
    department: "Marketing",
  },
  {
    title: "Customer Support Staff",
    type: "Part-time",
    location: "Yogyakarta",
    department: "Operations",
  }
];

export default function KarirPage() {
  return (
    <>
      <Navbar />
      <main className="bg-surface-50 min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-heading text-surface-900 mb-4">Bergabung dengan Bakey Boo</h1>
          <p className="text-lg text-surface-600">
            Jadilah bagian dari tim kami dan mari bersama-sama menyebarkan kebahagiaan manis ke seluruh Indonesia.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-surface-200 p-8 mb-12 text-center">
          <h2 className="text-xl font-bold text-surface-900 mb-4">Kenapa Memilih Bakey Boo?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div>
              <h3 className="font-semibold text-brand-600 mb-2">Budaya Positif</h3>
              <p className="text-sm text-surface-600">Kami mengutamakan kerja sama, kreativitas, dan saling menghargai antar anggota tim.</p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-600 mb-2">Fleksibilitas</h3>
              <p className="text-sm text-surface-600">Jam kerja yang fleksibel dan kesempatan bekerja remote untuk posisi tertentu.</p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-600 mb-2">Jenjang Karir</h3>
              <p className="text-sm text-surface-600">Peluang berkembang dan naik tingkat seiring dengan pertumbuhan perusahaan.</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-surface-900 mb-6">Posisi Terbuka</h2>
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <div key={index} className="bg-white rounded-xl border border-surface-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
              <div>
                <h3 className="text-lg font-bold text-surface-900 mb-2">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-surface-500">
                  <span className="flex items-center gap-1.5"><Briefcase className="size-4" /> {job.department}</span>
                  <span className="flex items-center gap-1.5"><Clock className="size-4" /> {job.type}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="size-4" /> {job.location}</span>
                </div>
              </div>
              <button className="px-6 py-2 bg-brand-50 text-brand-700 font-medium rounded-lg hover:bg-brand-100 transition-colors whitespace-nowrap">
                Lamar Sekarang
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-surface-500">
          <p>Tidak menemukan posisi yang cocok?</p>
          <p>Kirimkan CV Anda ke <a href="mailto:karir@bakeyboo.com" className="text-brand-600 font-medium hover:underline">karir@bakeyboo.com</a></p>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
