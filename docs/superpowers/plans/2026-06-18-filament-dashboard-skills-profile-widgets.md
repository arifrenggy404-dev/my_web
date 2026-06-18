# Filament Dashboard Widgets, Skills, & Profile Management Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create dynamic skills (Arsenal) and profile (Identitas) page management using SQLite backend and Filament resources, and implement analytical monitoring widgets on the Filament dashboard.

**Architecture:**
- Define two new Eloquent models (`Keahlian` and `Profil`) with migrations, seeders, and policies.
- Build Filament resources for both models, restricting `ProfilResource` to editing the ID 1 record only via `ProfilPolicy`.
- Update Laravel web routes to fetch database records and pass them to Inertia, updating `Identitas.jsx` and `Arsenal.jsx` components.
- Build three Filament widgets (Stats overview, skills chart, and cyberpunk system status terminal) and register them to the Filament dashboard.

**Tech Stack:** Laravel, Filament 3, SQLite, Inertia.js, React.

## Global Constraints
- Make sure to disable `create` and `delete` actions for `Profil` via a dedicated policy class.
- Set default color mappings for Keahlian: `primary`, `accent`, and `warning`.
- Preserve the exact layout and look on the frontend pages while transitioning from static hardcoded arrays to backend database records.

---

### Task 1: Database Setup (Migrations, Models, Seeder, and Policies)

**Files:**
- Create: `database/migrations/2026_06_18_000000_create_keahlians_table.php`
- Create: `database/migrations/2026_06_18_000001_create_profils_table.php`
- Create: `app/Models/Keahlian.php`
- Create: `app/Models/Profil.php`
- Create: `app/Policies/ProfilPolicy.php`
- Modify: `database/seeders/DatabaseSeeder.php`

- [ ] **Step 1: Create Keahlian Model & Migration**

Create model file `app/Models/Keahlian.php`:
```php
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
```

Create migration file `database/migrations/2026_06_18_000000_create_keahlians_table.php`:
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('keahlians', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->integer('level')->default(0);
            $table->string('deskripsi')->nullable();
            $table->string('warna')->default('primary');
            $table->boolean('apakah_core')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('keahlians');
    }
};
```

- [ ] **Step 2: Create Profil Model, Policy, & Migration**

Create model file `app/Models/Profil.php`:
```php
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
```

Create policy file `app/Policies/ProfilPolicy.php`:
```php
<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Profil;

class ProfilPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Profil $profil): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return false;
    }

    public function update(User $user, Profil $profil): bool
    {
        return true;
    }

    public function delete(User $user, Profil $profil): bool
    {
        return false;
    }

    public function restore(User $user, Profil $profil): bool
    {
        return false;
    }

    public function forceDelete(User $user, Profil $profil): bool
    {
        return false;
    }
}
```

Create migration file `database/migrations/2026_06_18_000001_create_profils_table.php`:
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profils', function (Blueprint $table) {
            $table->id();
            $table->string('nama_lengkap');
            $table->string('peran');
            $table->string('spesialisasi');
            $table->string('wilayah');
            $table->text('kutipan');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profils');
    }
};
```

- [ ] **Step 3: Update DatabaseSeeder.php**

Open `database/seeders/DatabaseSeeder.php` and append the seeding of `Keahlian` and `Profil` records.

```php
<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Keahlian;
use App\Models\Profil;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Pastikan ada user admin
        if (User::count() === 0) {
            User::create([
                'name' => 'Arif Renggy',
                'email' => 'admin@arifrenggy.site',
                'password' => Hash::make('password123'),
            ]);
        }

        // Seed Keahlian
        Keahlian::truncate();
        $skills = [
            ['nama' => 'Laravel', 'level' => 95, 'warna' => 'accent', 'apakah_core' => true, 'deskripsi' => 'Mesin utama untuk backend berkinerja tinggi.'],
            ['nama' => 'React', 'level' => 85, 'warna' => 'primary', 'apakah_core' => false, 'deskripsi' => 'Antarmuka reaktif dan dinamis.'],
            ['nama' => 'Tailwind CSS', 'level' => 90, 'warna' => 'primary', 'apakah_core' => false, 'deskripsi' => 'Sistem desain utilitas atomik.'],
            ['nama' => 'Docker', 'level' => 75, 'warna' => 'warning', 'apakah_core' => false, 'deskripsi' => 'Kontainerisasi infrastruktur.'],
            ['nama' => 'SQLite', 'level' => 80, 'warna' => 'warning', 'apakah_core' => false, 'deskripsi' => 'Penyimpanan data lokal yang persisten.'],
            ['nama' => 'Inertia.js', 'level' => 88, 'warna' => 'primary', 'apakah_core' => false, 'deskripsi' => 'Penghubung mulus antara Laravel dan React.'],
        ];

        foreach ($skills as $skill) {
            Keahlian::create($skill);
        }

        // Seed Profil
        Profil::truncate();
        Profil::create([
            'nama_lengkap' => 'Arif Renggy',
            'peran' => 'Fullstack Developer',
            'spesialisasi' => 'Laravel Expert',
            'wilayah' => 'Indonesia',
            'kutipan' => 'Arsitek Sistem yang berspesialisasi dalam membangun infrastruktur digital yang kokoh dan efisien menggunakan Laravel.',
        ]);
    }
}
```

