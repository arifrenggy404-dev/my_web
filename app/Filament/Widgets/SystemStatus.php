<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;

class SystemStatus extends Widget
{
    protected string $view = 'filament.widgets.system-status';

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
