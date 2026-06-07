# CLAUDE.md — Bakey Boo E-Commerce Platform

> File ini adalah panduan utama untuk AI agent (Claude Code) dalam membantu development project Bakey Boo.
> Baca seluruh file ini sebelum menulis satu baris kode pun.

---

## 🧠 PROJECT IDENTITY

| Key | Value |
|-----|-------|
| **Nama Produk** | Bakey Boo |
| **Tagline** | Freshly Baked, Delivered with Love |
| **Tipe** | E-Commerce Web App — Roti & Donut |
| **Target User** | Konsumen Indonesia usia 18–40 tahun |
| **Versi** | 1.0.0 (MVP) |
| **Bahasa Kode** | TypeScript (strict) |
| **Bahasa UI** | Bahasa Indonesia |

---

## 🏗️ TECH STACK

```
Frontend       : Next.js 14+ (App Router), TypeScript, Tailwind CSS v4, shadcn/ui
Backend        : Next.js Route Handlers (API Routes)
Database       : PostgreSQL + Prisma ORM
Auth           : NextAuth.js v5 — Credentials + Google OAuth 2.0
Payment        : Midtrans Snap (Node.js SDK: midtrans-client)
Email          : Nodemailer + SMTP (atau Resend sebagai alternatif)
File Storage   : Cloudinary (upload & optimasi gambar produk)
State Mgmt     : Zustand (client state) + TanStack Query (server state/cache)
Hosting        : Vercel (frontend + API) + Neon (PostgreSQL managed)
Linting        : ESLint + Prettier
Testing        : Jest + React Testing Library (unit), Playwright (e2e)
```

---

## 📁 STRUKTUR DIREKTORI

```
bakey-boo/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route group: halaman auth
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   └── reset-password/
│   │       └── page.tsx
│   ├── (shop)/                   # Route group: halaman toko utama
│   │   ├── page.tsx              # Beranda /
│   │   ├── products/
│   │   │   ├── page.tsx          # Katalog /products
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Detail produk
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   └── checkout/
│   │       ├── page.tsx          # Multi-step checkout
│   │       ├── payment/
│   │       │   └── page.tsx
│   │       └── success/
│   │           └── page.tsx
│   ├── (legal)/                  # Route group: halaman legal
│   │   ├── terms/
│   │   │   └── page.tsx
│   │   └── privacy/
│   │       └── page.tsx
│   ├── profile/                  # Halaman profil user (protected)
│   │   ├── page.tsx
│   │   └── orders/
│   │       ├── page.tsx
│   │       └── [id]/
│   │           └── page.tsx
│   ├── admin/                    # Admin panel (protected, role=ADMIN)
│   │   ├── page.tsx              # Dashboard admin
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── orders/
│   │   │   └── page.tsx
│   │   └── users/
│   │       └── page.tsx
│   ├── api/                      # API Route Handlers
│   │   ├── auth/
│   │   │   ├── [...nextauth]/
│   │   │   │   └── route.ts      # NextAuth handler
│   │   │   ├── register/
│   │   │   │   └── route.ts
│   │   │   └── reset-password/
│   │   │       └── route.ts
│   │   ├── products/
│   │   │   ├── route.ts          # GET list, POST create
│   │   │   └── [slug]/
│   │   │       └── route.ts      # GET detail
│   │   ├── cart/
│   │   │   └── route.ts          # GET, POST, PATCH, DELETE
│   │   ├── orders/
│   │   │   ├── route.ts          # GET list, POST create
│   │   │   └── [id]/
│   │   │       └── route.ts      # GET detail, PATCH (cancel)
│   │   ├── payments/
│   │   │   └── create/
│   │   │       └── route.ts      # POST: generate Midtrans token
│   │   ├── midtrans/
│   │   │   └── webhook/
│   │   │       └── route.ts      # POST: Midtrans notification handler
│   │   └── admin/                # Admin-only endpoints
│   │       ├── products/
│   │       │   └── route.ts
│   │       ├── orders/
│   │       │   └── route.ts
│   │       └── users/
│   │           └── route.ts
│   ├── layout.tsx                # Root layout
│   └── globals.css
├── components/                   # Komponen UI
│   ├── ui/                       # shadcn/ui base components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductFilter.tsx
│   │   └── ProductGallery.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   └── CartSummary.tsx
│   ├── checkout/
│   │   ├── CheckoutStepper.tsx
│   │   ├── AddressForm.tsx
│   │   ├── ShippingMethod.tsx
│   │   └── OrderReview.tsx
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── GoogleSSOButton.tsx
│   └── admin/
│       ├── AdminSidebar.tsx
│       ├── ProductForm.tsx
│       └── OrderTable.tsx
├── lib/                          # Utilities & konfigurasi
│   ├── auth.ts                   # NextAuth config
│   ├── prisma.ts                 # Prisma client singleton
│   ├── midtrans.ts               # Midtrans client init
│   ├── cloudinary.ts             # Cloudinary config
│   ├── email.ts                  # Nodemailer / Resend config
│   ├── validations.ts            # Zod schemas
│   └── utils.ts                  # Helper functions (cn, formatRupiah, dll)
├── hooks/                        # Custom React hooks
│   ├── useCart.ts
│   ├── useProducts.ts
│   └── useOrders.ts
├── store/                        # Zustand stores
│   ├── cartStore.ts
│   └── uiStore.ts
├── types/                        # TypeScript types & interfaces
│   └── index.ts
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Data seeder
├── middleware.ts                 # Next.js middleware (auth guard, RBAC)
├── .env.local                    # Environment variables (JANGAN di-commit)
├── .env.example                  # Template env vars (wajib ada di repo)
├── next.config.ts
├── tailwind.config.ts
└── CLAUDE.md                     # File ini
```

