# Spesifikasi Desain Integrasi Perintah Dasar Linux

Dokumen ini mendokumentasikan spesifikasi desain untuk menambahkan sistem file virtual dan perintah navigasi Linux standar (`ls`, `cd`, `cat`, `pwd`) ke dalam CLI interaktif portofolio.

## 1. Arsitektur & Struktur Direktori Virtual

Sistem file virtual didefinisikan sebagai struktur data objek JavaScript statis di sisi klien. Hal ini menjamin performa respons terminal instan tanpa beban request ke server.

### 1.1 Model Data File System

Setiap entri dalam sistem file virtual didefinisikan dengan struktur berikut:
- **`type`**: `'dir'` (direktori) atau `'file'` (file teks).
- **`children`**: Array yang berisi nama-nama file/folder di bawahnya (hanya untuk `type: 'dir'`).
- **`content`**: Array baris teks isi file (hanya untuk `type: 'file'`).
- **`route`**: Rute URL internal portfolio (Inertia.js) yang terhubung jika direktori diakses (opsional).

```javascript
const virtualFileSystem = {
    '/': {
        type: 'dir',
        children: ['home']
    },
    '/home': {
        type: 'dir',
        children: ['visitor']
    },
    '/home/visitor': {
        type: 'dir',
        children: ['identitas', 'misi', 'arsenal', 'komunikasi', 'readme.txt']
    },
    '/home/visitor/readme.txt': {
        type: 'file',
        content: [
            '========================================',
            'SELAMAT DATANG DI TERMINAL ARIF RENGGY',
            '========================================',
            'Gunakan perintah Linux standar untuk navigasi:',
            '  ls      - Melihat isi folder',
            '  cd      - Berpindah folder',
            '  cat     - Membaca isi file teks',
            '  pwd     - Melihat lokasi folder aktif saat ini',
            ''
        ]
    },
    '/home/visitor/identitas': {
        type: 'dir',
        children: ['profil.txt'],
        route: '/identitas'
    },
    '/home/visitor/identitas/profil.txt': {
        type: 'file',
        content: [
            '--- PROFIL IDENTITAS INTI ---',
            'NAMA: Arif Renggy',
            'PERAN: Fullstack Developer',
            'WILAYAH: Indonesia',
            'BIO: Arsitek Sistem yang berspesialisasi dalam',
            '     membangun infrastruktur digital menggunakan Laravel.',
            ''
        ]
    },
    '/home/visitor/misi': {
        type: 'dir',
        children: ['status.txt'],
        route: '/misi'
    },
    '/home/visitor/misi/status.txt': {
        type: 'file',
        content: [
            '--- STATUS MISI DIGITAL ---',
            'SEMUA PROYEK: BERHASIL DISELESAIKAN',
            'Ketik "projects" atau "misi" untuk mengambil data misi dari database.',
            ''
        ]
    },
    '/home/visitor/arsenal': {
        type: 'dir',
        children: ['alutsista.txt'],
        route: '/arsenal'
    },
    '/home/visitor/arsenal/alutsista.txt': {
        type: 'file',
        content: [
            '--- DAFTAR ALUTSISTA / KEAHLIAN ---',
            '  Laravel      - 95%',
            '  React        - 85%',
            '  Tailwind CSS - 90%',
            '  Inertia.js   - 88%',
            '  SQLite       - 80%',
            '  Docker       - 75%',
            ''
        ]
    },
    '/home/visitor/komunikasi': {
        type: 'dir',
        children: ['jalur.txt'],
        route: '/jalur-komunikasi'
    },
    '/home/visitor/komunikasi/jalur.txt': {
        type: 'file',
        content: [
            '--- SALURAN KOMUNIKASI TERENKRIPSI ---',
            '  GitHub: https://github.com/arifrenggy00',
            '  Email: arifrenggy404@gmail.com',
            '  LinkedIn: Arif Renggy',
            ''
        ]
    }
};
```

---

## 2. Definisi Perilaku Perintah & Navigasi