- [ ] **Step 4: Run Migrations and Database Seeder**

Run commands:
```bash
php artisan migrate:fresh --seed
```
Expected: Database is reset, migrations run successfully, and seed data is fully written to database.

- [ ] **Step 5: Commit Task 1**

Run:
```bash
git add app/Models app/Policies database/migrations database/seeders/DatabaseSeeder.php
git commit -m "feat: set up database migrations, models, policies, and seeders for Keahlian & Profil"
```

---

### Task 2: Build Filament Admin Resources

**Files:**
- Create: `app/Filament/Resources/KeahlianResource.php`
- Create: `app/Filament/Resources/ProfilResource.php`

- [ ] **Step 1: Build KeahlianResource**

Create resource file `app/Filament/Resources/KeahlianResource.php` using Filament's layout and schemas component inputs:

```php
<?php

namespace App\Filament\Resources;

use App\Models\Keahlian;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions;

class KeahlianResource extends Resource
{
    protected static ?string $model = Keahlian::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-cpu-chip';

    protected static ?string $navigationLabel = 'Kelola Keahlian';

    protected static ?string $modelLabel = 'Keahlian';

    protected static ?string $pluralModelLabel = 'Daftar Keahlian';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make()
                    ->schema([
                        Forms\Components\TextInput::make('nama')
                            ->label('Nama Teknologi')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('level')
                            ->label('Tingkat Keahlian (%)')
                            ->numeric()
                            ->required()
                            ->minValue(0)
                            ->maxValue(100),

                        Forms\Components\Select::make('warna')
                            ->label('Warna Indikator')
                            ->required()
                            ->options([
                                'primary' => 'Primary (Cyan)',
                                'accent' => 'Accent (Pink)',
                                'warning' => 'Warning (Yellow)',
                            ]),

                        Forms\Components\Toggle::make('apakah_core')
                            ->label('Core Engine Teknologi')
                            ->default(false),

                        Forms\Components\Textarea::make('deskripsi')
                            ->label('Deskripsi Singkat')
                            ->nullable()
                            ->rows(3),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nama')
                    ->label('Nama Teknologi')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('level')
                    ->label('Tingkat (%)')
                    ->sortable(),
                Tables\Columns\TextColumn::make('warna')
                    ->label('Warna')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'accent' => 'danger',
                        'warning' => 'warning',
                        default => 'info',
                    }),
                Tables\Columns\IconColumn::make('apakah_core')
                    ->label('Core')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat Pada')
                    ->dateTime()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Actions\EditAction::make(),
                Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => KeahlianResource\Pages\ManageKeahlians::route('/'),
        ];
    }
}
```

And create the relation manager / sub-page directory `app/Filament/Resources/KeahlianResource/Pages/ManageKeahlians.php`:
```php
<?php

namespace App\Filament\Resources\KeahlianResource\Pages;

use App\Filament\Resources\KeahlianResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageKeahlians extends ManageRecords
{
    protected static string $resource = KeahlianResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
```

- [ ] **Step 2: Build ProfilResource**

Create resource file `app/Filament/Resources/ProfilResource.php`:

