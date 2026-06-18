<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Pastikan ada user admin
        if (\App\Models\User::count() === 0) {
            \App\Models\User::create([
                'name' => 'Arif Renggy',
                'email' => 'admin@arifrenggy.site',
                'password' => \Illuminate\Support\Facades\Hash::make('password123'),
            ]);
        }

        // Seed proyek
        $this->call([
            SeederProyek::class,
        ]);

        // Seed Keahlian
        \App\Models\Keahlian::create([
            'nama' => 'Laravel', 
            'level' => 95, 
            'warna' => 'accent', 
            'apakah_core' => true, 
            'deskripsi' => 'Mesin utama untuk backend berkinerja tinggi.'
        ]);
        \App\Models\Keahlian::create([
            'nama' => 'React', 
            'level' => 85, 
            'warna' => 'primary', 
            'apakah_core' => false, 
            'deskripsi' => 'Antarmuka reaktif dan dinamis.'
        ]);
        \App\Models\Keahlian::create([
            'nama' => 'Tailwind CSS', 
            'level' => 90, 
            'warna' => 'primary', 
            'apakah_core' => false, 
            'deskripsi' => 'Sistem desain utilitas atomik.'
        ]);
        \App\Models\Keahlian::create([
            'nama' => 'Docker', 
            'level' => 75, 
            'warna' => 'warning', 
            'apakah_core' => false, 
            'deskripsi' => 'Kontainerisasi infrastruktur.'
        ]);
        \App\Models\Keahlian::create([
            'nama' => 'SQLite', 
            'level' => 80, 
            'warna' => 'warning', 
            'apakah_core' => false, 
            'deskripsi' => 'Penyimpanan data lokal yang persisten.'
        ]);
        \App\Models\Keahlian::create([
            'nama' => 'Inertia.js', 
            'level' => 88, 
            'warna' => 'primary', 
            'apakah_core' => false, 
            'deskripsi' => 'Penghubung mulus antara Laravel dan React.'
        ]);

        // Seed Profil
        \App\Models\Profil::create([
            'nama_lengkap' => 'Arif Renggy',
            'peran' => 'Fullstack Developer',
            'spesialisasi' => 'Laravel Expert',
            'wilayah' => 'Indonesia',
            'kutipan' => 'Arsitek Sistem yang berspesialisasi dalam membangun infrastruktur digital yang kokoh dan efisien menggunakan Laravel.',
        ]);
    }
}
