# PRD: Digital Product E-Commerce Platform
## "Tumbuh Merekah" - Digital Products Marketplace

**Version:** 1.0  
**Last Updated:** May 25, 2026  
**Owner:** Ewak (Faqih Aulia Ardinendra Dewa)  
**Company:** PT Sinteniki Digital Solusi  

---

## 1. EXECUTIVE SUMMARY

Platform e-commerce eksklusif "Tumbuh Merekah" untuk penjualan digital products yang menargetkan Gen Z hingga Millennial. Platform ini merupakan single-vendor store (toko tunggal) milik Tumbuh Merekah yang menjual template, ebook, dan alat produktivitas digital dengan integrasi payment gateway dan UX yang menarik.

**Positioning:** "Toko eksklusif digital products dengan UX yang indah, aman, dan mudah digunakan untuk mendukung produktivitas"

---

## 2. PROBLEM STATEMENT

### User Pain Points:

**Untuk Creator/Seller:**
- Kesulitan membuat landing page profesional tanpa skill teknis
- Ribet mengatur payment gateway sendiri
- Tidak ada centralized dashboard untuk kelola banyak produk sekaligus
- Sulit track analytics penjualan real-time
- Tidak ada fitur untuk build trust dengan pembeli (testimonial, rating, review)

**Untuk Buyer:**
- Khawatir keamanan saat membeli file digital
- Tidak tahu produk yang dibeli berkualitas atau tidak sebelum membeli
- Banyak link tersebar di berbagai platform, bingung mencari
- Tidak ada jaminan keaslian/anti fraud
- Proses checkout yang ribet

---

## 3. TARGET MARKET & PERSONAS

### Primary Target:
- **Usia:** 18-40 tahun (Gen Z & Millennial)
- **Segments:**
  - Content Creator (YouTuber, TikToker, Instagramer)
  - Freelancer Designer/Developer
  - Educator/Course Creator
  - Entrepreneur/UMKM
  - Student yang monetize karya mereka

### Secondary Target:
- Corporate untuk training materials
- Startup yang jual lead magnet/toolkit

### User Personas:

#### Persona 1: Ahmad (Buyer - Young Professional)
- Umur: 27 tahun
- Background: Project manager startup
- Goal: Cari template spreadsheet untuk organize project, habit tracker
- Pain: Takut link broken, tidak tahu quality sebelum beli, prosesnya ribet
- Tech Savvy: High

#### Persona 2: Rina (Buyer - Mahasiswa/Fresh Graduate)
- Umur: 22 tahun
- Background: Mahasiswa tingkat akhir / job seeker
- Goal: Mencari template CV ATS friendly, ebook panduan karir
- Pain: Bingung mencari materi terpercaya, budget terbatas
- Tech Savvy: Medium-High

---

## 4. PRODUCT VISION & GOALS

### Vision:
"Menjadi marketplace #1 untuk digital products di Indonesia dengan fokus pada trust, ease-of-use, dan community"

### OKR (First 6 Months):

**Objective 1: Establish Product-Market Fit**
- KR1: 50 seller terdaftar aktif dengan minimal 5 produk setiap
- KR2: 1,000 buyer transaksi dengan repeat purchase rate 20%
- KR3: GMV (Gross Merchandise Value) Rp100 juta

**Objective 2: Build Trust & Credibility**
- KR1: 4.5+ rating average (dari user reviews)
- KR2: 95% on-time delivery rate untuk digital products
- KR3: Zero fraud complaints

**Objective 3: User Engagement**
- KR1: 40% DAU (Daily Active Users)
- KR2: 60% conversion rate dari product view ke checkout
- KR3: 500+ testimonial/review organik

---

## 5. CORE FEATURES (MVP - Phase 1)

### A. PUBLIC FEATURES (untuk semua user)

#### 5.1.1 Landing Page & Product Catalog
- **Home/Hero Section:**
  - Eye-catching hero dengan value proposition yang jelas
  - Featured/Trending products carousel
  - Category showcase (template, ebook, course, tool, preset)
  - Social proof (testimonial, stats)
  - CTA buttons (Browse Products, Seller Dashboard)

