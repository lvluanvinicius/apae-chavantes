<?php
namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Models\Transparency;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;

class TransparencyController extends Controller
{
    public function __construct(protected Transparency $transparency)
    {}

    public function index(Request $request, string | null $uuid = null): InertiaResponse
    {
        $paginate = $request->has('paginate') ? $request->get('paginate') : 10;

        $currentFolder = $this->transparency->where('uuid', $uuid)->where('is_folder', 'Y')->first() ?: null;

        $data = $this->transparency->query()
            ->where('parent_id', $currentFolder?->id)
            ->orderByRaw("CASE WHEN is_folder = 'Y' THEN 0 ELSE 1 END")
            ->orderBy('name', 'desc')
            ->paginate($paginate);

        $breadcrumbs = $currentFolder?->path_to_root ?? collect();

        return inertia('website/transparency/index', [
            'breadcrumbs' => $breadcrumbs, 'data' => $data, 'uuid' => $uuid,
        ]);
    }
}
