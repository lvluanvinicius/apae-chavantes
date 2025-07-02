<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
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
    public function store(Request $request): RedirectResponse
    {
        try {
            $request->validate([
                'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:10240',
            ]);

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
                    'slider_active' => true,
                ]);
            });

            return redirect()->back()->with('success', 'Slider criado com sucesso.');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erro ao criar slider: ' . $e->getMessage());
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
