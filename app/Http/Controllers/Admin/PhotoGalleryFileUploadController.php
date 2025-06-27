<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryFile;
use App\Models\PhotoGallery;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PhotoGalleryFileUploadController extends Controller
{
    /**
     * Efetua upload das imagens para uma galeria.
     * @author Luan Santos <lvluansantos@gmail.com>
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\PhotoGallery $photoGallery
     * @param \App\Models\GalleryFile $galleryFile
     * @return JsonResponse|mixed
     */
    public function __invoke(Request $request, PhotoGallery $photoGallery): JsonResponse
    {
        dd($request->all());
        $request->validate([
            'files' => 'required|file|image|max:5120',
        ]);
        $file        = $request->file('files');
        $currentDate = now()->format('Ymd');
        $basePath    = "gallery/{$currentDate}";

        $created = DB::transaction(function () use ($file, $photoGallery, $basePath) {
            $filename = Str::uuid() . '.' . $file->getClientOriginalName();
            $path     = "{$basePath}/{$filename}";

            Storage::disk('public')->put($path, file_get_contents($file));

            $fileSize = $file->getSize();
            $mimeType = $file->getMimeType();
            $hash     = sha1_file($file->getRealPath());

            [$width, $height] = getimagesize($file->getRealPath());

            return GalleryFile::create([
                'photo_gallery_id' => $photoGallery->id,
                'filename'         => $filename,
                'path'             => $path,
                'size_file'        => $fileSize,
                'type_file'        => $mimeType,
                'hash'             => $hash,
                'width'            => $width,
                'height'           => $height,
            ]);
        });

        return response()->json([
            'id'       => $created->id,
            'filename' => $created->filename,
            'path'     => Storage::url($created->path),
            'message'  => 'Upload realizado com sucesso.',
        ]);
    }
}