```php
<?php

namespace App\Filament\Resources;

use App\Models\Profil;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions;

class ProfilResource extends Resource
{
    protected static ?string $model = Profil::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-user';

    protected static ?string $navigationLabel = 'Kelola Profil';

    protected static ?string $modelLabel = 'Profil';

    protected static ?string $pluralModelLabel = 'Daftar Profil';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make()
                    ->schema([
                        Forms\Components\TextInput::make('nama_lengkap')
                            ->label('Nama Lengkap')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('peran')
                            ->label('Peran / Jabatan')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('spesialisasi')
                            ->label('Spesialisasi Utama')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('wilayah')
                            ->label('Wilayah / Domisili')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\Textarea::make('kutipan')
                            ->label('Kutipan Profil')
                            ->required()
                            ->rows(4),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nama_lengkap')
                    ->label('Nama Lengkap'),
                Tables\Columns\TextColumn::make('peran')
                    ->label('Peran'),
                Tables\Columns\TextColumn::make('spesialisasi')
                    ->label('Spesialisasi'),
                Tables\Columns\TextColumn::make('wilayah')
                    ->label('Wilayah'),
            ])
            ->actions([
                Actions\EditAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ProfilResource\Pages\ManageProfils::route('/'),
        ];
    }
}
```

And create the sub-page directory `app/Filament/Resources/ProfilResource/Pages/ManageProfils.php`:
```php
<?php

namespace App\Filament\Resources\ProfilResource\Pages;

use App\Filament\Resources\ProfilResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageProfils extends ManageRecords
{
    protected static string $resource = ProfilResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }
}
```

- [ ] **Step 3: Commit Task 2**

Run:
```bash
git add app/Filament/Resources
git commit -m "feat: add Filament resources KeahlianResource and ProfilResource with specific single-row restrictions"
```

---

### Task 3: Dynamic Page Rendering (Frontend & Routes)

**Files:**
- Modify: `routes/web.php`
- Modify: `resources/js/Pages/Identitas.jsx`
- Modify: `resources/js/Pages/Arsenal.jsx`

- [ ] **Step 1: Modify routes/web.php**

Open `routes/web.php` and load `Profil` and `Keahlian` data in the respective routes.

```php
<?php

use Inertia\Inertia;
use App\Models\Proyek;
use App\Models\Profil;
use App\Models\Keahlian;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/identitas');

Route::get('/identitas', function () {
    return Inertia::render('Identitas', [
        'profil' => Profil::first(),
    ]);
});

Route::get('/misi', function () {
    return Inertia::render('Misi', [
        'proyek' => Proyek::all(),
    ]);
});

Route::get('/arsenal', function () {
    return Inertia::render('Arsenal', [
        'skills' => Keahlian::all(),
    ]);
});

Route::get('/jalur-komunikasi', function () {
    return Inertia::render('Kontak');
});
```

- [ ] **Step 2: Update Identitas.jsx**

Update `resources/js/Pages/Identitas.jsx` to receive `profil` prop from controller:

```jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import ArsipLayout from '../Layouts/ArsipLayout';

export default function Identitas({ profil }) {
    // Fallback static profile in case DB query is empty (robust default)
    const activeProfil = profil || {
        nama_lengkap: 'Arif Renggy',
        peran: 'Fullstack Developer',
        spesialisasi: 'Laravel Expert',
        wilayah: 'Indonesia',
        kutipan: 'Arsitek Sistem yang berspesialisasi dalam membangun infrastruktur digital yang kokoh dan efisien menggunakan Laravel.'
    };

    return (
        <ArsipLayout>
            <Head>
                <title>Identitas Core | Arif Renggy - Fullstack Developer</title>
                <meta name="description" content="Arsip identitas inti dan profil profesional Arif Renggy sebagai Fullstack Laravel & React Developer." />
                <meta name="keywords" content="Arif Renggy, Laravel, React, Fullstack Developer, Indonesia, Cyberpunk UI" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://arifrenggy.site/identitas" />
                <meta property="og:title" content="Identitas Core | Arif Renggy - Fullstack Developer" />
                <meta property="og:description" content="Arsip identitas inti dan profil profesional Arif Renggy sebagai Fullstack Laravel & React Developer." />
                <meta property="og:site_name" content="Arif Renggy Portfolio" />
                
                {/* Twitter */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content="https://arifrenggy.site/identitas" />
                <meta name="twitter:title" content="Identitas Core | Arif Renggy - Fullstack Developer" />
                <meta name="twitter:description" content="Arsip identitas inti dan profil profesional Arif Renggy sebagai Fullstack Laravel & React Developer." />
            </Head>
            <div className="space-y-6">
                <h2 className="text-terminal-accent font-mono text-lg uppercase tracking-widest underline decoration-wavy text-neon-pink">Arsip Identitas</h2>
                <ul className="grid grid-cols-2 gap-4 text-sm font-mono">
                    <li className="p-4 border border-gray-800 bg-black/40 hover:border-terminal-primary/30 transition-colors">
                        <div className="text-gray-500 mb-1 text-[10px]">IDENTITAS_INTI</div>
                        <div className="text-white">{activeProfil.nama_lengkap}</div>
                    </li>
                    <li className="p-4 border border-gray-800 bg-black/40 hover:border-terminal-primary/30 transition-colors">
                        <div className="text-gray-500 mb-1 text-[10px]">PERAN</div>
                        <div className="text-white">{activeProfil.peran}</div>
                    </li>
                    <li className="p-4 border border-gray-800 bg-black/40 hover:border-terminal-primary/30 transition-colors border-l-2 border-l-terminal-primary">
                        <div className="text-gray-500 mb-1 text-[10px]">SPESIALISASI</div>
                        <div className="text-terminal-primary font-bold">{activeProfil.spesialisasi}</div>
                    </li>
                    <li className="p-4 border border-gray-800 bg-black/40 hover:border-terminal-primary/30 transition-colors">
                        <div className="text-gray-500 mb-1 text-[10px]">WILAYAH</div>
                        <div className="text-white">{activeProfil.wilayah}</div>
                    </li>
                </ul>
                <div className="relative p-6 border border-gray-800 bg-[#1a1a1c]/30">
                     <div className="absolute top-0 left-0 w-1 h-full bg-terminal-warning"></div>
                     <p className="text-gray-400 text-sm leading-relaxed italic">
                        "{activeProfil.kutipan}"
                    </p>
                </div>
            </div>
        </ArsipLayout>
    );
}
```

- [ ] **Step 3: Update Arsenal.jsx**

Update `resources/js/Pages/Arsenal.jsx` to receive `skills` prop from controller and map theme properties:

```jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import ArsipLayout from '../Layouts/ArsipLayout';

export default function Arsenal({ skills }) {
    // Mapping warna database ke CSS variables
    const getWarnaVariable = (colorName) => {
        switch (colorName) {
            case 'accent': return 'var(--color-terminal-accent)';
            case 'warning': return 'var(--color-terminal-warning)';
            default: return 'var(--color-terminal-primary)';
        }
    };

    const activeSkills = (skills && skills.length > 0) ? skills : [
        { name: 'Laravel', level: 95, warna: 'accent', apakah_core: true, deskripsi: 'Mesin utama untuk backend berkinerja tinggi.' },
        { name: 'React', level: 85, warna: 'primary', apakah_core: false, deskripsi: 'Antarmuka reaktif dan dinamis.' },
        { name: 'Tailwind CSS', level: 90, warna: 'primary', apakah_core: false, deskripsi: 'Sistem desain utilitas atomik.' },
        { name: 'Docker', level: 75, warna: 'warning', apakah_core: false, deskripsi: 'Kontainerisasi infrastruktur.' },
        { name: 'SQLite', level: 80, warna: 'warning', apakah_core: false, deskripsi: 'Penyimpanan data lokal yang persisten.' },
        { name: 'Inertia.js', level: 88, warna: 'primary', apakah_core: false, deskripsi: 'Penghubung mulus antara Laravel dan React.' }
    ];

    return (
        <ArsipLayout>
            <Head>
                <title>Pusat Arsenal Keahlian | Arif Renggy - Fullstack Developer</title>
                <meta name="description" content="Keahlian teknis dan tumpukan teknologi (arsenal) Arif Renggy seperti Laravel, React, Tailwind CSS, Inertia.js, dan Docker." />
                <meta name="keywords" content="Tech stack, Laravel skill, React skill, PHP, JavaScript, Docker, Tailwind" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://arifrenggy.site/arsenal" />
                <meta property="og:title" content="Pusat Arsenal Keahlian | Arif Renggy - Fullstack Developer" />
                <meta property="og:description" content="Keahlian teknis dan tumpukan teknologi (arsenal) Arif Renggy seperti Laravel, React, Tailwind CSS, Inertia.js, dan Docker." />
                <meta property="og:site_name" content="Arif Renggy Portfolio" />
                
                {/* Twitter */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content="https://arifrenggy.site/arsenal" />
                <meta name="twitter:title" content="Pusat Arsenal Keahlian | Arif Renggy - Fullstack Developer" />
                <meta name="twitter:description" content="Keahlian teknis dan tumpukan teknologi (arsenal) Arif Renggy seperti Laravel, React, Tailwind CSS, Inertia.js, dan Docker." />
            </Head>
            <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <h2 className="text-terminal-accent font-mono text-lg uppercase tracking-widest underline decoration-wavy text-neon-pink">Pusat Teknologi</h2>
                    <span className="text-[10px] text-gray-600 font-mono">STATUS_ALUTSISTA: OPTIMAL</span>
                </div>
                
                <ul className="grid grid-cols-1 gap-6">
                    {activeSkills.map(s => (
                        <li key={s.nama || s.name} className={`p-5 border transition-all ${(s.apakah_core || s.isCore) ? "border-terminal-accent/40 bg-terminal-accent/5 shadow-[0_0_15px_var(--color-terminal-muted)]" : "border-gray-800 bg-[#1a1a1c]/20 hover:border-gray-700"}`}>
                            <div className="flex flex-row items-center justify-between gap-4 mb-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className={`font-mono uppercase tracking-tighter ${(s.apakah_core || s.isCore) ? 'text-terminal-accent font-black text-xl text-neon-pink' : 'text-gray-200 font-bold'}`}>
                                            {s.nama || s.name}
                                        </span>
                                        {(s.apakah_core || s.isCore) && (
                                            <span className="text-[8px] bg-terminal-accent text-black px-1.5 py-0.5 font-black uppercase leading-none">CORE_ENGINE</span>
                                        )}
                                    </div>
                                    <div className="text-[10px] text-gray-500 font-mono italic">{s.deskripsi || s.desc}</div>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="font-mono text-lg font-bold text-white">{s.level}</span>
                                    <span className="font-mono text-[10px] text-gray-600">%_ENERGI</span>
                                </div>
                            </div>
                            
                            <div className="w-full h-1.5 bg-black border border-gray-900 overflow-hidden">
                                <div 
                                    className="h-full transition-all duration-[2000ms] ease-out shadow-[0_0_10px_currentColor]" 
                                    style={{ 
                                        width: `${s.level}%`, 
                                        backgroundColor: getWarnaVariable(s.warna),
                                        color: getWarnaVariable(s.warna) 
                                    }}
                                ></div>
                            </div>
                        </li>
                    ))}
                </ul>
                
                <div className="p-4 border border-dashed border-gray-800 opacity-40 hover:opacity-100 transition-opacity">
                    <div className="text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-widest">Analisis_Tambahan:</div>
                    <p className="text-[11px] text-gray-400 font-mono leading-relaxed">
                        Sistem arsenal terus diperbarui. Memiliki kemahiran mendalam dalam integrasi modul Laravel 13, optimalisasi database SQLite, dan pengembangan antarmuka reaktif menggunakan React 19.
                    </p>
                </div>
            </div>
        </ArsipLayout>
    );
}
```

- [ ] **Step 4: Commit Task 3**

Run:
```bash
git add routes/web.php resources/js/Pages/Identitas.jsx resources/js/Pages/Arsenal.jsx
git commit -m "feat: bind backend database records to Identitas and Arsenal page templates"
```

---

### Task 4: Filament Dashboard Custom Widgets

**Files:**
- Create: `app/Filament/Widgets/StatsOverview.php`
- Create: `app/Filament/Widgets/KeahlianChart.php`
- Create: `app/Filament/Widgets/SystemStatus.php`
- Create: `resources/views/filament/widgets/system-status.blade.php`
- Modify: `app/Providers/Filament/AdminPanelProvider.php`

- [ ] **Step 1: Create StatsOverview Widget**

