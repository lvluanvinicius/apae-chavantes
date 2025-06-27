<?php

use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\PhotoGalleryController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->as('admin.')->group(function () {
    # Usuários.
    Route::put('users/{user}/permissions', [PermissionController::class, 'update'])->name('users.permissions.update');
    Route::resource('users', UserController::class);

    # Galeria de Fotos.
    Route::get('storage/{image}', fn() => '')->name('photo-gallery.image');
    Route::resource('photo-gallery', PhotoGalleryController::class);
});