---

## 🗃️ DATABASE SCHEMA (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
}

enum Provider {
  CREDENTIALS
  GOOGLE
}

enum OrderStatus {
  PENDING_PAYMENT
  PAID
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

enum PaymentStatus {
  PENDING
  SUCCESS
  FAILED
  EXPIRED
}

enum DiscountType {
  PERCENTAGE
  FIXED
}

model User {
  id             String    @id @default(cuid())
  name           String
  email          String    @unique
  passwordHash   String?
  image          String?
  role           Role      @default(USER)
  provider       Provider  @default(CREDENTIALS)
  providerId     String?
  tosAcceptedAt  DateTime?
  emailVerified  DateTime?
  isActive       Boolean   @default(true)
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  orders         Order[]
  cartItems      CartItem[]
  addresses      Address[]
  sessions       Session[]

  @@map("users")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model PasswordResetToken {
  id        String   @id @default(cuid())
  email     String
  token     String   @unique
  expiresAt DateTime
  usedAt    DateTime?
  createdAt DateTime @default(now())

  @@map("password_reset_tokens")
}

model Category {
  id        String    @id @default(cuid())
  name      String
  slug      String    @unique
  icon      String?
  isActive  Boolean   @default(true)
  createdAt DateTime  @default(now())

  products  Product[]

  @@map("categories")
}

model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String
  price       Decimal  @db.Decimal(12, 2)
  stock       Int      @default(0)
  images      String[] // Array of Cloudinary URLs
  categoryId  String
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  category    Category    @relation(fields: [categoryId], references: [id])
  cartItems   CartItem[]
  orderItems  OrderItem[]

  @@map("products")
}

model Address {
  id            String  @id @default(cuid())
  userId        String
  label         String  // Contoh: "Rumah", "Kantor"
  recipientName String
  phone         String
  street        String
  city          String
  province      String
  postalCode    String
  isDefault     Boolean @default(false)
  createdAt     DateTime @default(now())

  user          User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  orders        Order[]

  @@map("addresses")
}

model Order {
  id              String      @id @default(cuid())
  userId          String
  addressId       String
  status          OrderStatus @default(PENDING_PAYMENT)
  subtotal        Decimal     @db.Decimal(12, 2)
  shippingFee     Decimal     @db.Decimal(12, 2)
  discount        Decimal     @db.Decimal(12, 2) @default(0)
  total           Decimal     @db.Decimal(12, 2)
  midtransOrderId String      @unique
  notes           String?
  promoCodeId     String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  user            User        @relation(fields: [userId], references: [id])
  address         Address     @relation(fields: [addressId], references: [id])
  orderItems      OrderItem[]
  payment         Payment?
  promoCode       PromoCode?  @relation(fields: [promoCodeId], references: [id])

  @@map("orders")
}

model OrderItem {
  id               String  @id @default(cuid())
  orderId          String
  productId        String
  quantity         Int
  priceAtPurchase  Decimal @db.Decimal(12, 2)

  order            Order   @relation(fields: [orderId], references: [id])
  product          Product @relation(fields: [productId], references: [id])

  @@map("order_items")
}

model CartItem {
  id        String   @id @default(cuid())
  userId    String
  productId String
  quantity  Int
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  product   Product  @relation(fields: [productId], references: [id])

  @@unique([userId, productId])
  @@map("cart_items")
}

model Payment {
  id                    String        @id @default(cuid())
  orderId               String        @unique
  midtransTransactionId String?       @unique
  status                PaymentStatus @default(PENDING)
  paymentType           String?
  amount                Decimal       @db.Decimal(12, 2)
  paidAt                DateTime?
  rawResponse           Json?         // Store raw Midtrans response
  createdAt             DateTime      @default(now())
  updatedAt             DateTime      @updatedAt

  order                 Order         @relation(fields: [orderId], references: [id])

  @@map("payments")
}

model PromoCode {
  id            String       @id @default(cuid())
  code          String       @unique
  discountType  DiscountType
  discountValue Decimal      @db.Decimal(10, 2)
  minPurchase   Decimal      @db.Decimal(12, 2) @default(0)
  maxUsage      Int?
  usageCount    Int          @default(0)
  expiresAt     DateTime?
  isActive      Boolean      @default(true)
  createdAt     DateTime     @default(now())

  orders        Order[]

  @@map("promo_codes")
}
```

---

## 🔐 ENVIRONMENT VARIABLES

Buat file `.env.local` di root project. **Jangan pernah commit file ini.**

```bash
# ── DATABASE ──────────────────────────────────────
DATABASE_URL="postgresql://user:password@host:5432/bakeyboo?sslmode=require"

# ── NEXTAUTH ──────────────────────────────────────
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-dengan-openssl-rand-base64-32"

# ── GOOGLE OAUTH ──────────────────────────────────
GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxx"

# ── MIDTRANS ──────────────────────────────────────
MIDTRANS_SERVER_KEY="SB-Mid-server-xxxx"    # Gunakan SB- prefix untuk sandbox
MIDTRANS_CLIENT_KEY="SB-Mid-client-xxxx"
MIDTRANS_IS_PRODUCTION="false"              # Ubah ke "true" saat production

# ── CLOUDINARY ────────────────────────────────────
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# ── EMAIL (pilih salah satu) ──────────────────────
# Opsi A: SMTP biasa
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="noreply@bakeyboo.id"
SMTP_PASS="your-app-password"

# Opsi B: Resend
RESEND_API_KEY="re_xxxx"

# ── APP ───────────────────────────────────────────
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="SB-Mid-client-xxxx"  # Exposed ke browser
```

---

## 🔑 AUTH CONFIGURATION

### `lib/auth.ts` — NextAuth.js v5

```typescript
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.passwordHash) return null;
        if (!user.isActive) throw new Error("Akun dinonaktifkan.");

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Auto-link Google ke akun existing jika email sama
      if (account?.provider === "google" && user.email) {
        const existing = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (existing && existing.provider === "CREDENTIALS") {
          await prisma.user.update({
            where: { email: user.email },
            data: { providerId: account.providerAccountId },
          });
        }
        // Set tosAcceptedAt untuk user baru via Google
        if (!existing) {
          // Akan dibuat oleh adapter, update tosAcceptedAt setelahnya
          // Handle di event 'createUser'
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // Set tosAcceptedAt untuk user baru (SSO Google)
      await prisma.user.update({
        where: { id: user.id },
        data: { tosAcceptedAt: new Date() },
      });
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt" },
});
```

---

## 💳 MIDTRANS INTEGRATION

### `lib/midtrans.ts`

```typescript
import midtransClient from "midtrans-client";

