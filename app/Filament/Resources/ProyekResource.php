<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProyekResource\Pages;
use App\Models\Proyek;
use Filament\Actions;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProyekResource extends Resource
{
    protected static ?string $model = Proyek::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-briefcase';

    protected static ?string $navigationLabel = 'Kelola Proyek';

    protected static ?string $modelLabel = 'Proyek';

    protected static ?string $pluralModelLabel = 'Daftar Proyek';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make()
                    ->schema([
                        Forms\Components\TextInput::make('nama_proyek')
                            ->label('Nama Proyek')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, callable $set) => $set('tautan_slug', Str::slug($state))),

                        Forms\Components\TextInput::make('tautan_slug')
                            ->label('Tautan Slug')
                            ->required()
                            ->unique(Proyek::class, 'tautan_slug', ignoreRecord: true)
                            ->maxLength(255),

                        Forms\Components\Textarea::make('deskripsi')
                            ->label('Deskripsi Proyek')
                            ->required()
                            ->rows(4),

                        Forms\Components\TagsInput::make('teknologi_utama')
                            ->label('Teknologi Utama')
                            ->required()
                            ->placeholder('Tambah teknologi...'),

                        Forms\Components\FileUpload::make('jalur_gambar')
                            ->label('Gambar Sampul Proyek')
                            ->disk('public')
                            ->directory('gambar-proyek')
                            ->image()
                            ->nullable(),

                        Forms\Components\TextInput::make('tautan_langsung')
                            ->label('Tautan Demo Live')
                            ->url()
                            ->nullable(),

                        Forms\Components\TextInput::make('tautan_github')
                            ->label('Tautan Repositori GitHub')
                            ->url()
                            ->nullable(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('jalur_gambar')
                    ->label('Sampul')
                    ->disk('public'),
                Tables\Columns\TextColumn::make('nama_proyek')
                    ->label('Nama Proyek')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('tautan_slug')
                    ->label('Slug')
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TagsColumn::make('teknologi_utama')
                    ->label('Teknologi'),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat Pada')
                    ->dateTime()
                    ->sortable(),
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
            'index' => Pages\ManageProyeks::route('/'),
        ];
    }
}
