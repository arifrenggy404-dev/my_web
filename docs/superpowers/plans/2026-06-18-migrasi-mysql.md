# Migrasi Database MySQL Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mengalihkan database aplikasi dari SQLite ke MySQL lokal untuk meningkatkan skalabilitas dan fungsionalitas.

**Architecture:** Update variabel lingkungan di `.env` dan jalankan migrasi database Laravel ke server MySQL lokal yang berjalan di Termux.

**Tech Stack:** Laravel, MySQL, PHP PDO_MYSQL.

---

### Task 1: Persiapan dan Verifikasi Lingkungan

**Files:**
- Modify: `.env`

- [ ] **Step 1: Backup file .env saat ini**

Run: `cp .env .env.bak`

- [ ] **Step 2: Cek ketersediaan ekstensi pdo_mysql**

Run: `php -m | grep pdo_mysql`
Expected: Output `pdo_mysql` muncul. Jika tidak, instruksikan user untuk install (misal: `pkg install php-mysql` di Termux).

- [ ] **Step 3: Update konfigurasi database di .env**

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=my_web
DB_USERNAME=root
DB_PASSWORD=
```

- [ ] **Step 4: Commit perubahan konfigurasi (jika file .env dilacak, biasanya tidak)**

Run: `git status` (Lewati jika .env ada di .gitignore)

---

### Task 2: Eksekusi Migrasi Database

**Files:**
- Create: Database di MySQL (via CLI)

- [ ] **Step 1: Buat database 'my_web' jika belum ada**

Run: `mysql -u root -e "CREATE DATABASE IF NOT EXISTS my_web;"`
Expected: Perintah berhasil tanpa error.

- [ ] **Step 2: Jalankan migrasi dan seeding secara fresh dan forced**

Run: `php artisan migrate:fresh --seed --force`
Expected: Output menampilkan tabel-tabel yang berhasil dibuat dan seeder yang dijalankan.

- [ ] **Step 3: Verifikasi tabel di MySQL**

Run: `mysql -u root -e "USE my_web; SHOW TABLES;"`
Expected: List tabel seperti `users`, `proyeks`, `migrations`, dll muncul.

---

### Task 3: Verifikasi Aplikasi

**Files:**
- Test: `tests/Feature/Database/SeederProyekTest.php`

- [ ] **Step 1: Jalankan test database yang ada**

Run: `php artisan test tests/Feature/Database/SeederProyekTest.php`
Expected: PASS (menggunakan koneksi MySQL sekarang).

- [ ] **Step 2: Cek status database via artisan**

Run: `php artisan db:show`
Expected: Menampilkan informasi koneksi MySQL dan jumlah baris data.
