# Design Spec: Migrasi Database SQLite ke MySQL

## 1. Pendahuluan
Dokumen ini merancang migrasi database untuk proyek Portofolio Cyberpunk dari SQLite (local file) ke MySQL (server local).

## 2. Tujuan
- Mengalihkan sistem penyimpanan data ke MySQL untuk skalabilitas dan fitur yang lebih kaya.
- Mengotomatiskan proses update konfigurasi environment.
- Melakukan migrasi struktur tabel ke database baru secara "forced".

## 3. Detail Arsitektur
### Konfigurasi `.env`
Perubahan pada variabel lingkungan:
- `DB_CONNECTION=mysql`
- `DB_HOST=127.0.0.1`
- `DB_PORT=3306`
- `DB_DATABASE=my_web`
- `DB_USERNAME=root`
- `DB_PASSWORD=` (kosong atau sesuai input user)

### Alur Kerja
1. Backup/Cek file `.env` saat ini.
2. Update variabel `DB_*` di `.env`.
3. Verifikasi ketersediaan ekstensi `pdo_mysql`.
4. Jalankan perintah `php artisan migrate:fresh --force` untuk membuat skema database baru di MySQL.
5. (Opsional) Jalankan seeder jika diperlukan untuk mengisi data awal.

## 4. Keamanan & Validasi
- Memastikan server MySQL sudah berjalan sebelum migrasi.
- Menggunakan `--force` karena ini adalah lingkungan pengembangan yang ingin di-reset (sesuai permintaan user "force aja").

## 5. Rencana Pengujian
- Verifikasi koneksi database dengan perintah `php artisan db:show` atau mencoba login ke aplikasi.
- Memastikan tabel `proyeks` dan `users` tercipta di MySQL.
