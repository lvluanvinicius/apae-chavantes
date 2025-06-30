<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DataTrash;
use App\Models\PhotoGallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TrashPhotoGalleryController extends Controller
{
    /**
     * Move os dados para lixeira.
     * @author Luan Santos <lvluansantos@gmail.com>
     *
     * @param \Illuminate\Http\Request $request
     * @param string $uuid
     * @throws \Exception
     * @return RedirectResponse
     */
    public function __invoke(Request $request): RedirectResponse
    {
        try {
            $galleryIds = $request->galleries;

            if (! isset($galleryIds)) {
                throw new \Exception('Campo galleries com os ids a serem movidos para lixeira é obrigatório.');
            }

            if (! is_array($galleryIds)) {
                throw new \Exception('Por favor, informe um array com os ids das galerias a serem movidas para a lixeira no campo galleries.');
            }

            DB::transaction(function () use ($galleryIds) {
                $itens = PhotoGallery::whereIn('id', $galleryIds)->get();

                foreach ($itens as $item) {
                    $item->load('files');
                    $item->files->count() > 0 && throw new \Exception('Uma ou mais galerias não podem ser excluídas, pois contém imagens inclusas.');

                    // Mover dados para lixeira.
                    DataTrash::create([
                        'dst_type' => 'gallery',
                        'content'  => $item->toJson(),
                    ]);

                    $item->delete();
                }
            });

            return redirect()->route('admin.photo-gallery.index')->with([
                'success' => 'Galeria(as) movida(as) com sucesso.',
            ]);
        } catch (\Exception $error) {
            return redirect()->back()->with([
                'error' => $error->getMessage(),
            ]);
        }
    }
}
