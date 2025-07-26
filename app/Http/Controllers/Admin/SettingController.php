<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function __construct(protected Setting $modelSetting)
    {

    }

    /**
     * Retorna display de listagem.
     * @author Luan Santos <lvluansantos@gmail.com>
     *
     * @param Request $request
     * @return void
     */
    public function index(Request $request)
    {
        $search   = $request->has('search') ? $request->get('search') : 10;
        $paginate = $request->has('paginate') ? $request->get('paginate') : 10;

        $setting = $this->modelSetting->query();

        $data = $setting->paginate($paginate);

        return inertia('application/settings/index', ['data' => $data]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        try {
            //

            return to_route('admin.settings.index')->with([
                'success' => 'Configuração criada com sucesso.',
            ]);
        } catch (\Exception $error) {
            return redirect()->back()->with([
                'error' => $error->getMessage(),
            ]);
        }
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
