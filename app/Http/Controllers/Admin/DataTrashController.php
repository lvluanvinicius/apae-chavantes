<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DataTrash;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;

class DataTrashController extends Controller
{
    public function __construct(protected DataTrash $modelDataTrash)
    {}

    public function index(Request $request): InertiaResponse
    {
        $search   = $request->has('search') ? $request->get('search') : 10;
        $paginate = $request->has('paginate') ? $request->get('paginate') : 10;
        $dstType  = $request->has('dst-type') ? $request->get('dst-type') : 'gallery';

        $query = $this->modelDataTrash->query();

        $query->where('dst_type', $dstType);

        $data = $query->paginate($paginate);

        return inertia('trash/index', ['data' => $data]);
    }

}