Create file `app/Filament/Widgets/StatsOverview.php`:
```php
<?php

namespace App\Filament\Widgets;

use App\Models\Proyek;
use App\Models\Keahlian;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        return [
            Stat::make('Total Proyek', Proyek::count())
                ->description('Misi terselesaikan')
                ->descriptionIcon('heroicon-m-briefcase')
                ->color('success'),
            Stat::make('Total Keahlian', Keahlian::count())
                ->description('Arsenal teknologi')
                ->descriptionIcon('heroicon-m-cpu-chip')
                ->color('info'),
            Stat::make('Core Engine', Keahlian::where('apakah_core', true)->count())
                ->description('Keahlian utama')
                ->descriptionIcon('heroicon-m-bolt')
                ->color('danger'),
        ];
    }
}
```

- [ ] **Step 2: Create KeahlianChart Widget**

Create file `app/Filament/Widgets/KeahlianChart.php`:
```php
<?php

namespace App\Filament\Widgets;

use App\Models\Keahlian;
use Filament\Widgets\ChartWidget;

class KeahlianChart extends ChartWidget
{
    protected static ?string $heading = 'Tingkat Energi Keahlian (%)';

    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $skills = Keahlian::all();

        return [
            'datasets' => [
                [
                    'label' => 'Level Keahlian',
                    'data' => $skills->pluck('level')->toArray(),
                    'backgroundColor' => 'rgba(0, 240, 255, 0.2)',
                    'borderColor' => '#00f0ff',
                    'borderWidth' => 1,
                ],
            ],
            'labels' => $skills->pluck('nama')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
```

- [ ] **Step 3: Create SystemStatus Custom Terminal Widget**

Create backend class file `app/Filament/Widgets/SystemStatus.php`:
```php
<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;

class SystemStatus extends Widget
{
    protected static string $view = 'filament.widgets.system-status';

    protected static ?int $sort = 3;

    protected int|string|array $columnSpan = 'full';

    protected function getViewData(): array
    {
        $dbPath = config('database.connections.sqlite.database');
        $dbSize = file_exists($dbPath) ? round(filesize($dbPath) / 1024, 2) . ' KB' : 'N/A';

        return [
            'os' => PHP_OS_FAMILY,
            'phpVersion' => PHP_VERSION,
            'laravelVersion' => app()->version(),
            'environment' => app()->environment(),
            'dbSize' => $dbSize,
            'timezone' => config('app.timezone'),
        ];
    }
}
```

Create view file `resources/views/filament/widgets/system-status.blade.php`:
```html
<x-filament-widgets::widget>
    <x-filament::section>
        <div class="font-mono text-xs space-y-2 select-none" style="color: #00f0ff;">
            <div class="flex items-center gap-2 border-b border-cyan-900 pb-1 mb-2">
                <span class="inline-block w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                <span class="font-bold uppercase tracking-wider">SYSTEM_MONITORING_UPLINK</span>
            </div>
            <div class="grid grid-cols-2 gap-y-1 gap-x-6">
                <div><span class="opacity-50">// HOST_OS:</span> <span class="text-white">{{ $os }}</span></div>
                <div><span class="opacity-50">// DATABASE_SIZE:</span> <span class="text-white">{{ $dbSize }}</span></div>
                <div><span class="opacity-50">// PHP_VERSION:</span> <span class="text-white">{{ $phpVersion }}</span></div>
                <div><span class="opacity-50">// TIMEZONE:</span> <span class="text-white">{{ $timezone }}</span></div>
                <div><span class="opacity-50">// LARAVEL_VER:</span> <span class="text-white">{{ $laravelVersion }}</span></div>
                <div><span class="opacity-50">// ENVIRONMENT:</span> <span class="text-white font-bold uppercase">{{ $environment }}</span></div>
            </div>
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
```

- [ ] **Step 4: Register Widgets in AdminPanelProvider.php**

Open `app/Providers/Filament/AdminPanelProvider.php` and make sure it discovers widgets:
```php
// Change widgets section to dynamically register our custom widgets if they aren't auto-discovered, or just confirm it scans App\Filament\Widgets namespace.
```

- [ ] **Step 5: Commit Task 4**

Run:
```bash
git add app/Filament/Widgets resources/views/filament/widgets
git commit -m "feat: create StatsOverview, KeahlianChart, and SystemStatus terminal widgets for Filament dashboard"
```

---

### Task 5: Compilation and Verification

- [ ] **Step 1: Compile assets using Vite**

Run: `npm run build`
Expected: Production build compiles successfully.

- [ ] **Step 2: Run test suite**

Run: `vendor/bin/phpunit`
Expected: All tests pass.
