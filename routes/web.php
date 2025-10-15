<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

require __DIR__ . '/settings.php';

// app-dev.apaechavantes.org.br -> para o painel.
// website-dev.apaechavantes.org.br -> para o novo website.
// blog-dev.apaechavantes.org.br -> para o blog de noticias e postagens.

require __DIR__ . '/website.php';

Route::domain('app-dev.apaechavantes.org.br')->group(function () {
    require __DIR__ . '/auth.php';
    require __DIR__ . '/admin.php';

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');
    });
});

Route::domain('blog-dev.apaechavantes.org.br')->group(function () {
    Route::get('', function () {
        return 'Isso é apenas um blog inicial.';
    });
});
