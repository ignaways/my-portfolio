# Ignatius Andri — Portfolio (React.js)

React 19 + Vite + TypeScript + Tailwind CSS v4 + Framer Motion + React Router

## Menjalankan
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # hasil di folder dist/
npm run preview
```

## Menambahkan foto
1. Simpan foto sebagai `public/images/ignatius-andri.jpg`.
2. Rasio **4:5 (potret)**, minimal **1000 × 1250 px**, ukuran file < 300 KB (kompres di squoosh.app).
3. Selama file belum ada, tampil kartu monogram "IA" — tidak ada gambar rusak.
Foto dipakai di: avatar hero, kartu potret di About, dan preview link (og:image).

Tips agar terlihat profesional: cahaya dari samping jendela (bukan flash), latar polos gelap/abu-abu,
pakaian warna netral (hitam, navy, abu), framing kepala sampai dada, mata sedikit di atas sepertiga frame.
Situs otomatis memberi sedikit efek grayscale + tone biru agar foto menyatu dengan palet; warna penuh muncul saat hover.

## Konten
Semua teks & data ada di `src/lib/content.ts`. Teks dalam `[kurung siku]` adalah placeholder
(tampil dengan garis putus-putus) — ganti dengan data asli.

## Form kontak
Isi `VITE_CONTACT_ENDPOINT` di `.env` (lihat `.env.example`) — misalnya Formspree atau API Express Anda sendiri.
Jika kosong, form membuka aplikasi email pengunjung dengan pesan yang sudah terisi.

## Deploy
SPA routing sudah disiapkan untuk Netlify (`public/_redirects`) dan Vercel (`vercel.json`).