export const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

export const coreApi = new midtransClient.CoreApi({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});
```

### `app/api/payments/create/route.ts`

```typescript
import { auth } from "@/lib/auth";
import { snap } from "@/lib/midtrans";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { orderId } = await req.json();

  const order = await prisma.order.findUnique({
    where: { id: orderId, userId: session.user.id },
    include: { orderItems: { include: { product: true } }, user: true },
  });

  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  const parameter = {
    transaction_details: {
      order_id: order.midtransOrderId,
      gross_amount: Number(order.total),
    },
    item_details: order.orderItems.map((item) => ({
      id: item.productId,
      price: Number(item.priceAtPurchase),
      quantity: item.quantity,
      name: item.product.name,
    })),
    customer_details: {
      first_name: order.user.name,
      email: order.user.email,
    },
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?order_id=${orderId}`,
      error: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/payment?error=1`,
      pending: `${process.env.NEXT_PUBLIC_APP_URL}/profile/orders/${orderId}`,
    },
  };

  const transaction = await snap.createTransaction(parameter);

  return NextResponse.json({ token: transaction.token, redirect_url: transaction.redirect_url });
}
```

### `app/api/midtrans/webhook/route.ts`

```typescript
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.json();

  // Verifikasi signature Midtrans
  const {
    order_id,
    status_code,
    gross_amount,
    signature_key,
    transaction_status,
    fraud_status,
    payment_type,
    transaction_id,
  } = body;

  const serverKey = process.env.MIDTRANS_SERVER_KEY!;
  const expectedSignature = crypto
    .createHash("sha512")
    .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
    .digest("hex");

  if (signature_key !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  // Temukan order berdasarkan midtrans order_id
  const order = await prisma.order.findUnique({
    where: { midtransOrderId: order_id },
  });
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  // Mapping status Midtrans → status internal
  let orderStatus = order.status;
  let paymentStatus: "PENDING" | "SUCCESS" | "FAILED" | "EXPIRED" = "PENDING";

  if (transaction_status === "capture" || transaction_status === "settlement") {
    if (fraud_status === "accept" || !fraud_status) {
      orderStatus = "PAID";
      paymentStatus = "SUCCESS";
    }
  } else if (transaction_status === "deny" || transaction_status === "cancel") {
    orderStatus = "CANCELLED";
    paymentStatus = "FAILED";
    // Release stok produk
    await releaseStock(order.id);
  } else if (transaction_status === "expire") {
    orderStatus = "CANCELLED";
    paymentStatus = "EXPIRED";
    await releaseStock(order.id);
  }

  // Update order & payment di database
  await prisma.$transaction([
    prisma.order.update({
      where: { id: order.id },
      data: { status: orderStatus, updatedAt: new Date() },
    }),
    prisma.payment.upsert({
      where: { orderId: order.id },
      create: {
        orderId: order.id,
        midtransTransactionId: transaction_id,
        status: paymentStatus,
        paymentType: payment_type,
        amount: parseFloat(gross_amount),
        paidAt: paymentStatus === "SUCCESS" ? new Date() : null,
        rawResponse: body,
      },
      update: {
        status: paymentStatus,
        paymentType: payment_type,
        paidAt: paymentStatus === "SUCCESS" ? new Date() : null,
        rawResponse: body,
      },
    }),
  ]);

  // Kirim email konfirmasi jika pembayaran sukses
  if (paymentStatus === "SUCCESS") {
    // await sendOrderConfirmationEmail(order);
  }

  return NextResponse.json({ message: "OK" });
}

