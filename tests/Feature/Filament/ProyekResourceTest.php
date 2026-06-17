<?php

namespace Tests\Feature\Filament;

use App\Models\User;
use App\Models\Proyek;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProyekResourceTest extends TestCase
{
    use RefreshDatabase;

    public function test_tamu_diarahkan_dari_dasbor_admin()
    {
        $response = $this->get('/admin');

        $response->assertRedirect('/admin/login');
    }

    public function test_tamu_diarahkan_dari_indeks_proyek()
    {
        $response = $this->get('/admin/proyeks');

        $response->assertRedirect('/admin/login');
    }

    public function test_pengguna_terautentikasi_dapat_mengakses_dasbor_admin()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/admin');

        $response->assertSuccessful();
    }

    public function test_pengguna_terautentikasi_dapat_mengakses_indeks_proyek()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/admin/proyeks');

        $response->assertSuccessful();
    }

    public function test_akses_panel_berdasarkan_domain_email()
    {
        // Verifies an uppercase email (e.g., USER@CYBERPUNK.IO) can access the panel.
        $userUppercase = User::factory()->create(['email' => 'USER@CYBERPUNK.IO']);
        $this->actingAs($userUppercase)->get('/admin')->assertSuccessful();

        // Temporarily mock environment to production
        $this->app->detectEnvironment(fn() => 'production');

        // Verifies that a non-@cyberpunk.io email cannot access the panel
        $userGmail = User::factory()->create(['email' => 'user@gmail.com']);
        $this->actingAs($userGmail)->get('/admin')->assertForbidden();

        // Verifies that a valid lowercase @cyberpunk.io email can access the panel
        $userLowercase = User::factory()->create(['email' => 'user@cyberpunk.io']);
        $this->actingAs($userLowercase)->get('/admin')->assertSuccessful();

        // Verifies that a valid uppercase @cyberpunk.io email can access the panel
        $userUppercaseProd = User::factory()->create(['email' => 'ANOTHER@CYBERPUNK.IO']);
        $this->actingAs($userUppercaseProd)->get('/admin')->assertSuccessful();
    }
}
