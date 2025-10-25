<?php

use App\Http\Controllers\Website\HomeController;
use App\Http\Controllers\Website\PhotoGalleryController;
use App\Http\Controllers\Website\TransparencyController;
use Illuminate\Support\Facades\Route;

Route::domain('website-dev.apaechavantes.org.br')->as('website.')->group(function () {
    Route::get('', [HomeController::class, 'index'])->name('home.index');

    Route::get('galeria', [PhotoGalleryController::class, 'index'])->name('photo-gallery.index');

    Route::get('transparencia/{uuid?}', [TransparencyController::class, 'index'])->name('transparencia.index');
});
