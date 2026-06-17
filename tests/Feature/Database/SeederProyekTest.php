<?php

namespace Tests\Feature\Database;

use Database\Seeders\SeederProyek;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class SeederProyekTest extends TestCase
{
    use RefreshDatabase;

    public function test_tabel_proyek_memiliki_kolom_yang_sesuai(): void
    {
        $this->assertTrue(Schema::hasTable('proyek'));
        
        $this->assertTrue(Schema::hasColumns('proyek', [
            'id',
            'nama_proyek',
            'tautan_slug',
            'deskripsi',
            'teknologi_utama',
            'tautan_langsung',
            'tautan_github',
            'jalur_gambar',
            'created_at',
            'updated_at'
        ]));
    }

    public function test_seeder_proyek_berhasil_mengisi_data(): void
    {
        $this->seed(SeederProyek::class);

        $this->assertDatabaseCount('proyek', 2);

        $this->assertDatabaseHas('proyek', [
            'nama_proyek' => 'Sistem Informasi Keamanan Neo-Tokyo',
            'tautan_slug' => 'sistem-informasi-keamanan-neo-tokyo',
            'tautan_langsung' => 'https://neo-tokyo-demo.example.com',
            'tautan_github' => 'https://github.com/arifrenggy00/neo-tokyo-security',
            'jalur_gambar' => 'gambar/neo-tokyo.jpg',
        ]);

        $this->assertDatabaseHas('proyek', [
            'nama_proyek' => 'Otomatisasi Grid Daya Distrik 7',
            'tautan_slug' => 'otomatisasi-grid-daya-distrik-7',
            'tautan_langsung' => null,
            'tautan_github' => 'https://github.com/arifrenggy00/district7-grid',
            'jalur_gambar' => 'gambar/distrik7.jpg',
        ]);
    }
}
