<?php

namespace App\Filament\Widgets;

use App\Models\Keahlian;
use Filament\Widgets\ChartWidget;

class KeahlianChart extends ChartWidget
{
    protected ?string $heading = 'Tingkat Energi Keahlian (%)';

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
