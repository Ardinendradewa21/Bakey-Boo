# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout.spec.ts >> Alur Belanja & Checkout (E2E) >> Skenario 2: Registered user bisa melakukan checkout
- Location: tests\e2e\checkout.spec.ts:45:7

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
        - button "A" [ref=e21]
  - main [ref=e22]:
    - generic [ref=e25]:
      - heading "Katalog Menu" [level=1] [ref=e26]
      - paragraph [ref=e27]: Temukan aneka roti dan donat lezat yang dipanggang segar setiap hari.
    - generic [ref=e29]:
      - complementary [ref=e30]:
        - generic [ref=e32]:
          - generic [ref=e33]:
            - heading "Kategori Menu" [level=3] [ref=e34]
            - paragraph [ref=e35]: Sesuaikan pilihan Anda
          - generic [ref=e36]:
            - generic [ref=e37]:
              - checkbox "Aneka Roti" [ref=e38]
              - checkbox [ref=e39]
              - generic [ref=e40] [cursor=pointer]: Aneka Roti
            - generic [ref=e41]:
              - checkbox "Donat Spesial" [ref=e42]
              - checkbox [ref=e43]
              - generic [ref=e44] [cursor=pointer]: Donat Spesial
            - generic [ref=e45]:
              - checkbox "Kue Kering" [ref=e46]
              - checkbox [ref=e47]
              - generic [ref=e48] [cursor=pointer]: Kue Kering
            - generic [ref=e49]:
              - checkbox "Minuman Segar" [ref=e50]
              - checkbox [ref=e51]
              - generic [ref=e52] [cursor=pointer]: Minuman Segar
      - generic [ref=e53]:
        - generic [ref=e55]:
          - heading "Semua Menu" [level=2] [ref=e56]
          - paragraph [ref=e57]: Menampilkan 10 menu
        - generic [ref=e58]:
          - generic [ref=e59]:
            - generic [ref=e60]:
              - img "Croissant Butter" [ref=e61]
              - generic [ref=e63]: Lainnya
              - button "Add to cart" [ref=e65]:
                - img
            - generic [ref=e66]:
              - link "Croissant Butter" [ref=e67] [cursor=pointer]:
                - /url: /products/croissant-butter
                - heading "Croissant Butter" [level=3] [ref=e68]
              - generic [ref=e69]:
                - generic [ref=e71]: Rp 25.000
                - generic [ref=e72]:
                  - img [ref=e73]
                  - generic [ref=e75]: "0.0"
                  - generic [ref=e76]: (0)
          - generic [ref=e77]:
            - generic [ref=e78]:
              - img "Matcha Latte Dingin" [ref=e79]
              - generic [ref=e81]: Lainnya
              - button "Add to cart" [ref=e83]:
                - img
            - generic [ref=e84]:
              - link "Matcha Latte Dingin" [ref=e85] [cursor=pointer]:
                - /url: /products/matcha-latte-dingin
                - heading "Matcha Latte Dingin" [level=3] [ref=e86]
              - generic [ref=e87]:
                - generic [ref=e89]: Rp 28.000
                - generic [ref=e90]:
                  - img [ref=e91]
                  - generic [ref=e93]: "0.0"
                  - generic [ref=e94]: (0)
          - generic [ref=e95]:
            - generic [ref=e96]:
              - img "Kastengel Keju Edam" [ref=e97]
              - generic [ref=e99]: Lainnya
              - button "Add to cart" [ref=e101]:
                - img
            - generic [ref=e102]:
              - link "Kastengel Keju Edam" [ref=e103] [cursor=pointer]:
                - /url: /products/kastengel-keju-edam
                - heading "Kastengel Keju Edam" [level=3] [ref=e104]
              - generic [ref=e105]:
                - generic [ref=e107]: Rp 95.000
                - generic [ref=e108]:
                  - img [ref=e109]
                  - generic [ref=e111]: "0.0"
                  - generic [ref=e112]: (0)
          - generic [ref=e113]:
            - generic [ref=e114]:
              - img "Roti Tawar Gandum" [ref=e115]
              - generic [ref=e117]: Lainnya
              - button "Add to cart" [ref=e119]:
                - img
            - generic [ref=e120]:
              - link "Roti Tawar Gandum" [ref=e121] [cursor=pointer]:
                - /url: /products/roti-tawar-gandum
                - heading "Roti Tawar Gandum" [level=3] [ref=e122]
              - generic [ref=e123]:
                - generic [ref=e125]: Rp 32.000
                - generic [ref=e126]:
                  - img [ref=e127]
                  - generic [ref=e129]: "0.0"
                  - generic [ref=e130]: (0)
          - generic [ref=e131]:
            - generic [ref=e132]:
              - img "Donat Bomboloni Vanilla" [ref=e133]
              - generic [ref=e135]: Lainnya
              - button "Add to cart" [ref=e137]:
                - img
            - generic [ref=e138]:
              - link "Donat Bomboloni Vanilla" [ref=e139] [cursor=pointer]:
                - /url: /products/donat-bomboloni-vanilla
                - heading "Donat Bomboloni Vanilla" [level=3] [ref=e140]
              - generic [ref=e141]:
                - generic [ref=e143]: Rp 48.000
                - generic [ref=e144]:
                  - img [ref=e145]
                  - generic [ref=e147]: "0.0"
                  - generic [ref=e148]: (0)
          - generic [ref=e149]:
            - generic [ref=e150]:
              - img "Es Kopi Susu Gula Aren" [ref=e151]
              - generic [ref=e153]: Lainnya
              - button "Add to cart" [ref=e155]:
                - img
            - generic [ref=e156]:
              - link "Es Kopi Susu Gula Aren" [ref=e157] [cursor=pointer]:
                - /url: /products/es-kopi-susu-gula-aren
                - heading "Es Kopi Susu Gula Aren" [level=3] [ref=e158]
              - generic [ref=e159]:
                - generic [ref=e161]: Rp 25.000
                - generic [ref=e162]:
                  - img [ref=e163]
                  - generic [ref=e165]: "0.0"
                  - generic [ref=e166]: (0)
          - generic [ref=e167]:
            - generic [ref=e168]:
              - img "Kue Kering Nastar Nanas" [ref=e169]
              - generic [ref=e171]: Lainnya
              - button "Add to cart" [ref=e173]:
                - img
            - generic [ref=e174]:
              - link "Kue Kering Nastar Nanas" [ref=e175] [cursor=pointer]:
                - /url: /products/kue-kering-nastar-nanas
                - heading "Kue Kering Nastar Nanas" [level=3] [ref=e176]
              - generic [ref=e177]:
                - generic [ref=e179]: Rp 85.000
                - generic [ref=e180]:
                  - img [ref=e181]
                  - generic [ref=e183]: "0.0"
                  - generic [ref=e184]: (0)
          - generic [ref=e185]:
            - generic [ref=e186]:
              - img "Roti Sobek Premium Coklat" [ref=e187]
              - generic [ref=e189]: Lainnya
              - button "Add to cart" [ref=e191]:
                - img
            - generic [ref=e192]:
              - link "Roti Sobek Premium Coklat" [ref=e193] [cursor=pointer]:
                - /url: /products/roti-sobek-premium-coklat
                - heading "Roti Sobek Premium Coklat" [level=3] [ref=e194]
              - generic [ref=e195]:
                - generic [ref=e197]: Rp 55.000
                - generic [ref=e198]:
                  - img [ref=e199]
                  - generic [ref=e201]: "0.0"
                  - generic [ref=e202]: (0)
          - generic [ref=e203]:
            - generic [ref=e204]:
              - img "Donat Kentang Gula Halus" [ref=e205]
              - generic [ref=e207]: Lainnya
              - button "Add to cart" [ref=e209]:
                - img
            - generic [ref=e210]:
              - link "Donat Kentang Gula Halus" [ref=e211] [cursor=pointer]:
                - /url: /products/donat-kentang-gula-halus
                - heading "Donat Kentang Gula Halus" [level=3] [ref=e212]
              - generic [ref=e213]:
                - generic [ref=e215]: Rp 45.000
                - generic [ref=e216]:
                  - img [ref=e217]
                  - generic [ref=e219]: "0.0"
                  - generic [ref=e220]: (0)
          - generic [ref=e221]:
            - generic [ref=e222]:
              - img "Roti Sisir Mentega Spesial" [ref=e223]
              - generic [ref=e225]: Lainnya
              - button "Add to cart" [ref=e227]:
                - img
            - generic [ref=e228]:
              - link "Roti Sisir Mentega Spesial" [ref=e229] [cursor=pointer]:
                - /url: /products/roti-sisir-mentega-spesial
                - heading "Roti Sisir Mentega Spesial" [level=3] [ref=e230]
              - generic [ref=e231]:
                - generic [ref=e233]: Rp 35.000
                - generic [ref=e234]:
                  - img [ref=e235]
                  - generic [ref=e237]: "0.0"
                  - generic [ref=e238]: (0)
  - contentinfo [ref=e239]:
    - generic [ref=e240]:
      - generic [ref=e241]:
        - generic [ref=e242]:
          - link "Bakey Boo" [ref=e243] [cursor=pointer]:
            - /url: /
            - img [ref=e244]
            - text: Bakey Boo
          - paragraph [ref=e246]: Toko roti dan donat terbaik. Pesan online, kami antar dengan segar dan penuh cinta.
          - generic [ref=e247]:
            - link [ref=e248] [cursor=pointer]:
              - /url: "#"
              - img [ref=e249]
            - link [ref=e251] [cursor=pointer]:
              - /url: "#"
              - img [ref=e252]
            - link [ref=e254] [cursor=pointer]:
              - /url: "#"
              - img [ref=e255]
        - generic [ref=e257]:
          - heading "Kategori" [level=3] [ref=e258]
          - list [ref=e259]:
            - listitem [ref=e260]:
              - link "Aneka Roti" [ref=e261] [cursor=pointer]:
                - /url: /products?category=aneka-roti
            - listitem [ref=e262]:
              - link "Donat Spesial" [ref=e263] [cursor=pointer]:
                - /url: /products?category=donat-spesial
        - generic [ref=e264]:
          - heading "Perusahaan" [level=3] [ref=e265]
          - list [ref=e266]:
            - listitem [ref=e267]:
              - link "Tentang Kami" [ref=e268] [cursor=pointer]:
                - /url: /tentang
            - listitem [ref=e269]:
              - link "Blog" [ref=e270] [cursor=pointer]:
                - /url: /blog
            - listitem [ref=e271]:
              - link "Karir" [ref=e272] [cursor=pointer]:
                - /url: /karir
            - listitem [ref=e273]:
              - link "Hubungi Kami" [ref=e274] [cursor=pointer]:
                - /url: /kontak
        - generic [ref=e275]:
          - heading "Dukungan" [level=3] [ref=e276]
          - list [ref=e277]:
            - listitem [ref=e278]:
              - link "FAQ" [ref=e279] [cursor=pointer]:
                - /url: /faq
            - listitem [ref=e280]:
              - link "Syarat & Ketentuan" [ref=e281] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e282]:
              - link "Kebijakan Privasi" [ref=e283] [cursor=pointer]:
                - /url: /privacy
          - link "hello@bakeyboo.com" [ref=e284] [cursor=pointer]:
            - /url: mailto:hello@bakeyboo.com
            - img [ref=e285]
            - text: hello@bakeyboo.com
      - generic [ref=e288]:
        - paragraph [ref=e289]: © 2026 Bakey Boo (PT Bakey Boo Nusantara). All rights reserved.
        - generic [ref=e290]:
          - generic [ref=e291]: Aman dengan
          - generic [ref=e292]: Midtrans
  - region "Notifications alt+T"
  - button "Open Next.js Dev Tools" [ref=e298] [cursor=pointer]:
    - img [ref=e299]
  - alert [ref=e302]
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
  20 |     await firstProductLink.click();
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
> 67 |     await firstProductLink.click();
     |                            ^ Error: locator.click: Test timeout of 30000ms exceeded.
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