<?php

use App\Http\Controllers\Admin\DataTrashController;
use App\Http\Controllers\Admin\MoveDataTrashController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\PhotoGalleryController;
use App\Http\Controllers\Admin\PhotoGalleryFileUploadController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SliderCampaignController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\TransparencyController;
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

    # Coringa para carregar as imagens.
    Route::get('storage/{image?}', fn() => '')->name('photo-gallery.image');

    # Galeria de Fotos.
    Route::get('photo-gallery-json', [PhotoGalleryController::class, 'json'])->name('photo-gallery-json');
    Route::post('photo-gallery-update/{photo_gallery}', [PhotoGalleryController::class, 'update'])->name('photo-gallery-update');
    Route::resource('photo-gallery', PhotoGalleryController::class);

    # Trash Actions
    Route::post('photo-gallery-trash', TrashPhotoGalleryController::class)->name('photo-gallery-trash');
    Route::post('gallery-image-trash/{photo_gallery}', TrashGaleryFileController::class)->name('gallery-image-trash');

    # Rota de upload de imagens para galeria.
    Route::post('photo-gallery/uploads/{photo_gallery}', PhotoGalleryFileUploadController::class)->name('photo-gallery.uploads');

    # Trash
    Route::post('trash-move', MoveDataTrashController::class)->name('trash-restore');
    Route::post('trash-restore', TrashRestoreController::class)->name('trash-restore');
    Route::post('trash-destroy', TrashDestroyController::class)->name('trash-destroy');
    Route::resource('trash', DataTrashController::class);

    # Sliders
    Route::get('sliders-json', [SliderController::class, 'slidersJson'])->name('sliders.sliders-json');
    Route::post('sliders/{photo_gallery}', [SliderController::class, 'update'])->name('sliders.update');
    Route::put('sliders/{photo_gallery}/active-and-inactive', [SliderController::class, 'activeAndInactive'])->name('sliders.active-and-inactive');
    Route::resource('sliders', SliderController::class);

    # Sliders Campaign.
    // Route::get('sliders-campaign', [SliderCampaignController::class, 'index'])->name('sliders-campaign.index');
    Route::post('sliders-campaign/{sliders_campaign}/add-slider', [SliderCampaignController::class, 'addSlider'])->name('sliders-campaign.add-slider');
    Route::resource('sliders-campaign', SliderCampaignController::class);

    # Configurações.
    Route::resource('settings', SettingController::class);

    # Transparencia.
    Route::prefix('transparency')->as('transparency.')->group(function () {
        // Recupera arquivos e pastas em diretórios.
        Route::get('{parent?}', [TransparencyController::class, 'index'])->name('index');

        // Cria uma nova pasta ou envia um novo arquivo para o diretório em aberto.
        Route::post('{parent?}', [TransparencyController::class, 'store'])->name('store');
        Route::put('{uuid}/{parent?}', [TransparencyController::class, 'update'])->name('update');
        Route::delete('{uuid}/{parent?}', [TransparencyController::class, 'destroy'])->name('destroy');
    });
});