- **Product Listing/Catalog:**
  - Filter by category, price range, rating, newest, bestseller
  - Search functionality dengan autocomplete
  - Grid/List view toggle
  - Product card design yang menarik (thumbnail, title, price, rating, seller info)
  - Wishlist/Bookmark functionality

- **Product Detail Page:**
  - Product images/preview (carousel, gallery)
  - Product description yang persuasif dengan benefits
  - Feature list/specifications
  - Seller profile card (name, verified badge, rating, number of products)
  - Review & testimonial section dengan verified purchase badge
  - Video preview option (YouTube embed)
  - Related products carousel
  - CTA button (Add to Cart, Buy Now, Add to Wishlist)
  - Stock availability indicator (limited/unlimited)

#### 5.1.2 Shopping Cart & Checkout
- Shopping cart management (add, update quantity, remove)
- Subtotal calculation with proper breakdown
- Midtrans payment gateway integration
- Multiple payment methods (e-Wallet, Bank Transfer, Installment)
- Promo code application
- Guest checkout option
- Order confirmation email/notification

#### 5.1.3 User Account (Buyer Side)
- Account registration (email/social login)
- Profile management
- Order history
- Download/Access purchased products
- Wishlist management
- Address management (for future physical products)
- Transaction history & invoice

#### 5.1.4 Review & Rating System
- Post-purchase review prompt (after 24 hours)
- Rating system (1-5 stars)
- Photo/video upload capability
- Text review with moderation
- Verified purchase badge
- Helpful vote (thumbs up)
- Filter reviews (newest, highest, lowest)

### B. SELLER DASHBOARD FEATURES

#### 5.1.5 Seller Onboarding & Setup
- Seller registration with verification
- KYC (Know Your Customer) verification process
- Store setup wizard (store name, description, banner, logo)
- Payment account connection (bank account verification)
- Tax ID setup for large sellers

#### 5.1.6 Product Management
- Add/Edit/Delete products
- Bulk product upload (CSV import)
- Product visibility management (draft, published, archived)
- Pricing management (include discount/promo)
- Category assignment
- Stock management (unlimited digital vs limited slots)
- Digital file upload & management
  - Multiple file support
  - File preview
  - File versioning
  - Auto-deletion setting (no need to store forever)
  - Automatic file delivery via email after purchase
  - Google Drive/Dropbox integration for direct delivery link

#### 5.1.7 Sales Dashboard & Analytics
- **Overview Dashboard:**
  - Total revenue (today, month, year)
  - Total orders (pending, completed)
  - Top selling products
  - Conversion funnel
  - Visitor analytics
  - Revenue chart (line graph by time period)

- **Detailed Analytics:**
  - Product performance (views, click-through rate, conversion rate)
  - Traffic source analysis (organic, direct, social media)
  - Customer insights (repeat customers, new vs returning)
  - Refund/complaint ratio
  - Revenue breakdown by product/category

- **Reporting:**
  - Monthly/quarterly reports export (PDF, CSV)
  - Tax report generation (untuk compliance)
  - Payment settlement details

#### 5.1.8 Order & Customer Management
- View all orders (with filters: pending, completed, delivered, cancelled)
- Order detail page (customer info, product, payment, delivery status)
- Customer list with purchase history
- Manual refund request handling
- Bulk order actions

#### 5.1.9 Messaging & Support
- Direct message with buyers (in-app chat)
- Message templates for common questions
- Notification center
- Support ticket system

#### 5.1.10 Content Management
- Add rich content to product description (text editor WYSIWYG)
- FAQ section per product
- Product image/banner management
- Bulk edit capability
- Product categorization & organization

#### 5.1.11 Promo & Marketing Tools
- Create discount codes (percentage or fixed amount)
- Time-limited promotions
- Bundle deals (sell 2+ products together)
- Affiliate program management (if scaled)
- Email campaign integration (Kirim.email atau Mailchimp)
- Social media integration (auto-post to Instagram/TikTok)

### C. ADMIN DASHBOARD FEATURES

#### 5.1.12 Admin System Management
- User management (buyer, seller, admin roles)
- Seller verification & approval workflow
- Content moderation (product listings, reviews)
- Dispute resolution & refund handling
- Ban/suspend accounts if needed
- Role-based access control

