import { z } from "zod";

// ============================================================
// Auth Schemas
// ============================================================

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Nama minimal 2 karakter")
      .max(100, "Nama maksimal 100 karakter"),
    email: z
      .string()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),
    password: z
      .string()
      .min(6, "Password minimal 6 karakter")
      .max(100, "Password maksimal 100 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
    role: z.string().default("buyer"), // Single-vendor: selalu buyer
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

// Verify email schema dihapus - verifikasi email dimatikan di dashboard

// ============================================================
// Product Schemas
// ============================================================

export const productSchema = z.object({
  title: z
    .string()
    .min(3, "Judul minimal 3 karakter")
    .max(200, "Judul maksimal 200 karakter"),
  description: z
    .string()
    .min(10, "Deskripsi minimal 10 karakter")
    .max(5000, "Deskripsi maksimal 5000 karakter"),
  price: z
    .number()
    .min(0, "Harga tidak boleh negatif")
    .max(100000000, "Harga maksimal Rp100.000.000"),
  category: z.enum(["template", "ebook"], {
    message: "Pilih kategori produk",
  }),
  stock: z.number().nullable().optional(),
  delivery_method: z.enum(["auto_email", "link", "direct_download"]).default("direct_download"),
});

// ============================================================
// Review Schema
// ============================================================

export const reviewSchema = z.object({
  rating: z.number().min(1, "Rating minimal 1").max(5, "Rating maksimal 5"),
  comment: z
    .string()
    .min(5, "Review minimal 5 karakter")
    .max(1000, "Review maksimal 1000 karakter")
    .optional(),
});

// ============================================================
// Promo Code Schema
// ============================================================

export const promoCodeSchema = z.object({
  code: z
    .string()
    .min(3, "Kode promo minimal 3 karakter")
    .max(20, "Kode promo maksimal 20 karakter")
    .regex(/^[A-Z0-9]+$/, "Kode promo hanya huruf kapital dan angka"),
  discount_type: z.enum(["percentage", "fixed"]),
  discount_value: z.number().min(1, "Nilai diskon minimal 1"),
  min_purchase: z.number().min(0).default(0),
  max_usage: z.number().min(1, "Batas penggunaan minimal 1").default(100),
  expires_at: z.string().optional(),
});

// ============================================================
// Inferred Types
// ============================================================

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;
export type PromoCodeFormData = z.infer<typeof promoCodeSchema>;
