/**
 * Indonesian version of the language-dependent content in content.ts.
 * Only text is listed here; ids, links, stacks and dates come from the English
 * source. Anything without a translation falls back to English.
 */
import { content, type Content, type Insight, type Project } from "./content";

const { profile, nav, services, projects, experience, insights } = content;

const byKey = <T, K extends keyof T>(base: T[], key: K, tr: Record<string, Partial<T>>) =>
  base.map((item) => ({ ...item, ...tr[String(item[key])] }));
const byIndex = <T,>(base: T[], tr: Partial<T>[]) => base.map((item, i) => ({ ...item, ...tr[i] }));

export const contentId: Content = {
  profile: {
    ...profile,
    headline: "Fullstack Developer & Software Engineer",
    aboutHeadline: "Membangun sistem yang memberi dampak nyata.",
    aboutBody:
      "Dari platform perbankan hingga produk startup, saya senang mengubah aturan bisnis yang rumit menjadi perangkat lunak yang jelas bagi pengguna dan mudah dirawat oleh tim yang membangunnya.",
    summary:
      "Saya Ignaway, seorang Fullstack Developer yang berfokus membangun aplikasi yang skalabel, API yang andal, dan pengalaman pengguna yang dirancang dengan matang.",
    availability: "Terbuka untuk peluang menarik",
    photo: { ...profile.photo, alt: "Foto Ignatius Andri" },
    aboutPhoto: { ...profile.aboutPhoto, alt: "Ignatius Andri mengenakan kemeja flanel dan bucket hat" },
  },

  nav: byKey(nav, "id", {
    top: { label: "Beranda" },
    about: { label: "Tentang" },
    projects: { label: "Proyek" },
    insights: { label: "Blog" },
    contact: { label: "Kontak" },
  }),

  services: byKey(services, "icon", {
    layout: { title: "Pengembangan Frontend", body: "Membangun antarmuka yang responsif dan aksesibel dengan React, Next.js, dan Angular." },
    server: { title: "Backend & API", body: "Merancang REST API dan layanan yang andal dengan Node.js dan Express." },
    database: { title: "Desain Basis Data", body: "Memodelkan data dan menulis query yang tetap cepat seiring data bertambah." },
    puzzle: { title: "Pemecahan Masalah", body: "Memahami kebutuhan bisnis terlebih dahulu, lalu mencari solusi sederhana untuk masalah yang kompleks." },
  }),

  projects: byKey<Project, "id">(projects, "id", {
    banking: {
      name: "Sistem Perbankan Enterprise",
      category: "Enterprise / Layanan keuangan",
      summary: "Aplikasi web internal yang mendukung alur kerja perbankan bertahap untuk tim operasional.",
      role: "[Peran Anda, mis. Software Engineer, integrasi frontend dan API]",
      note: "Kode enterprise, repositori bersifat privat.",
    },
    finance: {
      name: "Aplikasi Keuangan Pribadi",
      category: "Produk / Fintech",
      summary: "Penganggaran, pencatatan pengeluaran, dan ringkasan arus kas untuk individu.",
      role: "Fullstack, dari desain hingga deployment",
    },
    pos: {
      name: "Sistem POS / Manajemen",
      category: "Arsitektur frontend",
      summary: "Antarmuka point-of-sale dan manajemen back-office dengan alur inventaris dan penjualan.",
      role: "Frontend developer, arsitektur UI dan state management",
    },
  }),

  experience: byIndex(experience, [
    {
      sector: "Perbankan",
      period: "Okt 2024 – Sekarang",
      responsibilities: [
        "Mengembangkan antarmuka nasabah dan admin menggunakan React dan Flowable Work.",
        "Mengintegrasikan frontend, backend, dan API eksternal, serta memelihara dokumentasi teknis yang mencakup API, struktur basis data, dan panduan pengembangan.",
        "Bekerja sama dengan business analyst untuk menerjemahkan kebutuhan bisnis menjadi perilaku sistem.",
      ],
      impact: "Menyelesaikan integrasi frontend-backend dan API eksternal untuk alur pinjaman end-to-end.",
    },
    {
      sector: "Perbankan",
      period: "Jun 2022 – Okt 2024",
      responsibilities: [
        "Mengembangkan dan memelihara fitur React dan Angular untuk Kopra, dengan fokus pada kebutuhan bisnis, kegunaan, stabilitas, dan performa.",
        "Berkolaborasi dengan tim backend dan QA dalam integrasi, pengujian, deployment, perbaikan bug, clean code, design pattern, dan optimasi performa.",
      ],
      impact: "Meningkatkan implementasi frontend yang ada melalui optimasi performa, clean code, dan design pattern.",
    },
    {
      sector: "Startup",
      period: "Jan 2021 – Des 2021",
      responsibilities: [
        "Merancang dan memelihara aplikasi web menggunakan Next.js, Node.js, dan MongoDB, termasuk fitur responsif yang dikembangkan bersama product owner.",
        "Membangun RESTful API dan integrasi pihak ketiga, sekaligus meningkatkan performa aplikasi melalui optimasi kode dan implementasi webpack.",
      ],
      impact: "Meningkatkan performa aplikasi melalui optimasi kode dan konfigurasi webpack.",
    },
    {
      sector: "Aplikasi enterprise",
      period: "Feb 2018 – Jan 2021",
      responsibilities: [
        "Mengembangkan antarmuka web yang responsif dan mendukung integrasi frontend-backend untuk fitur produk.",
        "Menemukan dan memperbaiki bug pada aplikasi ASP.NET serta berkontribusi dalam pengembangan menggunakan SQL.",
      ],
      impact: "Merilis fitur web responsif dan menghubungkannya dengan fungsionalitas backend.",
    },
  ]),

  insights: byKey<Insight, "slug">(insights, "slug", {
    "table-scan-vs-index-seek": {
      dek: "Membaca execution plan untuk memahami mengapa query yang sama bisa memakan waktu 4 ms atau 4 detik.",
      topic: "Basis Data",
    },
    "why-queries-get-slow": {
      title: "Mengapa query basis data menjadi lambat",
      dek: "Index yang hilang, predikat non-sargable, parameter sniffing, dan penyebab umum lainnya.",
      topic: "Basis Data",
    },
    "better-rest-apis": {
      title: "Merancang REST API yang lebih baik",
      dek: "Penamaan resource, format error, pagination, dan keputusan kecil yang tetap relevan seiring waktu.",
      topic: "Desain API",
    },
    "frontend-state": {
      title: "Di mana sebaiknya state disimpan?",
      dek: "Server state, UI state, dan URL state, serta mengapa mencampurnya menjadi sumber sebagian besar bug frontend.",
    },
    "clean-architecture": {
      title: "Clean architecture tanpa seremoni",
      dek: "Menjaga aturan bisnis tetap independen dari framework, secara pragmatis.",
      topic: "Arsitektur",
    },
    "fullstack-performance": {
      title: "Masalah performa fullstack yang umum",
      dek: "N+1 query, waterfall request, payload berlebihan, dan re-render beruntun.",
      topic: "Performa",
    },
    "maintainable-react": {
      title: "Membangun aplikasi React yang mudah dirawat",
      dek: "Batasan yang jelas, colocation, dan komponen yang mudah dihapus.",
    },
  }),
};
