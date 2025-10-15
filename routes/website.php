<?php

use App\Http\Controllers\Website\HomeController;
use Illuminate\Support\Facades\Route;

Route::domain('website-dev.apaechavantes.org.br')->group(function () {
    Route::get('', [HomeController::class, 'index'])->name('home.index');
});
