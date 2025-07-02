<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SliderCampaign;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SliderCampaignController extends Controller
{
    public function __construct(protected SliderCampaign $modelDliderCampaign)
    {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $search = $request->input('q', ''); // valor padrão: string vazia

        $query = $this->modelDliderCampaign->newQuery();

        if (! empty($search)) {
            $searchUpper = strtoupper($search);

            $query->where(function ($q) use ($searchUpper) {
                $q->whereRaw('UPPER(description) LIKE ?', ['%' . $searchUpper . '%']);
            });
        }

        $query->orderBy('created_at', 'desc');

        $data = $query->limit(15)->get();

        return response()->json([
            'data' => $data,
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
        try {
            $request->validate([
                'description' => 'required',
                'start_date'  => 'required',
                'end_date'    => 'required',
            ]);

            $data = $request->only(['description', 'start_date', 'end_date', 'is_running']);

            ! $this->modelDliderCampaign->create($data) && throw new \Exception('Houve um erro ao tentar criar a campanha.');

            return redirect()->back()->with('success', 'Campanha criada com sucesso.');

        } catch (\Exception $error) {
            return redirect()->back()->with('error', $error->getMessage());
        }
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
