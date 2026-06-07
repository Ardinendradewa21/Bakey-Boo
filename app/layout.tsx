import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import { Toaster } from "sonner";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Bakey Boo — Freshly Baked, Delivered with Love",
    template: "%s | Bakey Boo",
  },
  description:
    "Toko roti dan donat premium Bakey Boo. Pesan aneka roti sobek, donat spesial, dan pastry lezat secara online dengan pengiriman cepat.",
  keywords: [
    "roti",
    "donat",
    "bakery",
    "toko roti",
    "roti sobek",
    "donat kentang",
    "bakey boo",
  ],
  authors: [{ name: "Bakey Boo Bakery" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Bakey Boo",
    title: "Bakey Boo — Freshly Baked, Delivered with Love",
    description:
      "Toko roti dan donat premium Bakey Boo. Pesan aneka roti sobek, donat spesial secara online.",
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bakey Boo — Freshly Baked, Delivered with Love",
    description:
      "Toko roti dan donat premium Bakey Boo. Pesan aneka roti sobek, donat spesial secara online.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
        lang="id"
        className={`${jakarta.variable} ${outfit.variable} h-full antialiased`}
      >
      <body className="min-h-full flex flex-col bg-white text-surface-900">
        {children}
        <Toaster position="top-center" richColors theme="light" />
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}
