<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeederProyek extends Seeder
{
    public function run(): void
    {
        DB::table('proyek')->truncate();

        DB::table('proyek')->insert([
            [
                'nama_proyek' => 'Sistem Informasi Keamanan Neo-Tokyo',
                'tautan_slug' => 'sistem-informasi-keamanan-neo-tokyo',
                'deskripsi' => 'Website pemantauan keamanan kota berbasis Cyberpunk dengan visual HUD real-time.',
                'teknologi_utama' => json_encode(['Laravel 13', 'React', 'Framer Motion', 'Tailwind CSS']),
                'tautan_langsung' => 'https://neo-tokyo-demo.example.com',
                'tautan_github' => 'https://github.com/arifrenggy00/neo-tokyo-security',
                'jalur_gambar' => 'gambar/neo-tokyo.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_proyek' => 'Otomatisasi Grid Daya Distrik 7',
                'tautan_slug' => 'otomatisasi-grid-daya-distrik-7',
                'deskripsi' => 'Dashboard analitik interaktif untuk mengontrol grid energi nuklir distrik urban.',
                'teknologi_utama' => json_encode(['Laravel 13', 'Alpine.js', 'Chart.js', 'SQLite']),
                'tautan_langsung' => null,
                'tautan_github' => 'https://github.com/arifrenggy00/district7-grid',
                'jalur_gambar' => 'gambar/distrik7.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
