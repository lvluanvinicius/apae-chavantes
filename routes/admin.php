<?php

use App\Http\Controllers\Admin\DataTrashController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\PhotoGalleryController;
use App\Http\Controllers\Admin\PhotoGalleryFileUploadController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\TrashDestroyController;
use App\Http\Controllers\Admin\TrashGaleryFileController;
use App\Http\Controllers\Admin\TrashPhotoGalleryController;
use App\Http\Controllers\Admin\TrashRestoreController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->as('admin.')->group(function () {
    # Usuários.
    Route::put('users/{user}/permissions', [PermissionController::class, 'update'])->name('users.permissions.update');
    Route::resource('users', UserController::class);

    # Galeria de Fotos.
    Route::get('storage/{image}', fn() => '')->name('photo-gallery.image');
    Route::get('photo-gallery-json', [PhotoGalleryController::class, 'json'])->name('photo-gallery-json');
    Route::post('photo-gallery-update/{photo_gallery}', [PhotoGalleryController::class, 'update'])->name('photo-gallery-update');
    Route::resource('photo-gallery', PhotoGalleryController::class);

    # Trash Actions
    Route::post('photo-gallery-trash', TrashPhotoGalleryController::class)->name('photo-gallery-trash');
    Route::post('gallery-image-trash/{photo_gallery}', TrashGaleryFileController::class)->name('gallery-image-trash');

    # Rota de upload de imagens para galeria.
    Route::post('photo-gallery/uploads/{photo_gallery}', PhotoGalleryFileUploadController::class)->name('photo-gallery.uploads');

    # Trash
    Route::post('trash-restore', TrashRestoreController::class)->name('trash-restore');
    Route::post('trash-destroy', TrashDestroyController::class)->name('trash-destroy');
    Route::resource('trash', DataTrashController::class);

    # Sliders
    Route::resource('sliders', SliderController::class);
});
