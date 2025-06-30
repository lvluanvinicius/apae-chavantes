<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DataTrash;
use App\Models\GalleryFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GaleryImageTrashController extends Controller
{
    public function __invoke(Request $request, string $uuid): RedirectResponse
    {
        try {
            $imageIds = $request->images;

            if (! isset($imageIds)) {
                throw new \Exception('Campo images com os ids a serem movidos para lixeira é obrigatório.');
            }

            if (! is_array($imageIds)) {
                throw new \Exception('Por favor, informe um array com os ids das imagens a serem movidas para a lixeira no campo images.');
            }

            DB::transaction(function () use ($imageIds) {
                $images = GalleryFile::whereIn('id', $imageIds)->get();

                foreach ($images as $image) {
                    // Mover dados para lixeira.
                    DataTrash::create([
                        'dst_type' => 'gallery-images',
                        'content'  => $image->toJson(),
                    ]);

                    $image->delete();
                }
            });

            return redirect()->route('admin.photo-gallery.show', ['photo_gallery' => $uuid])->with([
                'success' => 'Imagens movidas com sucesso.',
            ]);
        } catch (\Exception $error) {
            return redirect()->back()->with([
                'error' => $error->getMessage(),
            ]);
        }
    }
}
