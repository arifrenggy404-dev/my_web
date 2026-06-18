<?php

use Inertia\Inertia;
use App\Models\Proyek;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/identitas');

Route::get('/identitas', function () {
    return Inertia::render('Identitas', [
        'profil' => \App\Models\Profil::first(),
    ]);
});

Route::get('/misi', function () {
    return Inertia::render('Misi', [
        'proyek' => Proyek::all(),
    ]);
});

Route::get('/arsenal', function () {
    return Inertia::render('Arsenal', [
        'skills' => \App\Models\Keahlian::all(),
    ]);
});

Route::get('/jalur-komunikasi', function () {
    return Inertia::render('Kontak');
});
