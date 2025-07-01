<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;

class SliderController extends Controller
{
    public function __construct(protected Slider $modelSlider)
    {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): InertiaResponse
    {
        $search   = $request->has('search') ? $request->get('search') : '';
        $paginate = $request->has('paginate') ? $request->get('paginate') : 10;

        $query = $this->modelSlider->newQuery();

        if (! empty($search)) {
            $searchUpper = strtoupper($search);

            $query->where(function ($q) use ($searchUpper) {
                $q->whereRaw('UPPER(gallery_name) LIKE ?', ['%' . $searchUpper . '%'])
                    ->orWhereRaw('UPPER(gallery_description) LIKE ?', ['%' . $searchUpper . '%']);
            });
        }

        $data = $query->paginate($paginate);

        return inertia('sliders/index', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
