<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Response as InertiaResponse;
use Intervention\Image\ImageManager;

class SliderController extends Controller
{
    public function __construct(protected Slider $modelSlider)
    {}

    /**
     * Retorna listagem de todos os registros.
     * @author Luan Santos <lvluansantos@gmail.com>
     *
     * @param Request $request
     * @return InertiaResponse
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
            'data' => $data,
        ]);
    }

    /**
     * Retorna os sliders em formato json.
     * @author Luan Santos <lvluansantos@gmail.com>
     *
     * @return JsonResponse
     */
    public function slidersJson(): JsonResponse
    {
        $data = $this->modelSlider->paginate(10);

        return $this->successResponse($data, 'Sliders recuperados com sucesso.');
    }

    /**
     * Cria um novo registro.
     * @author Luan Santos <lvluansantos@gmail.com>
     *
     * @param Request $request
     * @return RedirectResponse
     * @throws Exception
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        try {

            $image = $request->file('image');
            $ext   = $image->getClientOriginalExtension();

            $uuid         = (string) Str::uuid();
            $hash         = 'slider-' . md5($uuid . now());
            $folder       = now()->format('Ymd');
            $baseFilename = "$hash";
            $paths        = [];

            $manager = ImageManager::gd();
            $img     = $manager->read($image->getPathname());

            $sizes = [
                'original'    => fn($img)    => $img,
                '1920x600'    => fn($img)    => $img->cover(1920, 600),
                '1024x300'    => fn($img)    => $img->cover(1024, 300),
                'mobile-768x' => fn($img) => $img->scale(width: 768),
            ];

            DB::transaction(function () use ($sizes, $paths, $img, $baseFilename, $ext, $folder, $hash) {
                foreach ($sizes as $suffix => $fn) {
                    $processed = $fn(clone $img);
                    $filename  = $suffix === 'original'
                    ? "{$baseFilename}.{$ext}"
                    : "{$baseFilename}-{$suffix}.{$ext}";

                    $path = "sliders/{$folder}/{$filename}";
                    Storage::disk('public')->put($path, $processed->encode());

                    $paths[$suffix] = $path;
                }

                $this->modelSlider->create([
                    'slider_hash'   => $hash,
                    'slider_images' => $paths,
                    'slider_active' => false,
                ]);
            });

            return redirect()->back()->with('success', 'Slider criado com sucesso.');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Atualiza um registro.
     * @author Luan Santos <lvluansantos@gmail.com>
     *
     * @param Request $request
     * @param string $id
     * @return RedirectResponse
     * @throws Exception
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        try {
            if (! $slider = $this->modelSlider->where('id', $id)->first()) {
                throw new \Exception('Slider não encontrado.');
            }

            $image = $request->file('image');
            $ext   = $image->getClientOriginalExtension();

            $uuid         = (string) Str::uuid();
            $hash         = 'slider-' . md5($uuid . now());
            $folder       = now()->format('Ymd');
            $baseFilename = "$hash";
            $paths        = [];

            $manager = ImageManager::gd();
            $img     = $manager->read($image->getPathname());

            $sizes = [
                'original'    => fn($img)    => $img,
                '1920x600'    => fn($img)    => $img->cover(1920, 600),
                '1024x300'    => fn($img)    => $img->cover(1024, 300),
                'mobile-768x' => fn($img) => $img->scale(width: 768),
            ];

            // Iniciando transação de atualização das imagens.
            DB::transaction(function () use ($slider, $sizes, $paths, $img, $baseFilename, $ext, $folder, $hash) {
                // Remover imagem anterior.
                $disk = Storage::disk('public');

                // Removendo imagens anteriores.
                foreach ($slider->slider_images as $imagePathRemove) {
                    if ($disk->exists($imagePathRemove)) {
                        $disk->delete($imagePathRemove);
                    }
                }

                // Salvando novas imagens ao path.
                foreach ($sizes as $suffix => $fn) {
                    $processed = $fn(clone $img);
                    $filename  = $suffix === 'original'
                    ? "{$baseFilename}.{$ext}"
                    : "{$baseFilename}-{$suffix}.{$ext}";

                    $path = "sliders/{$folder}/{$filename}";
                    Storage::disk('public')->put($path, $processed->encode());

                    $paths[$suffix] = $path;
                }

                $slider->update([
                    'slider_hash'   => $hash,
                    'slider_images' => $paths,
                ]);
            });

            return redirect()->back()->with('success', 'Slider atualizado com sucesso.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Ativa e desativa o status de exibição do slider.
     * @author Luan Santos <lvluansantos@gmail.com>
     *
     * @param string $id
     * @return RedirectResponse
     * @throws Exception
     */
    public function activeAndInactive(string $id): RedirectResponse
    {
        try {
            // Recuperar slider.
            if (! $slider = $this->modelSlider->where('id', $id)->first()) {
                throw new \Exception('Slider não encontrado.');
            }

            $slider->update(['slider_active' => ! $slider->slider_active]);

            return redirect()->back()->with('success', 'Status do slider alterado com sucesso.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Exclui um registro.
     * @author Luan Santos <lvluansantos@gmail.com>
     *
     * @param string $id
     * @return RedirectResponse
     * @throws Exception
     */
    public function destroy(string $id): RedirectResponse
    {
        try {
            // Recuperar slider.
            if (! $slider = $this->modelSlider->where('id', $id)->first()) {
                throw new \Exception('Slider não encontrado.');
            }

            # Excluír registro e imagens.
            DB::transaction(function () use ($slider) {
                // Remover imagem anterior.
                $disk = Storage::disk('public');

                // Removendo imagens anteriores.
                foreach ($slider->slider_images as $imagePathRemove) {
                    if ($disk->exists($imagePathRemove)) {
                        $disk->delete($imagePathRemove);
                    }
                }

                $slider->delete();
            });

            return redirect()->back()->with('success', 'Slider excluído com sucesso.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
