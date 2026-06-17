# Rencana Implementasi: Portofolio Cyberpunk - Arsip Rahasia Sang Arsitek

> **Untuk pekerja agen:** SUB-SKILL YANG DIBUTUHKAN: Gunakan superpowers:subagent-driven-development (disarankan) atau superpowers:executing-plans untuk mengimplementasikan rencana ini tugas demi tugas. Langkah-langkah menggunakan sintaks kotak centang (`- [ ]`) untuk pelacakan.

**Goal:** Mengubah portofolio sederhana menjadi antarmuka imersif bertema "Arsip Rahasia" dalam Bahasa Indonesia, menonjolkan keahlian Laravel Arif Renggy.

**Architecture:** Menggunakan Laravel + Inertia.js + React. Navigasi berbasis folder rahasia dengan Layout tunggal yang membungkus seluruh halaman untuk mempertahankan status visual (scanlines, grid).

**Tech Stack:** Laravel 13, React 19, Inertia.js, Tailwind CSS 4, Framer Motion, Lucide React.

## Global Constraints

*   Bahasa: Seluruh teks antarmuka (UI) wajib menggunakan Bahasa Indonesia.
*   Tema: Estetika Cyberpunk (Neon, Scanlines, Grid, Glow).
*   Identitas: Arif Renggy sebagai "Arsitek Sistem" dan "Laravel Expert".
*   Skema URL: Menggunakan awalan path folder (e.g., `/identitas`, `/misi`).
*   HTTPS: Wajib aktif di produksi (sudah dikonfigurasi).

---

### Tugas 1: Scaffolding Layout Utama & Gaya Global

**Files:**
- Modify: `resources/css/app.css`
- Create: `resources/js/Layouts/ArsipLayout.jsx`
- Modify: `resources/js/app.jsx`

**Interfaces:**
- Produces: `ArsipLayout` sebagai pembungkus utama seluruh halaman.

- [ ] **Langkah 1: Perbarui gaya global untuk efek Cyberpunk**

```css
/* resources/css/app.css */
@layer base {
  body {
    @apply bg-[#0a0a0c] text-gray-100 font-mono;
    background-image: radial-gradient(circle at 50% 50%, #1a1a1c 0%, #0a0a0c 100%);
  }
}

@layer utilities {
  .text-neon-cyan { text-shadow: 0 0 5px #00f0ff, 0 0 10px #00f0ff; }
  .text-neon-pink { text-shadow: 0 0 5px #ff007f, 0 0 10px #ff007f; }
  .border-neon-cyan { box-shadow: 0 0 5px #00f0ff; border-color: #00f0ff; }
}
```

- [ ] **Langkah 2: Buat ArsipLayout dengan Sidebar Folder**

```jsx
// resources/js/Layouts/ArsipLayout.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import { Terminal, Cpu, Layers, ShieldAlert, Zap, MessageSquare } from 'lucide-react';

export default function ArsipLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#0a0a0c] text-gray-100 p-4 md:p-8 overflow-hidden relative">
            <div className="absolute inset-0 scanline pointer-events-none opacity-10 z-50"></div>
            
            <header className="max-w-7xl mx-auto border-b border-[#00f0ff]/30 pb-4 mb-8 flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-2 text-[#00f0ff] font-mono text-xs uppercase">
                        <Terminal size={14} /> <span>Sistem Aktif</span>
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter uppercase">ARIF RENGGY</h1>
                </div>
                <div className="text-right font-mono text-[10px] text-[#ff007f]">
                    STATUS: AKSES DIIZINKAN
                </div>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <nav className="space-y-2">
                    <div className="text-[#fee715] text-[10px] font-mono mb-4 uppercase tracking-widest opacity-50">Folder Arsip</div>
                    {[
                        { href: '/identitas', label: 'IDENTITAS', icon: Cpu },
                        { href: '/misi', label: 'MISI', icon: Layers },
                        { href: '/arsenal', label: 'ARSENAL', icon: Zap },
                        { href: '/jalur-komunikasi', label: 'KOMUNIKASI', icon: MessageSquare }
                    ].map((item) => (
                        <Link 
                            key={item.href}
                            href={item.href} 
                            className="flex items-center gap-3 p-3 border border-gray-800 hover:border-[#00f0ff] hover:bg-[#00f0ff]/5 transition-all group"
                        >
                            <item.icon size={16} className="group-hover:text-[#00f0ff]" />
                            <span className="font-mono text-xs tracking-widest">/{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <main className="md:col-span-3 border border-gray-800 p-6 relative bg-[#121214]/50">
                    {children}
                </main>
            </div>
        </div>
    );
}
```

