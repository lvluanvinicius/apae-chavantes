<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SliderCampaignCreateRequest;
use App\Http\Requests\Admin\SliderCampaignUpdateRequest;
use App\Models\SliderCampaign;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SliderCampaignController extends Controller
{
    public function __construct(protected SliderCampaign $modelSliderCampaign)
    {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $search = $request->input('search', ''); // valor padrão: string vazia

        $query = $this->modelSliderCampaign->newQuery();

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
     * Store a newly created resource in storage.
     */
    public function store(SliderCampaignCreateRequest $request): JsonResponse
    {
        try {
            $data = $request->only(['description', 'start_date', 'end_date', 'is_running']);

            // Limpando datas.
            $data['start_date'] = str_replace(' às ', ' ', $data['start_date']);
            $data['end_date']   = str_replace(' às ', ' ', $data['end_date']);

            // Transformando em timestamp e comparando se data de inicio é menor que data final.
            $startDate = Carbon::createFromFormat('d/m/Y H:i:s', $data['start_date']);
            $endDate   = Carbon::createFromFormat('d/m/Y H:i:s', $data['end_date']);
            if ($startDate->timestamp >= $endDate->timestamp) {
                return $this->errorResponse('A data de início deve ser menor que a data final.', 400);
            }

            $data['start_date'] = $startDate->format('Y-m-d H:i:s');
            $data['end_date']   = $endDate->format('Y-m-d H:i:s');

            if (! $this->modelSliderCampaign->create($data)) {
                return $this->errorResponse('Houve um erro ao tentar criar a campanha.', 400);
            }

            return $this->successResponse([], 'Campanha criada com sucesso.');

        } catch (\Exception $error) {
            return $this->errorResponse($error->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if (! $campaign = $this->modelSliderCampaign->where('id', $id)->first()) {
            return $this->errorResponse('Campanha não encontrada.', 404);
        }

        return $this->successResponse($campaign, 'Campanha recuperada com sucesso.');
    }

    /**
     * Atualiza um registro.
     * @author Luan Santos <lvluansantos@gmail.com>
     * @param \App\Http\Requests\Admin\SliderCampaignUpdateRequest $request
     * @param string $id
     * @return JsonResponse
     */
    public function update(SliderCampaignUpdateRequest $request, string $id): JsonResponse
    {
        try {
            $data = $request->only(['description', 'start_date', 'end_date', 'is_running']);

            if (! $campaign = $this->modelSliderCampaign->where('id', $id)->first()) {
                return $this->errorResponse('Campanha não encontrada.', 404);
            }

            // Limpando datas.
            $data['start_date'] = str_replace(' às ', ' ', $data['start_date']);
            $data['end_date']   = str_replace(' às ', ' ', $data['end_date']);

            // Transformando em timestamp e comparando se data de inicio é menor que data final.
            $startDate = Carbon::createFromFormat('d/m/Y H:i:s', $data['start_date']);
            $endDate   = Carbon::createFromFormat('d/m/Y H:i:s', $data['end_date']);
            if ($startDate->timestamp >= $endDate->timestamp) {
                return $this->errorResponse('A data de início deve ser menor que a data final.', 400);
            }

            $data['start_date'] = $startDate->format('Y-m-d H:i:s');
            $data['end_date']   = $endDate->format('Y-m-d H:i:s');

            if (! $campaign->update($data)) {
                return $this->errorResponse('Houve um erro ao tentar atualizar a campanha.', 400);
            }

            return $this->successResponse([], 'Campanha atualizada com sucesso.');

        } catch (\Exception $error) {
            return $this->errorResponse($error->getMessage(), 500);
        }
    }

    /**
     * @exclui um registro.
     * @author Luan Santos <lvluansantos@gmail.com>
     * @param string $id
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            if (! $campaign = $this->modelSliderCampaign->where('id', $id)->first()) {
                return $this->errorResponse('Campanha não encontrada.', 404);
            }

            if ($campaign->delete()) {
                return $this->errorResponse('Houve um erro ao tentar excluír a campanha.', 400);
            }

            return $this->successResponse([], 'Campanha excluída com sucesso.');
        } catch (\Exception $error) {
            return $this->errorResponse($error->getMessage(), 500);
        }
    }
}
