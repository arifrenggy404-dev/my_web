<?php

namespace Tests\Feature\Filament;

use App\Models\User;
use App\Models\Keahlian;
use App\Models\Profil;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KeahlianAndProfilResourceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Seed initial data
        $this->seed();
    }

    public function test_tamu_diarahkan_dari_indeks_keahlian()
    {
        $response = $this->get('/admin/keahlians');

        $response->assertRedirect('/admin/login');
    }

    public function test_tamu_diarahkan_dari_indeks_profil()
    {
        $response = $this->get('/admin/profils');

        $response->assertRedirect('/admin/login');
    }

    public function test_pengguna_terautentikasi_dapat_mengakses_indeks_keahlian()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/admin/keahlians');

        $response->assertSuccessful();
    }

    public function test_pengguna_terautentikasi_dapat_mengakses_indeks_profil()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/admin/profils');

        $response->assertSuccessful();
    }

    public function test_kebijakan_profil_membatasi_pembuatan_dan_penghapusan()
    {
        $user = User::factory()->create();
        $profil = Profil::first();

        // Cek policy viewAny & update (harus true)
        $this->assertTrue($user->can('viewAny', Profil::class));
        $this->assertTrue($user->can('update', $profil));

        // Cek policy create & delete (harus false)
        $this->assertFalse($user->can('create', Profil::class));
        $this->assertFalse($user->can('delete', $profil));
    }
}