#### 5.1.13 Platform Analytics
- Platform-wide sales metrics
- GMV tracking
- Seller performance leaderboard
- Payment processing metrics
- Fraud detection & prevention logs
- System health monitoring

#### 5.1.14 Configuration & Settings
- Payment gateway settings
- Tax & VAT configuration
- Commission structure management
- Email templates & settings
- Notification settings
- Category management
- Platform-wide promotions

---

## 6. TECHNICAL ARCHITECTURE

### 6.1 Tech Stack Recommendation: **NEXT.JS** (Alasan di bagian 7)

**Frontend:**
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS v4
- shadcn/ui (component library)
- TanStack Query (data fetching & caching)
- Zustand (state management)
- React Hook Form + Zod (form handling & validation)
- Axios/Fetch API (HTTP client)

**Backend:**
- Next.js API Routes / Server Actions (initial MVP)
- Node.js 20+
- Express.js (if scale beyond Next.js limitations)
- PostgreSQL 15+ (database)
- Prisma ORM (database abstraction)
- Redis (caching & session management)
- JWT (authentication)
- Bcrypt (password hashing)

**Payment & External Integrations:**
- Midtrans SDK Node.js
- Multer (file upload handling)
- Sharp (image optimization)
- Nodemailer (email service)
- Firebase/AWS S3 (file storage for digital products)

**DevOps & Deployment:**
- Vercel (for Next.js deployment)
- GitHub (version control)
- GitHub Actions (CI/CD)
- PostgreSQL (managed database - Vercel Postgres, Supabase, atau Railway)
- Docker (containerization untuk production)

**Monitoring & Analytics:**
- Sentry (error tracking)
- Plausible Analytics (privacy-first analytics)
- LogRocket (session replay)

---

## 7. TECH STACK DECISION: NEXT.JS vs LARAVEL

### Comparison Analysis:

| Criteria | Next.js | Laravel |
|----------|---------|---------|
| **Learning Curve** | Medium (JS framework) | Medium-High (PHP framework) |
| **Development Speed** | Fast (full-stack JS) | Fast (mature framework) |
| **Scalability** | Excellent (Node.js) | Good (PHP 8.2+) |
| **Performance** | Excellent (server components) | Good |
| **Real-time Features** | Native WebSocket support | Need package integration |
| **API Development** | Native API routes | Native API routes |
| **File Upload/Storage** | Simple setup | Straightforward |
| **Payment Gateway** | Good SDK support | Good SDK support |
| **Hosting Cost** | Moderate (Vercel) | Low (shared hosting) |
| **Team Expertise** | JavaScript dominance | PHP less popular now |
| **Community** | Huge & active | Large & mature |

### **RECOMMENDATION: NEXT.JS** ✅

**Reasons:**
1. **Full-stack JavaScript:** Sama bahasa frontend-backend, easier context switching
2. **Modern DX:** Built-in optimization, automatic code splitting, better tooling
3. **Server Components:** Better untuk e-commerce (SSR benefits untuk SEO & performance)
4. **Vercel Integration:** Direct deployment, preview URLs, easy scaling
5. **File Upload Handling:** Native support untuk digital product delivery
6. **Real-time Capabilities:** WebSocket support untuk future chat/notification feature
7. **API Routes:** Simple & powerful untuk Midtrans integration
8. **Your Expertise:** Sudah familiar dengan Next.js dari JanjiLink project
9. **Future-proof:** Actively developed, modern architecture

**If choose Laravel:**
- Better untuk traditional monolithic CRUD apps
- Cheaper hosting options
- Mais mature ecosystem untuk certain integrations
- BUT: Overkill untuk platform ini, slower development

---

## 8. DATABASE SCHEMA (Simplified)

```
Users_Profile (id, user_id, name, avatar_url, role, phone, created_at)

Products (id, title, slug, description, price, category, is_published, view_count, stock, delivery_method, rating_avg, review_count, created_at)
├── product_images (id, product_id, url, sort_order)
├── product_files (id, product_id, file_url, file_name, file_type)
├── product_tags (id, product_id, tag_name)

Orders (id, buyer_id, total_price, status, snap_token, created_at)
├── order_items (id, order_id, product_id, price)

Payments (id, order_id, payment_method, transaction_id, snap_token, status, midtrans_response)

Reviews (id, product_id, buyer_id, rating, comment, is_verified, helpful_count, created_at)

PromoCode (id, code, discount_type, discount_value, min_purchase, max_usage, usage_count, expires_at, is_active)
```

