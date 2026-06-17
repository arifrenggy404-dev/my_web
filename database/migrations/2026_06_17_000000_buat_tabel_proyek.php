<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('proyek', function (Blueprint $table) {
            $table->id();
            $table->string('nama_proyek');
            $table->string('tautan_slug')->unique();
            $table->text('deskripsi');
            $table->json('teknologi_utama');
            $table->string('tautan_langsung')->nullable();
            $table->string('tautan_github')->nullable();
            $table->string('jalur_gambar')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('proyek');
    }
};