async function releaseStock(orderId: string) {
  const orderItems = await prisma.orderItem.findMany({ where: { orderId } });
  for (const item of orderItems) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { stock: { increment: item.quantity } },
    });
  }
}
```

---

## 🛡️ MIDDLEWARE (Auth Guard + RBAC)

### `middleware.ts`

```typescript
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/profile", "/checkout", "/cart"];
const ADMIN_ROUTES = ["/admin"];
const AUTH_ROUTES = ["/login", "/register"];

export default auth((req) => {
  const { nextUrl, auth: session } = req as any;
  const pathname = nextUrl.pathname;

  const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r));
  const isProtectedRoute = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  // Redirect ke login jika belum auth
  if ((isProtectedRoute || isAdminRoute) && !session) {
    return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, req.url));
  }

  // Blokir non-admin masuk ke /admin
  if (isAdminRoute && session?.user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect ke home jika sudah login tapi akses halaman auth
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
```

---

## 🎨 DESIGN SYSTEM

### Warna Brand

```typescript
// tailwind.config.ts — extend colors
const colors = {
  brand: {
    primary:   "#D2691E",   // Cinnamon — tombol utama, heading
    secondary: "#F4A460",   // Sandy Brown — hover, badge
    cream:     "#FFF8DC",   // Cornsilk — background section
    dark:      "#3B1A00",   // Dark Chocolate — teks utama
    brown:     "#8B4513",   // Saddle Brown — teks sekunder, border
  },
};
```

### Komponen: `formatRupiah`

```typescript
// lib/utils.ts
export function formatRupiah(amount: number | string): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(amount));
}
// Output: "Rp 45.000"
```

### Konvensi Komponen

- Semua komponen menggunakan **shadcn/ui** sebagai base
- Styling dengan **Tailwind CSS utility classes** — tidak ada inline style atau CSS module
- Gunakan `cn()` dari `lib/utils.ts` untuk class merging
- Semua komponen async server di `app/` — gunakan `'use client'` hanya bila perlu interaktivitas
- Nama file komponen: **PascalCase** (`ProductCard.tsx`)
- Nama file utils/hooks: **camelCase** (`useCart.ts`)

---

## 📋 CODING CONVENTIONS

### TypeScript

```typescript
// ✅ SELALU definisikan return type untuk fungsi async
async function getProducts(): Promise<Product[]> { ... }