> **Catatan Arsitektur:**
> - Ini adalah **Single-Vendor Store** — tidak ada tabel `sellers` atau `seller_profiles`.
> - Semua produk dikelola oleh Admin Tumbuh Merekah melalui `/admin`.
> - Kolom `seller_id` di tabel `products` telah dihapus.
> - Admin ditentukan berdasarkan email (`adrinindadewa2016@gmail.com`) di application level.
> - Backend menggunakan **InsForge SDK** (bukan Supabase/Prisma).

---

## 9. FEATURE PRIORITIZATION (MVP Roadmap)

### **Sprint 1 (Week 1-2): Core Infrastructure & Auth**
- [ ] Project setup (Next.js, Prisma, database)
- [ ] User authentication (signup, login, logout)
- [ ] Email verification
- [ ] Password reset flow
- [ ] Role-based access control (buyer, seller, admin)

### **Sprint 2 (Week 3-4): Buyer Experience - Product Browsing**
- [ ] Product listing page with filters & search
- [ ] Product detail page
- [ ] Product images gallery
- [ ] Reviews & ratings display
- [ ] Wishlist functionality
- [ ] Navigation & layout

### **Sprint 3 (Week 5-6): Buyer Experience - Checkout**
- [ ] Shopping cart
- [ ] Checkout flow
- [ ] Midtrans payment integration
- [ ] Order confirmation
- [ ] Order tracking (simple)
- [ ] Email notifications

### **Sprint 4 (Week 7-8): Seller Dashboard - Basic**
- [ ] Seller registration & verification
- [ ] Store setup wizard
- [ ] Product upload (single & bulk)
- [ ] Basic sales dashboard
- [ ] Order management

### **Sprint 5 (Week 9-10): Seller Tools & Analytics**
- [ ] Product editing & management
- [ ] Sales analytics dashboard
- [ ] Analytics reporting
- [ ] Promo code management
- [ ] Customer messaging

### **Sprint 6 (Week 11-12): Admin & Launch Prep**
- [ ] Admin dashboard
- [ ] User/seller management
- [ ] Content moderation
- [ ] Payment settlement
- [ ] Landing page optimization
- [ ] SEO optimization
- [ ] Beta testing & bugfixes

### **Phase 2 (Post-MVP):**
- [ ] Video preview support
- [ ] Advanced analytics (cohort, retention)
- [ ] Email campaign builder
- [ ] Affiliate program
- [ ] Community features (discussion forum, creator collab)
- [ ] Mobile app
- [ ] Live chat support
- [ ] Multi-currency support

---

## 10. FEATURE ANALYSIS: LYNK.ID → OUR PLATFORM

### Fitur Lynk.id yang HARUS diadopsi:

| Lynk.id Feature | Status | Implementasi Kami |
|---|---|---|
| Simple product upload | ✅ MVP | Sprint 4 - product upload wizard |
| Multiple product blocks | ✅ MVP | Product listing dengan kategori |
| Payment gateway integration | ✅ MVP | Midtrans (lebih powerful dari Lynk) |
| Digital file delivery | ✅ MVP | Auto-download after purchase |
| Analytics/dashboard | ✅ MVP | Sprint 5 - sales dashboard |
| Affiliate feature | 📌 Phase 2 | Post-MVP implementation |
| Community/exclusive access | 📌 Phase 2 | Discussion forum integration |
| Email follow-up (Kirim.email) | 📌 Phase 2 | Email marketing integration |

### Fitur Kami yang SUPERIOR dibanding Lynk.id:

| Fitur Kami | Keuntungan |
|---|---|
| **Dedicated marketplace, bukan link aggregator** | Better for discoverability & SEO |
| **Buyer reviews & ratings** | Build trust dengan social proof |
| **Advanced seller analytics** | Better business intelligence |
| **Bulk product management** | Save time untuk seller |
| **Admin moderation system** | Ensure quality control |
| **In-app messaging** | Better customer support |
| **Bundle deals & upselling** | Increase order value |
| **Tax reporting tools** | Compliance untuk seller |

