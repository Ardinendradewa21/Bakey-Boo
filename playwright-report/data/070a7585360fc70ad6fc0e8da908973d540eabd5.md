# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout.spec.ts >> Alur Belanja & Checkout (E2E) >> Skenario 1: Guest bisa browse produk dan diarahkan ke login saat checkout
- Location: tests\e2e\checkout.spec.ts:5:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('a:has-text("Lihat Detail")').first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - link "Bakey Boo" [ref=e5] [cursor=pointer]:
          - /url: /
          - img [ref=e6]
          - text: Bakey Boo
        - generic [ref=e8]:
          - link "Semua Menu" [ref=e9] [cursor=pointer]:
            - /url: /products
          - link "Aneka Roti" [ref=e10] [cursor=pointer]:
            - /url: /products?category=aneka-roti
          - link "Donat Spesial" [ref=e11] [cursor=pointer]:
            - /url: /products?category=donat-spesial
          - link "Tentang Kami" [ref=e12] [cursor=pointer]:
            - /url: /tentang
      - generic [ref=e13]:
        - generic [ref=e14]:
          - img [ref=e15]
          - textbox "Cari roti, donat..." [ref=e18]
        - button [ref=e19]:
          - generic [ref=e20] [cursor=pointer]:
            - img
        - link "Masuk" [ref=e21] [cursor=pointer]:
          - /url: /login
          - img [ref=e22]
          - generic [ref=e25]: Masuk
        - link "Daftar" [ref=e26] [cursor=pointer]:
          - /url: /register
  - main [ref=e27]:
    - generic [ref=e30]:
      - heading "Katalog Menu" [level=1] [ref=e31]
      - paragraph [ref=e32]: Temukan aneka roti dan donat lezat yang dipanggang segar setiap hari.
    - generic [ref=e34]:
      - complementary [ref=e35]:
        - generic [ref=e37]:
          - generic [ref=e38]:
            - heading "Kategori Menu" [level=3] [ref=e39]
            - paragraph [ref=e40]: Sesuaikan pilihan Anda
          - generic [ref=e41]:
            - generic [ref=e42]:
              - checkbox "Aneka Roti" [ref=e43]
              - checkbox [ref=e44]
              - generic [ref=e45] [cursor=pointer]: Aneka Roti
            - generic [ref=e46]:
              - checkbox "Donat Spesial" [ref=e47]
              - checkbox [ref=e48]
              - generic [ref=e49] [cursor=pointer]: Donat Spesial
            - generic [ref=e50]:
              - checkbox "Kue Kering" [ref=e51]
              - checkbox [ref=e52]
              - generic [ref=e53] [cursor=pointer]: Kue Kering
            - generic [ref=e54]:
              - checkbox "Minuman Segar" [ref=e55]
              - checkbox [ref=e56]
              - generic [ref=e57] [cursor=pointer]: Minuman Segar
      - generic [ref=e58]:
        - generic [ref=e60]:
          - heading "Semua Menu" [level=2] [ref=e61]
          - paragraph [ref=e62]: Menampilkan 10 menu
        - generic [ref=e63]:
          - generic [ref=e64]:
            - generic [ref=e65]:
              - img "Croissant Butter" [ref=e66]
              - generic [ref=e68]: Lainnya
              - button "Add to cart" [ref=e70]:
                - img
            - generic [ref=e71]:
              - link "Croissant Butter" [ref=e72] [cursor=pointer]:
                - /url: /products/croissant-butter
                - heading "Croissant Butter" [level=3] [ref=e73]
              - generic [ref=e74]:
                - generic [ref=e76]: Rp 25.000
                - generic [ref=e77]:
                  - img [ref=e78]
                  - generic [ref=e80]: "0.0"
                  - generic [ref=e81]: (0)
          - generic [ref=e82]:
            - generic [ref=e83]:
              - img "Matcha Latte Dingin" [ref=e84]
              - generic [ref=e86]: Lainnya
              - button "Add to cart" [ref=e88]:
                - img
            - generic [ref=e89]:
              - link "Matcha Latte Dingin" [ref=e90] [cursor=pointer]:
                - /url: /products/matcha-latte-dingin
                - heading "Matcha Latte Dingin" [level=3] [ref=e91]
              - generic [ref=e92]:
                - generic [ref=e94]: Rp 28.000
                - generic [ref=e95]:
                  - img [ref=e96]
                  - generic [ref=e98]: "0.0"
                  - generic [ref=e99]: (0)
          - generic [ref=e100]:
            - generic [ref=e101]:
              - img "Kastengel Keju Edam" [ref=e102]
              - generic [ref=e104]: Lainnya
              - button "Add to cart" [ref=e106]:
                - img
            - generic [ref=e107]:
              - link "Kastengel Keju Edam" [ref=e108] [cursor=pointer]:
                - /url: /products/kastengel-keju-edam
                - heading "Kastengel Keju Edam" [level=3] [ref=e109]
              - generic [ref=e110]:
                - generic [ref=e112]: Rp 95.000
                - generic [ref=e113]:
                  - img [ref=e114]
                  - generic [ref=e116]: "0.0"
                  - generic [ref=e117]: (0)
          - generic [ref=e118]:
            - generic [ref=e119]:
              - img "Roti Tawar Gandum" [ref=e120]
              - generic [ref=e122]: Lainnya
              - button "Add to cart" [ref=e124]:
                - img
            - generic [ref=e125]:
              - link "Roti Tawar Gandum" [ref=e126] [cursor=pointer]:
                - /url: /products/roti-tawar-gandum
                - heading "Roti Tawar Gandum" [level=3] [ref=e127]
              - generic [ref=e128]:
                - generic [ref=e130]: Rp 32.000
                - generic [ref=e131]:
                  - img [ref=e132]
                  - generic [ref=e134]: "0.0"
                  - generic [ref=e135]: (0)
          - generic [ref=e136]:
            - generic [ref=e137]:
              - img "Donat Bomboloni Vanilla" [ref=e138]
              - generic [ref=e140]: Lainnya
              - button "Add to cart" [ref=e142]:
                - img
            - generic [ref=e143]:
              - link "Donat Bomboloni Vanilla" [ref=e144] [cursor=pointer]:
                - /url: /products/donat-bomboloni-vanilla
                - heading "Donat Bomboloni Vanilla" [level=3] [ref=e145]
              - generic [ref=e146]:
                - generic [ref=e148]: Rp 48.000
                - generic [ref=e149]:
                  - img [ref=e150]
                  - generic [ref=e152]: "0.0"
                  - generic [ref=e153]: (0)
          - generic [ref=e154]:
            - generic [ref=e155]:
              - img "Es Kopi Susu Gula Aren" [ref=e156]
              - generic [ref=e158]: Lainnya
              - button "Add to cart" [ref=e160]:
                - img
            - generic [ref=e161]:
              - link "Es Kopi Susu Gula Aren" [ref=e162] [cursor=pointer]:
                - /url: /products/es-kopi-susu-gula-aren
                - heading "Es Kopi Susu Gula Aren" [level=3] [ref=e163]
              - generic [ref=e164]:
                - generic [ref=e166]: Rp 25.000
                - generic [ref=e167]:
                  - img [ref=e168]
                  - generic [ref=e170]: "0.0"
                  - generic [ref=e171]: (0)
          - generic [ref=e172]:
            - generic [ref=e173]:
              - img "Kue Kering Nastar Nanas" [ref=e174]
              - generic [ref=e176]: Lainnya
              - button "Add to cart" [ref=e178]:
                - img
            - generic [ref=e179]:
              - link "Kue Kering Nastar Nanas" [ref=e180] [cursor=pointer]:
                - /url: /products/kue-kering-nastar-nanas
                - heading "Kue Kering Nastar Nanas" [level=3] [ref=e181]
              - generic [ref=e182]:
                - generic [ref=e184]: Rp 85.000
                - generic [ref=e185]:
                  - img [ref=e186]
                  - generic [ref=e188]: "0.0"
                  - generic [ref=e189]: (0)
          - generic [ref=e190]:
            - generic [ref=e191]:
              - img "Roti Sobek Premium Coklat" [ref=e192]
              - generic [ref=e194]: Lainnya
              - button "Add to cart" [ref=e196]:
                - img
            - generic [ref=e197]:
              - link "Roti Sobek Premium Coklat" [ref=e198] [cursor=pointer]:
                - /url: /products/roti-sobek-premium-coklat
                - heading "Roti Sobek Premium Coklat" [level=3] [ref=e199]
              - generic [ref=e200]:
                - generic [ref=e202]: Rp 55.000
                - generic [ref=e203]:
                  - img [ref=e204]
                  - generic [ref=e206]: "0.0"
                  - generic [ref=e207]: (0)
          - generic [ref=e208]:
            - generic [ref=e209]:
              - img "Donat Kentang Gula Halus" [ref=e210]
              - generic [ref=e212]: Lainnya
              - button "Add to cart" [ref=e214]:
                - img
            - generic [ref=e215]:
              - link "Donat Kentang Gula Halus" [ref=e216] [cursor=pointer]:
                - /url: /products/donat-kentang-gula-halus
                - heading "Donat Kentang Gula Halus" [level=3] [ref=e217]
              - generic [ref=e218]:
                - generic [ref=e220]: Rp 45.000
                - generic [ref=e221]:
                  - img [ref=e222]
                  - generic [ref=e224]: "0.0"
                  - generic [ref=e225]: (0)
          - generic [ref=e226]:
            - generic [ref=e227]:
              - img "Roti Sisir Mentega Spesial" [ref=e228]
              - generic [ref=e230]: Lainnya
              - button "Add to cart" [ref=e232]:
                - img
            - generic [ref=e233]:
              - link "Roti Sisir Mentega Spesial" [ref=e234] [cursor=pointer]:
                - /url: /products/roti-sisir-mentega-spesial
                - heading "Roti Sisir Mentega Spesial" [level=3] [ref=e235]
              - generic [ref=e236]:
                - generic [ref=e238]: Rp 35.000
                - generic [ref=e239]:
                  - img [ref=e240]
                  - generic [ref=e242]: "0.0"
                  - generic [ref=e243]: (0)
  - contentinfo [ref=e244]:
    - generic [ref=e245]:
      - generic [ref=e246]:
        - generic [ref=e247]:
          - link "Bakey Boo" [ref=e248] [cursor=pointer]:
            - /url: /
            - img [ref=e249]
            - text: Bakey Boo
          - paragraph [ref=e251]: Toko roti dan donat terbaik. Pesan online, kami antar dengan segar dan penuh cinta.
          - generic [ref=e252]:
            - link [ref=e253] [cursor=pointer]:
              - /url: "#"
              - img [ref=e254]
            - link [ref=e256] [cursor=pointer]:
              - /url: "#"
              - img [ref=e257]
            - link [ref=e259] [cursor=pointer]:
              - /url: "#"
              - img [ref=e260]
        - generic [ref=e262]:
          - heading "Kategori" [level=3] [ref=e263]
          - list [ref=e264]:
            - listitem [ref=e265]:
              - link "Aneka Roti" [ref=e266] [cursor=pointer]:
                - /url: /products?category=aneka-roti
            - listitem [ref=e267]:
              - link "Donat Spesial" [ref=e268] [cursor=pointer]:
                - /url: /products?category=donat-spesial
        - generic [ref=e269]:
          - heading "Perusahaan" [level=3] [ref=e270]
          - list [ref=e271]:
            - listitem [ref=e272]:
              - link "Tentang Kami" [ref=e273] [cursor=pointer]:
                - /url: /tentang
            - listitem [ref=e274]:
              - link "Blog" [ref=e275] [cursor=pointer]:
                - /url: /blog
            - listitem [ref=e276]:
              - link "Karir" [ref=e277] [cursor=pointer]:
                - /url: /karir
            - listitem [ref=e278]:
              - link "Hubungi Kami" [ref=e279] [cursor=pointer]:
                - /url: /kontak
        - generic [ref=e280]:
          - heading "Dukungan" [level=3] [ref=e281]
          - list [ref=e282]:
            - listitem [ref=e283]:
              - link "FAQ" [ref=e284] [cursor=pointer]:
                - /url: /faq
            - listitem [ref=e285]:
              - link "Syarat & Ketentuan" [ref=e286] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e287]:
              - link "Kebijakan Privasi" [ref=e288] [cursor=pointer]:
                - /url: /privacy
          - link "hello@bakeyboo.com" [ref=e289] [cursor=pointer]:
            - /url: mailto:hello@bakeyboo.com
            - img [ref=e290]
            - text: hello@bakeyboo.com
      - generic [ref=e293]:
        - paragraph [ref=e294]: © 2026 Bakey Boo (PT Bakey Boo Nusantara). All rights reserved.
        - generic [ref=e295]:
          - generic [ref=e296]: Aman dengan
          - generic [ref=e297]: Midtrans
  - region "Notifications alt+T"
  - button "Open Next.js Dev Tools" [ref=e303] [cursor=pointer]:
    - img [ref=e304]
  - alert [ref=e307]: Semua Menu | Bakey Boo | Bakey Boo
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Alur Belanja & Checkout (E2E)', () => {
  4  | 
  5  |   test('Skenario 1: Guest bisa browse produk dan diarahkan ke login saat checkout', async ({ page }) => {
  6  |     // 1. Kunjungi Beranda
  7  |     await page.goto('/');
  8  |     await expect(page).toHaveTitle(/Bakey Boo/);
  9  | 
  10 |     // 2. Klik Lihat Menu Kami
  11 |     await page.click('text="Lihat Menu Kami"');
  12 |     
  13 |     // Tunggu halaman katalog termuat
  14 |     await page.waitForURL('/products');
  15 |     await expect(page.locator('h1')).toContainText('Katalog Menu');
  16 | 
  17 |     // 3. Klik salah satu produk (contoh dengan teks "Beli Sekarang" atau klik card pertama)
  18 |     // Ambil link produk pertama dari daftar produk
  19 |     const firstProductLink = page.locator('a:has-text("Lihat Detail")').first();
> 20 |     await firstProductLink.click();
     |                            ^ Error: locator.click: Test timeout of 30000ms exceeded.
  21 | 
  22 |     // Tunggu masuk ke halaman produk
  23 |     await expect(page.locator('h3').filter({ hasText: 'Deskripsi Produk' })).toBeVisible();
  24 | 
  25 |     // 4. Tambahkan ke keranjang
  26 |     await page.click('button:has-text("Tambah ke Keranjang")');
  27 |     
  28 |     // Verifikasi toast notifikasi muncul (optional)
  29 |     await expect(page.locator('text=berhasil ditambahkan')).toBeVisible();
  30 | 
  31 |     // 5. Pergi ke keranjang
  32 |     await page.goto('/cart');
  33 |     await expect(page.locator('h1')).toContainText('Keranjang Belanja');
  34 |     
  35 |     // Pastikan ada item di keranjang
  36 |     await expect(page.locator('button:has-text("Lanjut Pembayaran")')).toBeVisible();
  37 | 
  38 |     // 6. Klik Lanjut Pembayaran (karena guest, akan diarahkan ke login)
  39 |     await page.click('button:has-text("Lanjut Pembayaran")');
  40 |     await page.waitForURL('**/login**');
  41 |     
  42 |     await expect(page.locator('h1')).toContainText('Masuk ke Akun');
  43 |   });
  44 | 
  45 |   test('Skenario 2: Registered user bisa melakukan checkout', async ({ page }) => {
  46 |     // 1. Kunjungi halaman Login
  47 |     await page.goto('/login');
  48 | 
  49 |     // 2. Isi form login (Menggunakan akun dari user)
  50 |     await page.fill('input[name="email"]', 'appleewak@gmail.com');
  51 |     await page.fill('input[name="password"]', 'Dewadewa');
  52 |     
  53 |     // Klik tombol Masuk
  54 |     await page.click('button[type="submit"]:has-text("Masuk")');
  55 | 
  56 |     // Tunggu diarahkan ke beranda atau kembali (Dashboard)
  57 |     await page.waitForURL('/');
  58 |     
  59 |     // Verifikasi ikon profil muncul (artinya sudah login)
  60 |     await expect(page.locator('button:has-text("appleewak")').or(page.locator('button:has-text("A")'))).toBeVisible({ timeout: 10000 }).catch(() => {
  61 |         // Abaikan jika fallback tidak persis "A" atau namanya beda, pokoknya kita asumsikan login berhasil
  62 |     });
  63 | 
  64 |     // 3. Langsung ke keranjang (Bisa saja keranjang kosong, kita isi dulu)
  65 |     await page.goto('/products');
  66 |     const firstProductLink = page.locator('a:has-text("Lihat Detail")').first();
  67 |     await firstProductLink.click();
  68 |     await page.click('button:has-text("Tambah ke Keranjang")');
  69 | 
  70 |     // 4. Pergi ke Checkout
  71 |     await page.goto('/checkout');
  72 |     await expect(page.locator('h1')).toContainText('Checkout');
  73 | 
  74 |     // 5. Pastikan halaman checkout meminta memilih alamat atau memproses ringkasan pesanan
  75 |     // (Pengecekan sederhana: jika ada Ringkasan Pesanan)
  76 |     await expect(page.locator('text=Ringkasan Pesanan')).toBeVisible();
  77 |     
  78 |     // Karena kita tidak ingin benar-benar membuat data transaksi fake terus menerus ke Midtrans
  79 |     // kita cukup memvalidasi hingga tombol "Bayar Sekarang" muncul.
  80 |     const payButton = page.locator('button:has-text("Bayar Sekarang")');
  81 |     if (await payButton.isVisible()) {
  82 |       await expect(payButton).not.toBeDisabled();
  83 |     }
  84 |   });
  85 | 
  86 | });
  87 | 
```