- [ ] **Langkah 3: Jalankan npm build untuk verifikasi sintaks**

Run: `npm run build`
Expected: SUCCESS

- [ ] **Langkah 4: Commit**

```bash
git add .
git commit -m "feat: tambahkan scaffolding layout arsip cyberpunk"
```

---

### Tugas 2: Halaman Identitas & Rute Baru

**Files:**
- Create: `resources/js/Pages/Identitas.jsx`
- Modify: `routes/web.php`

- [ ] **Langkah 1: Buat halaman Identitas**

```jsx
// resources/js/Pages/Identitas.jsx
import React from 'react';
import ArsipLayout from '../Layouts/ArsipLayout';

export default function Identitas() {
    return (
        <ArsipLayout>
            <div className="space-y-6">
                <h2 className="text-[#ff007f] font-mono text-lg uppercase tracking-widest underline decoration-wavy">Arsip Identitas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
                    <div className="p-4 border border-gray-800 bg-black/40">
                        <div className="text-gray-500 mb-1">IDENTITAS_INTI</div>
                        <div className="text-white">Arif Renggy</div>
                    </div>
                    <div className="p-4 border border-gray-800 bg-black/40">
                        <div className="text-gray-500 mb-1">PERAN</div>
                        <div className="text-white">Fullstack Developer</div>
                    </div>
                    <div className="p-4 border border-gray-800 bg-black/40">
                        <div className="text-gray-500 mb-1">SPESIALISASI</div>
                        <div className="text-[#00f0ff]">Laravel Expert</div>
                    </div>
                    <div className="p-4 border border-gray-800 bg-black/40">
                        <div className="text-gray-500 mb-1">WILAYAH</div>
                        <div className="text-white">Indonesia</div>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-[#fee715] pl-4 italic">
                    "Arsitek Sistem yang berspesialisasi dalam membangun infrastruktur digital yang kokoh dan efisien menggunakan Laravel."
                </p>
            </div>
        </ArsipLayout>
    );
}
```

- [ ] **Langkah 2: Update rute di Laravel**

```php
// routes/web.php
use Inertia\Inertia;
use App\Models\Proyek;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/identitas');

Route::get('/identitas', function () {
    return Inertia::render('Identitas');
});

Route::get('/misi', function () {
    return Inertia::render('Misi', [
        'proyek' => Proyek::all(),
    ]);
});

Route::get('/arsenal', function () {
    return Inertia::render('Arsenal');
});

Route::get('/jalur-komunikasi', function () {
    return Inertia::render('Kontak');
});
```

- [ ] **Langkah 3: Commit**

```bash
git add .
git commit -m "feat: rute baru dan halaman identitas"
```

---

### Tugas 3: Halaman Misi (Portofolio Proyek)

**Files:**
- Create: `resources/js/Pages/Misi.jsx`

- [ ] **Langkah 1: Implementasikan halaman Misi dengan gaya Laporan Misi**

```jsx
// resources/js/Pages/Misi.jsx
import React from 'react';
import ArsipLayout from '../Layouts/ArsipLayout';
import { ExternalLink, ShieldAlert } from 'lucide-react';

export default function Misi({ proyek = [] }) {
    return (
        <ArsipLayout>
            <div className="space-y-6">
                <h2 className="text-[#ff007f] font-mono text-lg uppercase tracking-widest underline decoration-wavy">Laporan Misi</h2>
                <div className="grid grid-cols-1 gap-6">
                    {proyek.map((p) => (
                        <div key={p.id} className="border border-gray-800 p-4 relative group hover:border-[#00f0ff]/50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-[#00f0ff] uppercase">{p.nama_proyek}</h3>
                                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#fee715] text-[#fee715]">
                                    TERSELESAIKAN
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 mb-4">{p.deskripsi}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {(p.teknologi_utama || []).map(t => (
                                    <span key={t} className="text-[9px] bg-gray-900 px-2 py-0.5 text-gray-300 border border-gray-700">{t}</span>
                                ))}
                            </div>
                            <div className="flex gap-4">
                                {p.tautan_github ? (
                                    <a href={p.tautan_github} target="_blank" className="text-[10px] font-mono text-gray-500 hover:text-white uppercase">/KODE_SUMBER</a>
                                ) : (
                                    <span className="text-[10px] font-mono text-gray-700 uppercase flex items-center gap-1"><ShieldAlert size={10} /> /PRIVAT</span>
                                )}
                                {p.tautan_langsung && (
                                    <a href={p.tautan_langsung} target="_blank" className="text-[10px] font-mono text-[#00f0ff] hover:underline uppercase flex items-center gap-1">DEMO <ExternalLink size={10} /></a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ArsipLayout>
    );
}
```