### Fitur Lynk.id yang TIDAK perlu kami buat:

| Fitur | Alasan |
|---|---|
| Link-in-bio aggregator | Bukan scope kami, focus e-commerce aja |
| Video call consultation | Out of scope, bisa nanti via 3rd party |
| Merchandise integration | Phase 2, untuk now digital aja |
| Custom domain (Lynk Pro) | Marketplace berbasis domain kami sendiri |
| Chat/video button | Bisa nanti via WhatsApp integration |

---

## 11. USER FLOWS

### 11.1 Buyer Journey

```
[Browse Landing] 
  ↓
[View Products] → [Filter/Search] → [Product Detail]
  ↓
[Add to Cart / Wishlist]
  ↓
[Checkout] → [Select Payment] → [Pay via Midtrans]
  ↓
[Order Confirmation] 
  ↓
[Download Product / Access Link]
  ↓
[Leave Review] (after 24 hours)
```

### 11.2 Seller Journey

```
[Register as Seller]
  ↓
[Verification (KYC)]
  ↓
[Store Setup] → [Add Bank Account]
  ↓
[Upload First Product]
  ↓
[Dashboard] → [Monitor Sales]
  ↓
[Manage Orders] → [Respond to Customer]
  ↓
[View Analytics] → [Optimize & Add More Products]
```

### 11.3 Admin Journey

```
[Admin Login]
  ↓
[Dashboard] → [View Platform Metrics]
  ↓
[Seller Verification Queue]
  ↓
[Content Moderation] → [Review Flagged Products]
  ↓
[Dispute Resolution]
  ↓
[Platform Configuration]
```

---

## 12. SUCCESS METRICS & KPIs

### Business Metrics:
- **GMV (Gross Merchandise Value):** Target Rp100jt dalam 6 bulan
- **Transaction Volume:** 1,000 transaksi
- **Average Order Value (AOV):** Rp150,000
- **Customer Acquisition Cost (CAC):** < Rp5,000
- **Lifetime Value (LTV):** > Rp500,000

### User Metrics:
- **Daily Active Users (DAU):** 40% of registered users
- **Monthly Active Users (MAU):** 70% of registered users
- **Conversion Rate:** 6% (visitor → buyer)
- **Repeat Purchase Rate:** 20% (user membeli 2+ kali)
- **Cart Abandonment Rate:** < 40%

### Quality Metrics:
- **Average Product Rating:** 4.5+ stars
- **Customer Satisfaction:** 90%+ positive reviews
- **Payment Success Rate:** 95%+
- **Fraud Rate:** < 0.5%
- **Support Response Time:** < 2 hours

### Product Metrics:
- **Number of Active Sellers:** 50
- **Number of Active Products:** 250+
- **New Products per Week:** 20+
- **Product View-to-Purchase:** 6% conversion

---

## 13. SECURITY & COMPLIANCE

### Data Security:
- SSL/TLS encryption for all data in transit
- Password hashing with bcrypt
- Rate limiting pada login & API endpoints
- CSRF protection
- SQL injection prevention (via Prisma)
- XSS protection

### Payment Security:
- PCI DSS compliance (via Midtrans)
- Never store credit card data
- Tokenization untuk recurring payments (future)
- Fraud detection (Midtrans built-in)

### Privacy & Compliance:
- GDPR compliance (user data handling)
- Indonesia PPPK compliance (personal data protection)
- Terms of Service (ToS) page
- Privacy Policy page
- Refund policy yang jelas
- Data retention policy

---

## 14. GO-TO-MARKET STRATEGY

### Phase 1: Soft Launch (Beta)
- Target: 50 beta testers (mix of sellers & buyers)
- Channel: Social media (Instagram, TikTok, LinkedIn)
- Incentive: Early adopter discount (20% off), referral bonus
- Duration: 2 weeks

### Phase 2: Official Launch
- PR campaign di tech blogs & media lokal
- Influencer partnership (micro-influencers di space digital products)
- Paid ads (Meta Ads, TikTok Ads) targeting Gen Z & Millennial
- Content marketing (blog posts tentang digital product selling)
- Community building (Discord/WhatsApp group)

