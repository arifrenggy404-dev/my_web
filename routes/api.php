<?php

use App\Http\Controllers\API\KontrolerProyek;
use Illuminate\Support\Facades\Route;

Route::get('/ping', function () {
    return response()->json([
        'status' => 'aktif',
        'pesan' => 'API Portofolio Cyberpunk siap',
    ]);
});

Route::get('/proyek', [KontrolerProyek::class, 'ambilSemua']);

Route::get('/ip', function (\Illuminate\Http\Request $request) {
    return response()->json([
        'ip' => $request->ip(),
    ]);
});

