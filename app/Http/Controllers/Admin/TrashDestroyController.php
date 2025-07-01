<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DataTrash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TrashDestroyController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        try {
            $trashIds = $request->trashIds;

            if (! isset($trashIds)) {
                throw new \Exception('Campo trashIds com os Ids a serem excluídos.');
            }

            if (! is_array($trashIds)) {
                throw new \Exception('Por favor, informe um array com os ids a serem excluídos.');
            }

            $dataTrash = DataTrash::whereIn('id', $trashIds)->get();

            $items = [];

            foreach ($dataTrash as $trash) {
                if (! array_key_exists($trash->dst_type, $items)) {
                    $items[$trash->dst_type] = [];
                }

                $items[$trash->dst_type][] = $trash;
            }

            $disk = Storage::disk('public');

            DB::transaction(function () use ($items, $disk) {
                foreach ($items as $key => $itemData) {
                    foreach ($itemData as $trash) {
                        switch ($key) {
                            case 'gallery':
                                $content = json_decode($trash->content, true);
                                $disk->delete($content['gallery_image']);
                                $trash->delete();
                                break;

                            case 'gallery-images':
                                $content = json_decode($trash->content, true);
                                $disk->delete($content['path']);
                                $trash->delete();
                                break;

                            default:
                                # code...
                                break;
                        }
                    }
                }
            });

            return redirect()->back()->with([
                'success' => 'Itens restaurados com sucesso.',
            ]);
        } catch (\Exception $error) {
            return redirect()->back()->with([
                'error' => $error->getMessage(),
            ]);
        }
    }
}