### Phase 3: Growth & Scale (Months 2-6)
- Seller acceleration program (workshop, mentoring)
- Buyer referral program
- Partnership dengan universities (student discount)
- Corporate training (bulk purchase program)
- Affiliate marketing untuk sellers

---

## 15. RISKS & MITIGATION

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Payment gateway issues** | Medium | High | Multiple payment methods, Midtrans support hotline, fallback manual payment |
| **Product quality issues** | High | Medium | Review moderation, seller rating system, refund policy, support team |
| **Low initial seller adoption** | High | High | Launch with 10-20 curated sellers, seller incentive program, easy onboarding |
| **Fraud/scam** | Medium | High | KYC verification, buyer protection guarantee, dispute resolution system |
| **Slow adoption among buyers** | High | High | Aggressive marketing, viral content, referral incentives, user-generated content |
| **Data breach** | Low | Critical | Strong security, regular audits, insurance, incident response plan |
| **Payment failures** | Medium | Medium | Retry logic, customer support, email follow-up, refund automation |
| **Scaling issues** | Medium | Medium | Database optimization, CDN for static assets, load testing, infrastructure planning |

---

## 16. PRICING STRATEGY (Tier 1)

### For Buyers:
- **FREE** (no account needed for browsing)
- Products sold by sellers at their determined price
- Service fee included dalam pricing seller

### For Sellers:
- **Free Plan:**
  - Unlimited products upload
  - Unlimited sales
  - **Commission: 5%** (kami dapat 5% dari setiap transaksi)
  - Basic analytics
  - No seller branding
  - Standard support

- **Pro Plan (Rp 99,000/month):**
  - Commission: 3% (lebih murah)
  - Advanced analytics
  - Custom domain (future)
  - Priority support
  - Seller badge/verification
  - Email marketing tools
  - Affiliate program access

- **Enterprise (Custom):**
  - Volume discounts (commission 1-2%)
  - White-label option
  - Dedicated account manager
  - API access
  - Custom reporting
  - SLA guarantee

### Revenue Model:
1. **Transaction Commission** (Primary): 3-5% per sale
2. **Premium Features** (Secondary): Seller subscription tiers
3. **Ads** (Phase 2): Featured product placements
4. **Affiliate Commission** (Phase 2): Commission from affiliate sales

---

## 17. LANDING PAGE ELEMENTS

### Hero Section:
- Large headline: "Jual & Beli Digital Products yang Berkualitas"
- Subheadline: "Dari template spreadsheet sampai online course, semua ada di satu tempat"
- CTA: "Mulai Jual Sekarang" / "Lihat Produk Sekarang"
- Hero image/video showing platform demo

### Social Proof Section:
- Testimonial cards (3-4 testimonials dari early adopters)
- Stats (GMV, number of sellers, products)
- Logos of featured creators/sellers

### Features Section:
- For Sellers: Easy upload, powerful analytics, secure payment
- For Buyers: Safe transaction, quality guaranteed, easy discovery

### FAQ Section:
- How to sell
- How to buy
- Payment security
- How to get support

### Footer:
- Links to ToS, Privacy Policy, Blog
- Contact information
- Social media links
- Newsletter signup

---

## 18. APPENDIX: GLOSSARY

- **GMV:** Gross Merchandise Value - total transaction value
- **DAU:** Daily Active Users
- **MAU:** Monthly Active Users
- **CAC:** Customer Acquisition Cost
- **LTV:** Lifetime Value
- **KYC:** Know Your Customer (identity verification)
- **MVP:** Minimum Viable Product
- **AOV:** Average Order Value
- **ToS:** Terms of Service
- **WYSIWYG:** What You See Is What You Get (text editor)

---

## 19. NEXT STEPS

1. **Week 1:** Validate PRD dengan stakeholder & team
2. **Week 2:** Finalize tech stack, setup development environment
3. **Week 3:** Start Sprint 1 (infrastructure & auth)
4. **Week 4-12:** Execute sprints according to roadmap
5. **Week 13+:** Soft launch & gather feedback

---

**Document Status:** Ready for Development
**Last Review:** May 25, 2026
**Next Review:** June 8, 2026 (after Sprint 1)
