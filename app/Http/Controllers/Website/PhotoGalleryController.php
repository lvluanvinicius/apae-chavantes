<?php
namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Models\PhotoGallery;
use Inertia\Response as InertiaResponse;

class PhotoGalleryController extends Controller
{
    public function __construct(protected PhotoGallery $photoGallery)
    {}

    public function index(): InertiaResponse
    {

        $galleries = $this->photoGallery->paginate(10);

        return inertia('website/photo-gallery/index', [
            'data' => $galleries,
        ]);
    }
}
