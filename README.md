# PokoAds — Copilot Untuk Media Buyer Berpengalaman

> **Laporan Harian Via WhatsApp · Auto-Rules Iklan · Variasi Kreatif Dari Iklan Pemenang**  
> Dibangun berdasarkan **Product Requirements Document (PRD) Versi 1.1 (20 November 2026)** — disetujui untuk keluarga produk Poko (Fluxy).

Aplikasi web mobile-first & responsif yang dirancang untuk mengambil alih pekerjaan berulang harian media buyer (freelancer, agensi kecil, tim in-house) di **Meta Ads** dan **TikTok Ads**, sementara keputusan strategis tetap di tangan buyer.

---

## 🌟 Tiga Pilar Produk

1. **Pilar 1: Laporan Harian Via WhatsApp**
   - Ringkasan harian pukul 07.00 WIB langsung ke WhatsApp buyer via WhatsApp Cloud API resmi.
   - Merangkum: iklan yang dimatikan beserta alasannya, iklan yang dinaikkan beserta alasannya, deteksi kreatif lelah, rekomendasi harian, dan posisi spend vs target.
   - Dilengkapi pemisah atribusi transparan antara Meta Ads & TikTok Ads.

2. **Pilar 2: Auto-Rules (Aturan Otomatis)**
   - **Matikan Iklan Boncos:** Spend > Rp200.000 tanpa pembelian dlm 24 jam → jeda otomatis.
   - **Naikkan Budget Pemenang:** ROAS > 4,0x selama 2 hari berturut-turut → naikkan budget 20% (dibatasi pagu harian).
   - **Deteksi Kreatif Lelah:** CTR turun > 30% dlm 7 hari & frekuensi > 4 → peringatan & saran variasi.
   - Mode Simulasi (dry run) 3 hari pertama & Tombol Berhenti Darurat (Emergency Stop).

3. **Pilar 3: Variasi Kreatif Dari Iklan Pemenang**
   - Mendeteksi iklan pemenang dengan ROAS tinggi (mis. Serum Wajah ROAS 6,1x).
   - Menghasilkan variasi hook baru (Problem-Agitate-Solution, perbandingan harga, format video 9:16 / carousel).
   - Mewajibkan persetujuan manusia (*human approval*) sebelum tayang sebagai iklan uji.

---

## 📱 Spesifikasi Layar (Mockup Sesuai PRD)

- **Tab Beranda (Home):** Sapaan, kartu gelap Total Spend (Rp18.452.700), grid statistik 2x2 (Iklan Aktif, Campaign, ROAS, Spend Hari Ini), kartu Laporan Pagi Ini, Variasi Kreatif menunggu persetujuan, dan riwayat Aktivitas Terbaru.
- **Tab Iklan (Ads):** Pemilih akun (Meta Ads & TikTok Ads), pencarian, filter bottom sheet (rentang tanggal, budget, status berwarna: Aktif hijau, Dinaikkan biru, Dimatikan oranye), dan drawer rincian metrik iklan.
- **Tab Analitik (Analytics):** Grafik garis interaktif total spend (7H & 30H) dengan tooltip tanggal, bar ROAS per campaign, breakdown 5 provinsi teratas pasar Indonesia (DKI Jakarta, Jawa Barat, Jawa Timur, Jawa Tengah, Banten), dan daftar kreatif teratas.
- **Tab Pengaturan (Settings):** Profil buyer, konfigurasi jam kirim & nomor WhatsApp, token akun iklan terhubung, switch auto-rules bawaan, tombol darurat, dan pembuat aturan kustom.

---

## 🚀 Teknologi

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + Lucide React Icons
- **Deployment:** Vercel (Tim FLUXY)
- **Repo:** [github.com/ibobatsuga/pokoads](https://github.com/ibobatsuga/pokoads)

---

## 💻 Menjalankan Secara Lokal

```bash
# Clone repository
git clone https://github.com/ibobatsuga/pokoads.git
cd pokoads

# Install dependencies
npm install

# Jalankan server pengembangan
npm run dev
```

Buka `http://localhost:3000` di browser Anda (atau buka DevTools dalam mode responsive mobile ~390px untuk pengalaman native HP).