### 2.1 State Tambahan pada Component CLI
Kita akan menambahkan satu state React baru di dalam `InteractiveCli.jsx`:
```javascript
const [currentPath, setCurrentPath] = useState('/home/visitor');
```

### 2.2 Prompt Tampilan Dinamis
Prompt input CLI akan dirender secara dinamis untuk menampilkan lokasi aktif saat ini:
- Jika path saat ini diawali dengan `/home/visitor`, ganti prefiks tersebut dengan karakter tilde `~` agar sesuai dengan kebiasaan Linux standar (contoh: `~/identitas`).
- Skema render: ``visitor@arif-renggy:${currentPath.replace(/^\/home\/visitor/, '~')}$``

### 2.3 Resolusi Path & Parsing Perintah `cd`
Fungsi resolusi path untuk mendeteksi target folder baru mendukung:
1. **Path Absolut**: Diawali dengan `/` (misal: `/home/visitor/misi`).
2. **Path Relatif**: Relatif terhadap `currentPath` (misal: `identitas` saat berada di `/home/visitor`).
3. **Navigasi Kembali (`..`)**: Memotong bagian terakhir direktori.
4. **Navigasi Direktori Saat Ini (`.`)**: Tidak melakukan perubahan path.

Alur eksekusi `cd [target]`:
- Mengurai parameter target dan menghitung path absolut tujuan.
- Memeriksa apakah path tujuan terdaftar di `virtualFileSystem`.
- Jika ada dan tipenya `'dir'`, update state `currentPath`.
  - Jika direktori tujuan memiliki properti `route` (misal: `/home/visitor/misi` -> `/misi`), picu transisi halaman website menggunakan `router.visit(route)`.
- Jika ada tetapi bertipe `'file'`, kembalikan log kesalahan: `bash: cd: [target]: Not a directory`.
- Jika tidak ada, kembalikan log kesalahan: `bash: cd: [target]: No such file or directory`.

### 2.4 Perintah `ls`
Alur eksekusi `ls`:
- Ambil daftar item dari `virtualFileSystem[currentPath].children`.
- Tampilkan isi dengan format:
  - Direktori ditambahkan akhiran `/` (contoh: `identitas/`).
  - File teks ditampilkan biasa (contoh: `readme.txt`).

### 2.5 Perintah `cat [nama_file]`
Alur eksekusi `cat`:
- Memeriksa apakah parameter nama file diberikan. Jika tidak, cetak baris kosong.
- Periksa apakah file tersebut ada di dalam daftar `children` direktori aktif.
- Jika ada dan bertipe `'file'`, ambil konten teks dari `content` sistem file virtual dan cetak baris demi baris.
- Jika ada tetapi bertipe `'dir'`, tampilkan log: `cat: [target]: Is a directory`.
- Jika tidak ada, tampilkan log: `cat: [target]: No such file or directory`.

### 2.6 Perintah `pwd`
Alur eksekusi `pwd`:
- Cetak isi state `currentPath` saat ini.

---

## 3. Integrasi & Perubahan CLI Help
Teks output perintah `help` akan ditambahkan baris berikut:
```text
  ls                    - List directory contents
  cd [dir]              - Change active directory (syncs page)
  cat [file]            - Display file contents
  pwd                   - Print working directory path
```

---

## 4. Rencana Pengujian (Testing Plan)
Setelah implementasi selesai, pengujian akan dilakukan terhadap:
1. **Perpindahan Path**: Memastikan `cd ..`, `cd /`, `cd /home/visitor/identitas`, `cd identitas` mengarah ke folder yang tepat.
2. **Sinkronisasi Website**: Memverifikasi navigasi Inertia terjadi di latar belakang ketika pengguna `cd` masuk ke folder yang memiliki properti `route`.
3. **Pembacaan File**: Menggunakan `cat` pada file yang ada, folder, dan file fiktif.
4. **Verifikasi Build**: Memastikan kompilasi frontend (`npm run build`) dan test PHP backend (`vendor/bin/phpunit`) tetap berjalan 100% lancar.
