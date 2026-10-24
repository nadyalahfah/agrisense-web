# AgriSense - Rice Disease Detection & Smart Farming Assistant

**AgriSense** adalah platform asisten pertanian cerdas berbasis web yang dirancang untuk membantu petani dan penyuluh mendeteksi penyakit daun padi, menghitung estimasi kerugian ekonomi, serta memberikan peringatan dini cuaca.

Proyek ini dikembangkan untuk berpartisipasi dalam **FunDev<> International Competition 2026**, dengan fokus mendukung **SDG 2: Zero Hunger** dan **SDG 12: Responsible Consumption and Production**.


## Live Demo

Kamu dapat mencoba aplikasi AgriSense melalui tautan berikut:

**https://agrisense-web-ten.vercel.app/**


## Fitur Utama
Aplikasi ini memiliki fitur menyeluruh (end-to-end) yang dirancang untuk kebutuhan petani modern:

### 1. Deteksi AI Instan
- Menggunakan model *Convolutional Neural Network* (MobileNetV2) yang dikonversi ke TensorFlow.js.
- Mendeteksi 10 jenis penyakit padi melalui foto daun.
- Gambar diproses langsung di browser pengguna tanpa dikirim ke server untuk proses inferensi.

### 2. Simulasi Dampak Ekonomi
- Menghitung estimasi potensi kerugian finansial dalam Rupiah akibat penyakit yang terdeteksi.
- Membantu petani mempertimbangkan tindakan penanganan berdasarkan estimasi dampak ekonomi.

### 3. Peringatan Dini Cuaca
- Terintegrasi dengan Open-Meteo API untuk memantau suhu, kelembapan, dan curah hujan berdasarkan lokasi pengguna.
- Memberikan peringatan ketika kondisi cuaca berpotensi meningkatkan risiko penyakit tanaman.

### 4. Jadwal Perawatan Otomatis
- Membuat pengingat perawatan tanaman setelah proses deteksi.
- Dilengkapi dengan Pengingat Harian (Web Notification) yang muncul jika ada tugas perawatan hari ini.

### 5. Peta Sebaran Penyakit (WebGIS)
- Menampilkan peta interaktif sebaran penyakit berdasarkan laporan pengguna.
- Dilengkapi fitur Ekspor Laporan (CSV) untuk memudahkan Dinas Pertanian/Penyuluh mengunduh data laporan lapangan.

### 6. Konsultasi Lanjutan (TANIA)
- Tombol pintas yang menghubungkan petani langsung ke layanan konsultasi TANIA (Penyuluh Digital Kementerian Pertanian) via WhatsApp dengan pesan otomatis berisi hasil deteksi.

### 7. Fitur Ramah Pengguna (Aksesibilitas)
- **Multi-Bahasa:** Mendukung Bahasa Indonesia dan Bahasa Inggris.
- **Dark Mode:** Tampilan gelap yang nyaman untuk mata.
- **Mode Darurat (Offline):** Panduan penanganan penyakit tetap bisa diakses meskipun tanpa koneksi internet.
- **Profil & UI Modern:** Desain antarmuka yang bersih, responsif, dan mudah digunakan oleh orang tua.


## Teknologi yang Digunakan

| Kategori | Teknologi |
|---|---|
| Frontend | React.js, Vite, Tailwind CSS |
| Machine Learning | TensorFlow.js, MobileNetV2 |
| Database | Supabase PostgreSQL |
| Authentication | Supabase Auth |
| Peta Interaktif | React-Leaflet, OpenStreetMap |
| API Cuaca | Open-Meteo API |
| Deployment | Vercel |


## Panduan Instalasi dan Menjalankan Proyek

Ikuti langkah-langkah berikut untuk menjalankan AgriSense di komputer lokal.

### 1. Clone Repositori

Pastikan Git sudah terinstal, kemudian jalankan perintah berikut di terminal:

```bash
git clone https://github.com/nadyalahfah/agrisense-web.git
cd agrisense-web
```

### 2. Install Dependensi

Pastikan Node.js sudah terinstal, lalu jalankan:

```bash
npm install
```

### 3. Setup Environment Variables

Buat file bernama `.env` di folder utama proyek, kemudian masukkan konfigurasi Supabase berikut:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Ganti nilai tersebut menggunakan URL proyek dan publishable/anon key yang sesuai dari dashboard Supabase. Jangan pernah memasukkan `service_role key` atau secret key ke dalam kode frontend.

### 4. Jalankan Aplikasi

Jalankan server pengembangan dengan perintah:

```bash
npm run dev
```

Buka alamat berikut di browser:

```text
http://localhost:5173
```

### 5. Update Proyek ke GitHub dan Vercel

Setelah melakukan perubahan pada kode, jalankan perintah berikut untuk mengunggah perubahan ke GitHub:

```bash
git add .
git commit -m "Update fitur AgriSense"
git push origin main
```

Jika repositori sudah terhubung dengan Vercel, push ke branch yang terhubung akan memicu proses deployment otomatis sesuai konfigurasi proyek.


## Tim Pengembang

Proyek ini dikembangkan oleh tim mahasiswa untuk **FunDev<> International Competition 2026**.

- **Nadya Lahfah** — Frontend Developer & UI/UX Designer
- **Elaine Keisha M. Pasaribu** — Machine Learning Engineer & Data Scientist


## Tujuan Proyek

AgriSense bertujuan membantu petani mengenali potensi penyakit tanaman padi lebih awal, memahami dampak ekonominya, serta memperoleh informasi cuaca dan panduan perawatan tanaman dalam satu platform.

Melalui pemanfaatan kecerdasan buatan dan teknologi web, AgriSense diharapkan dapat mendukung pertanian yang lebih produktif dan berkelanjutan.


## Sustainable Development Goals (SDGs)

- **SDG 2 — Zero Hunger:** Mendukung ketahanan pangan melalui pemantauan kesehatan tanaman padi.
- **SDG 12 — Responsible Consumption and Production:** Mendorong pengambilan keputusan perawatan tanaman yang lebih tepat dan penggunaan sumber daya secara bertanggung jawab.

---

© 2026 AgriSense. All Rights Reserved.
