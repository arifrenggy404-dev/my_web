# Design Spec: Immersive Terminal OS Theme

## 1. Pendahuluan
Dokumen ini merinci transformasi visual Portofolio Cyberpunk menjadi sebuah tema "Immersive Terminal OS" yang berfokus pada estetika hacker dan coding.

## 2. Tujuan
- Menciptakan pengalaman pengguna yang terasa seperti menggunakan terminal sistem operasi modern.
- Menggunakan palet warna "Terminal Modern" (Cyan dan Putih di atas Hitam).
- Mengintegrasikan elemen interaktif seperti Command Line Navigation dan Typing Animations.

## 3. Detail Arsitektur & Estetika
### Palet Warna (Tailwind CSS 4)
- **Background:** `#050505` (Hitam pekat)
- **Primary:** `#00f0ff` (Cyan - untuk teks aktif, border, dan aksen)
- **Secondary:** `#ffffff` (Putih - untuk konten teks utama)
- **Muted:** `#1a1a1a` (Abu-abu sangat gelap - untuk border non-aktif)

### Komponen UI Utama
1. **ASCII Header:** Mengganti header teks biasa dengan seni ASCII statis untuk nama "ARIF RENGGY".
2. **Command Line Navigation:** Navigasi samping diubah menjadi daftar perintah terminal (misal: `> /home/identitas`).
3. **System Logs Component:** Sebuah sidebar atau footer widget yang menampilkan log sistem palsu (random strings) yang terus bergulir.
4. **Typing Animation:** Konten halaman akan muncul dengan efek "typing" menggunakan Framer Motion atau utility sederhana.
5. **Scanline & Flicker:** Mempertahankan efek scanline namun dengan intensitas yang lebih halus.

## 4. Alur Kerja Implementasi
1. Update `resources/css/app.css` dengan variabel warna baru dan utility "typing".
2. Refactor `ArsipLayout.jsx` untuk menyertakan ASCII header, system logs, dan gaya navigasi baru.
3. Update halaman-halaman utama (`Identitas.jsx`, `Misi.jsx`, dll.) untuk mendukung animasi typing.

## 5. Rencana Pengujian
- Verifikasi keterbacaan teks (Cyan vs Putih).
- Memastikan navigasi tetap fungsional dengan gaya baru.
- Memastikan animasi tidak mengganggu performa halaman.
