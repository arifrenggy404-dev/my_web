<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Keahlian extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'level',
        'deskripsi',
        'warna',
        'apakah_core',
    ];

    protected $casts = [
        'apakah_core' => 'boolean',
        'level' => 'integer',
    ];
}
