<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DataTrash;
use App\Models\PhotoGallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TrashRestoreController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        try {
            $trashIds = $request->trashIds;

            if (! isset($trashIds)) {
                throw new \Exception('Campo trashIds com os Ids a serem restaurados.');
            }

            if (! is_array($trashIds)) {
                throw new \Exception('Por favor, informe um array com os ids a serem restaurados.');
            }

            $dataTrash = DataTrash::whereIn('id', $trashIds)->get();

            $items = [];

            foreach ($dataTrash as $trash) {
                if (! array_key_exists($trash->dst_type, $items)) {
                    $items[$trash->dst_type] = [];
                }

                $items[$trash->dst_type][] = $trash;
            }

            DB::transaction(function () use ($items) {
                foreach ($items as $key => $itemData) {
                    foreach ($itemData as $trash) {
                        switch ($key) {
                            case 'gallery':
                                $content = json_decode($trash->content, true);
                                $gallery = new PhotoGallery($content);
                                $gallery->save();
                                $trash->delete();

                            default:
                                # code...
                        }
                    }
                }
            });

            return redirect()->route('admin.trash.index')->with([
                'success' => 'Itens restaurados com sucesso.',
            ]);
        } catch (\Exception $error) {
            dd($error);
            return redirect()->back()->with([
                'error' => $error->getMessage(),
            ]);
        }
    }
}