// ✅ Gunakan type inference untuk variable lokal
const user = await prisma.user.findUnique(...); // type otomatis

// ✅ Interface untuk props komponen
interface ProductCardProps {
  product: Product;
  onAddToCart?: (id: string) => void;
}

// ❌ JANGAN gunakan 'any'
const data: any = response; // SALAH
```

### API Route Handler Pattern

```typescript
// ✅ Selalu validasi input dengan Zod
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = schema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Validasi gagal", details: validated.error.flatten() },
        { status: 400 }
      );
    }
    // ... proses
  } catch (error) {
    console.error("[API ERROR]", error);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
```

### Error Handling

- API errors: return JSON dengan format `{ error: string, details?: any }`
- Client errors: gunakan `toast()` dari shadcn/ui untuk notifikasi user
- Server errors: log dengan prefix `[NAMA_MODUL ERROR]`, jangan expose detail ke client
- Selalu handle loading & error state di komponen

### Commit Message Format

```
feat: tambah halaman katalog produk dengan filter
fix: perbaiki validasi form checkout step 2
chore: update dependency midtrans-client ke v1.4
docs: update CLAUDE.md dengan schema terbaru
```

---

## 🔄 ALUR DEVELOPMENT

### Urutan Prioritas Build (MVP)

```
Phase 1 — Foundation
  [x] Setup Next.js 14 + TypeScript + Tailwind + shadcn/ui
  [x] Konfigurasi Prisma + PostgreSQL
  [x] Setup NextAuth.js (Credentials + Google OAuth)
  [ ] Middleware auth + RBAC

Phase 2 — Core Shop
  [ ] Halaman Beranda (static + featured products)
  [ ] Halaman Katalog Produk (grid, filter, pagination)
  [ ] Halaman Detail Produk
  [ ] Keranjang Belanja (Zustand store)

Phase 3 — Checkout & Payment
  [ ] Multi-step Checkout flow
  [ ] Integrasi Midtrans Snap
  [ ] Webhook handler Midtrans
  [ ] Halaman Success/Failed order

Phase 4 — User Account
  [ ] Halaman Profil
  [ ] Riwayat Pesanan
  [ ] Manajemen Alamat

Phase 5 — Admin Panel
  [ ] Dashboard statistik
  [ ] CRUD Produk + Cloudinary upload
  [ ] Manajemen Pesanan
  [ ] Manajemen User

Phase 6 — Legal & Polish
  [ ] Halaman Terms of Service
  [ ] Halaman Privacy Policy
  [ ] Cookie consent banner
  [ ] SEO metadata (next/metadata)
  [ ] Loading states & skeleton
  [ ] Error boundaries
```

---

## ⚠️ RULES & CONSTRAINTS UNTUK AI AGENT

> Aturan ini WAJIB diikuti tanpa pengecualian.

1. **JANGAN pernah hardcode secrets** — semua credentials dari `process.env`
2. **SELALU validasi input** dengan Zod sebelum proses di API handler
3. **SELALU verifikasi session** sebelum operasi yang butuh auth
4. **SELALU verifikasi Midtrans webhook signature** sebelum update order
5. **JANGAN expose error detail** ke client — log di server, return pesan generik
6. **GUNAKAN Prisma transaction** (`$transaction`) untuk operasi multi-tabel
7. **JANGAN delete data** — gunakan soft delete (`isActive = false`)
8. **SELALU kurangi stok** saat order dibuat, **kembalikan stok** jika order dibatalkan/expired
9. **Format harga** selalu dalam IDR menggunakan `formatRupiah()` di UI
10. **JANGAN commit** `.env.local` — pastikan ada di `.gitignore`
11. **Mobile-first** — semua komponen harus responsive mulai dari 320px
12. **Bahasa Indonesia** untuk semua teks yang tampil ke user
13. **TypeScript strict** — tidak ada `any`, tidak ada `// @ts-ignore` tanpa alasan yang jelas
14. **Server Components by default** — hanya tambah `'use client'` jika memang perlu

---

## 🧪 TESTING GUIDELINES

```typescript
// Unit test contoh: lib/utils.test.ts
describe("formatRupiah", () => {
  it("should format number to IDR", () => {
    expect(formatRupiah(45000)).toBe("Rp\u00a045.000");
  });
});

// API test contoh: gunakan supertest atau Next.js test utilities
// E2E: Playwright untuk flow checkout end-to-end
```

---

## 🚀 DEPLOYMENT CHECKLIST

Sebelum deploy ke production:

- [ ] Semua env vars sudah diset di Vercel dashboard
- [ ] `MIDTRANS_IS_PRODUCTION` diubah ke `"true"`
- [ ] Server key & client key sudah diganti ke production key Midtrans
- [ ] `NEXTAUTH_URL` sudah diset ke domain production
- [ ] Google OAuth redirect URI sudah diupdate ke domain production
- [ ] Prisma migration sudah dijalankan (`prisma migrate deploy`)
- [ ] Database sudah di-seed dengan kategori dasar
- [ ] Cloudinary upload preset sudah dikonfigurasi untuk production
- [ ] HTTPS aktif (otomatis di Vercel)
- [ ] Webhook URL Midtrans sudah diupdate ke domain production

---

## 📞 KONTAK & REFERENSI

| Resource | URL |
|----------|-----|
| Midtrans Docs | https://docs.midtrans.com |
| Midtrans Sandbox Dashboard | https://dashboard.sandbox.midtrans.com |
| NextAuth.js v5 | https://authjs.dev |
| Google Cloud Console | https://console.cloud.google.com |
| Prisma Docs | https://www.prisma.io/docs |
| shadcn/ui | https://ui.shadcn.com |
| Cloudinary Docs | https://cloudinary.com/documentation |
| Vercel Docs | https://vercel.com/docs |
| Neon PostgreSQL | https://neon.tech/docs |

---

*CLAUDE.md — Bakey Boo E-Commerce v1.0.0 | Last updated: Juni 2026*
