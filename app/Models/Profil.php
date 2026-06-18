<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Profil extends Model
{
    use HasFactory;

    protected $table = 'profils';

    protected $fillable = [
        'nama_lengkap',
        'peran',
        'spesialisasi',
        'wilayah',
        'kutipan',
    ];
}