- [ ] **Langkah 2: Commit**

```bash
git add resources/js/Pages/Misi.jsx
git commit -m "feat: halaman misi dengan format laporan misi"
```

---

### Tugas 4: Halaman Arsenal (Tech Stack)

**Files:**
- Create: `resources/js/Pages/Arsenal.jsx`

- [ ] **Langkah 1: Implementasikan halaman Arsenal dengan fokus Laravel**

```jsx
// resources/js/Pages/Arsenal.jsx
import React from 'react';
import ArsipLayout from '../Layouts/ArsipLayout';

export default function Arsenal() {
    const skills = [
        { name: 'Laravel', level: 95, color: '#ff007f', isCore: true },
        { name: 'React', level: 85, color: '#00f0ff' },
        { name: 'Tailwind CSS', level: 90, color: '#00f0ff' },
        { name: 'Docker', level: 75, color: '#fee715' },
        { name: 'SQLite', level: 80, color: '#fee715' }
    ];

    return (
        <ArsipLayout>
            <div className="space-y-8">
                <h2 className="text-[#ff007f] font-mono text-lg uppercase tracking-widest underline decoration-wavy">Pusat Teknologi</h2>
                <div className="space-y-6">
                    {skills.map(s => (
                        <div key={s.name} className={s.isCore ? "p-4 border border-[#ff007f]/30 bg-[#ff007f]/5" : ""}>
                            <div className="flex justify-between items-end mb-2">
                                <span className={`font-mono text-sm ${s.isCore ? 'text-[#ff007f] font-black text-lg' : 'text-gray-300'}`}>
                                    {s.name} {s.isCore ? ' (CORE)' : ''}
                                </span>
                                <span className="font-mono text-[10px] text-gray-500">{s.level}% ENERGI</span>
                            </div>
                            <div className="w-full h-1 bg-gray-900 overflow-hidden">
                                <div 
                                    className="h-full transition-all duration-1000" 
                                    style={{ width: `${s.level}%`, backgroundColor: s.color, boxShadow: `0 0 10px ${s.color}` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ArsipLayout>
    );
}
```

- [ ] **Langkah 2: Commit**

```bash
git add resources/js/Pages/Arsenal.jsx
git commit -m "feat: halaman arsenal visualisasi keahlian"
```

---

### Tugas 5: Halaman Komunikasi & Cleanup

**Files:**
- Create: `resources/js/Pages/Kontak.jsx`
- Modify: `resources/js/Pages/Portofolio.jsx` (Dihapus atau dikosongkan)

- [ ] **Langkah 1: Implementasikan halaman Kontak**

```jsx
// resources/js/Pages/Kontak.jsx
import React from 'react';
import ArsipLayout from '../Layouts/ArsipLayout';
import { Github, Linkedin, MessageSquare } from 'lucide-react';

export default function Kontak() {
    return (
        <ArsipLayout>
            <div className="space-y-8">
                <h2 className="text-[#ff007f] font-mono text-lg uppercase tracking-widest underline decoration-wavy">Saluran Terenkripsi</h2>
                <div className="grid grid-cols-1 gap-4">
                    {[
                        { name: 'GitHub', icon: Github, url: 'https://github.com/arifrenggy00', label: 'arifrenggy00' },
                        { name: 'LinkedIn', icon: Linkedin, url: '#', label: 'Arif Renggy' },
                        { name: 'WhatsApp', icon: MessageSquare, url: '#', label: '+62-ARCH-SYS' }
                    ].map(link => (
                        <a 
                            key={link.name}
                            href={link.url} 
                            target="_blank"
                            className="flex items-center justify-between p-4 border border-gray-800 hover:border-[#00f0ff] hover:bg-[#00f0ff]/5 group transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <link.icon size={20} className="text-gray-500 group-hover:text-[#00f0ff]" />
                                <span className="font-mono text-sm uppercase">{link.name}</span>
                            </div>
                            <span className="text-xs text-gray-600 font-mono tracking-tighter">{link.label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </ArsipLayout>
    );
}
```

- [ ] **Langkah 2: Verifikasi akhir secara lokal**

Run: `php artisan route:list`
Expected: Daftar rute `/identitas`, `/misi`, `/arsenal`, `/jalur-komunikasi` terdaftar.

- [ ] **Langkah 3: Commit & Push**

```bash
git add .
git commit -m "feat: halaman kontak dan penyelesaian akhir"
git push origin master
```
