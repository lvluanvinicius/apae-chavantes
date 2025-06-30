<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PhotoGalleryCreateRequest;
use App\Http\Requests\Admin\PhotoGalleryUpdateRequest;
use App\Models\DataTrash;
use App\Models\GalleryFile;
use App\Models\PhotoGallery;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Response as InertiaResponse;

class PhotoGalleryController extends Controller
{
    public function __construct(protected PhotoGallery $modelPhotoGallery, protected Setting $modelSetting, protected GalleryFile $modelGalleryFile)
    {}

    /**
     * Retorna display de listagem de registros.
     * @author Luan Santos <lvluansantos@gmail.com>
     * @param \Illuminate\Http\Request $request
     * @return InertiaResponse|\Inertia\ResponseFactory
     */
    public function index(Request $request): InertiaResponse
    {
        $search   = $request->has('search') ? $request->get('search') : 10;
        $paginate = $request->has('paginate') ? $request->get('paginate') : 10;

        $query = $this->modelPhotoGallery->query();

        $galleries = $query->paginate($paginate);
        return inertia('photo-gallery/index', ['data' => $galleries]);
    }

    /**
     * Cria um novo registro.
     * @author Luan Santos <lvluansantos@gmail.com>
     *
     * @param \App\Http\Requests\Admin\PhotoGalleryCreateRequest $request
     * @throws \Exception
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(PhotoGalleryCreateRequest $request): RedirectResponse
    {
        try {
            // Recuperando valores.
            $album = $request->only(['gallery_name', 'gallery_description']);
            $image = $request->file('cover'); # Recupera a imagem da capa.

            // Verificando se foi encaminhado um arquivo.
            if (! $request->hasFile('cover')) {
                throw new \Exception('Informe uma imagem.');
            }

            // Validando se é um arquivo.
            if (! $request->file('cover')->isValid()) {
                throw new \Exception('Informe uma imagem válida.');
            }

            $ext       = $image->getClientOriginalExtension();             # Recupera a extensão do arquivo.
            $imageName = explode('.', $image->getClientOriginalName())[0]; # Recupera o nome do arquivo enviado.
            $imageSize = $image->getSize();                                # Recupera o tamanho do arquivo.
            $imageType = $image->getType();                                # Recupera o tipo do arquivo.

            // Recuperando extensões aceitas.
            $imageExtensions = $this->modelSetting->where('setting_name', 'application_gallery_extensions')->first('setting_value');

            $validadeExt = array_filter(unserialize($imageExtensions->setting_value), function ($acceptExt) use ($ext) {
                if ($acceptExt == $ext) {
                    return true;
                }

                return false;
            });

            // Verifica se a extensão é válida.
            if (! $validadeExt) {
                throw new \Exception("Verifique a extensão do documento, são aceito apenas '" . join('|', unserialize($imageExtensions->setting_value)) . "'");
            }

            $hashString = "";
            $f          = true;
            while ($f) {
                $s         = $imageName . '-' . md5($imageName . rand(100, 1000000));      # Gerando a hash.
                $hashExits = $this->modelPhotoGallery->where('gallery_hash', $s)->first(); # Recupera se já existir para recriar.

                if (! $hashExits) {
                    $f          = false; # Altera a flag se a hash não existir.
                    $hashString = $s;    # Salvando a hash.
                }
            }

            $data = [
                "gallery_name"        => $album["gallery_name"],
                "gallery_description" => $album["gallery_description"],
                "gallery_hash"        => $hashString,
                "gallery_image"       => $hashString . "." . $ext,
                "gallery_size"        => $imageSize,
                "gallery_format"      => $imageType,
            ];

            DB::transaction(function () use ($data, $image) {
                // Salvando imagem.
                $data['gallery_image'] = $image->storeAs("gallery/" . (new \DateTime())->format('Ymd') . "/" . $data['gallery_image'], ['disk' => 'public']);

                $this->modelPhotoGallery->create($data);
            });

            return redirect()->route('admin.photo-gallery.index')->with([
                'error' => 'Galeria criada com sucesso.',
            ]);

        } catch (\Exception $error) {
            return redirect()->back()->with([
                'error' => $error->getMessage(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $uuid): RedirectResponse | InertiaResponse
    {
        try {
            // Recuperando Album.
            $gallery = $this->modelPhotoGallery->where('uuid', $uuid)->first();

            // Validando se encontrou o album para receber as imagens.
            if (! $gallery) {
                throw new \Exception('Não encontrado album para atualização.');
            }

            $gallery->load('files');

            return inertia('photo-gallery/show', ['data' => $gallery, 'csrf_token' => csrf_token()]);
        } catch (\Exception $error) {
            return redirect()->back()->with([
                'error' => $error->getMessage(),
            ]);
        }
    }

    /**
     * Atualiza um registro.
     * @author Luan Santos <lvluansantos@gmail.com>
     * @param \App\Http\Requests\Admin\PhotoGalleryUpdateRequest $request
     * @param string $id
     * @throws \Exception
     * @return RedirectResponse
     */
    public function update(PhotoGalleryUpdateRequest $request, string $id): RedirectResponse
    {
        try {
            // Recuperando Album.
            $gallery = $this->modelPhotoGallery->where('id', $id)->first();

            // Validando se encontrou o album para receber as imagens.
            if (! $gallery) {
                throw new \Exception('Não encontrado album para atualização.');
            }

            // Recuperando valores.
            $album = $request->only(['gallery_name', 'gallery_description']);
            $image = $request->file('cover'); # Recupera a imagem da capa.

            // Verificando se foi encaminhado um arquivo.
            if ($request->hasFile('cover')) {
                // Validando se é um arquivo.
                if (! $request->file('cover')->isValid()) {
                    throw new \Exception('Informe uma imagem válida.', 1101);
                }

                $ext       = $image->getClientOriginalExtension();             # Recupera a extensão do arquivo.
                $imageName = explode('.', $image->getClientOriginalName())[0]; # Recupera o nome do arquivo enviado.
                $imageSize = $image->getSize();                                # Recupera o tamanho do arquivo.
                $imageType = $image->getType();                                # Recupera o tipo do arquivo.

                // Recuperando extensões aceitas.
                $imageExtensions = $this->modelSetting->where('setting_name', 'application_gallery_extensions')->first('setting_value');

                $validadeExt = array_filter(unserialize($imageExtensions->setting_value), function ($acceptExt) use ($ext) {
                    if ($acceptExt == $ext) {
                        return true;
                    }

                    return false;
                });

                // Verifica se a extensão é válida.
                if (! $validadeExt) {
                    throw new \Exception("Verifique a extensão do documento, são aceito apenas '" . join('|', unserialize($imageExtensions->setting_value)) . "'");
                }

                // Gerando Hash para a imagem do album.
                $hashString = "";
                $f          = true;
                while ($f) {
                    $s         = $imageName . '-' . md5($imageName . rand(100, 1000000));      # Gerando a hash.
                    $hashExits = $this->modelPhotoGallery->where('gallery_hash', $s)->first(); # Recupera se já existir para recriar.

                    if (! $hashExits) {
                        $f          = false; # Altera a flag se a hash não existir.
                        $hashString = $s;    # Salvando a hash.
                    }
                }

                // Salva o nome anttigo da imagem para assim excluir.
                $beforeNameFile = $gallery->gallery_image;

                $data = [
                    "gallery_name"        => $album["gallery_name"],
                    "gallery_description" => $album["gallery_description"],
                    "gallery_hash"        => $hashString,
                    "gallery_image"       => $hashString . "." . $ext,
                    "gallery_size"        => $imageSize,
                    "gallery_format"      => $imageType,
                ];

                DB::transaction(function () use ($data, $image, $gallery, $beforeNameFile) {
                    // Remover imagem anterior.
                    $disk = Storage::disk('public');
                    if ($disk->exists($beforeNameFile)) {
                        $disk->delete($beforeNameFile);
                    }

                    // Salvando imagem.
                    $data['gallery_image'] = $image->storeAs("gallery/" . (new \DateTime())->format('Ymd') . "/" . $data['gallery_image'], ['disk' => 'public']);

                    $gallery->update($data);
                });

                // return redirect()->route('admin.photo-gallery.index')

                return redirect()->back()->with([
                    'success' => 'Album atualizado com sucesso.',
                ]);
            }

            // Atualizando album.
            ! $gallery->update(['gallery_name' => $album['gallery_name'], 'gallery_description' => $album['gallery_description']])
            && throw new \Exception('Houve um erro ao tentar atualizar esse album.');

            // return redirect()->route('admin.photo-gallery.index')->with([
            //     'success' => 'Album atualizado com sucesso.',
            // ]);

            return redirect()->back()->with([
                'success' => 'Album atualizado com sucesso.',
            ]);
        } catch (\Exception $error) {
            return redirect()->back()->with([
                'error' => $error->getMessage(),
            ]);
        }
    }

    /**
     * Remove um registro.
     * @author Luan Santos <lvluansantos@gmail.com>
     * @param string $id
     * @throws \Exception
     * @return RedirectResponse
     */
    public function destroy(string $id): RedirectResponse
    {
        try {
            // Recuperando Album.
            $gallery = $this->modelPhotoGallery->where('id', $id)->first();

            // Validando se encontrou o album para receber as imagens.
            if (! $gallery) {
                throw new \Exception('Não encontrado album para atualização.');
            }

            $gallery->files->count() > 0 && throw new \Exception('A Galeria possui imagens e não pode ser excluída.');

            DB::transaction(function () use ($gallery) {

                $fileName = $gallery->gallery_image;

                $gallery->delete();

                // Remover imagem anterior.
                $disk = Storage::disk('public');
                $disk->delete($fileName);

            });

            return redirect()->route('admin.photo-gallery.index')->with([
                'success' => 'Album atualizado com sucesso.',
            ]);

        } catch (\Exception $error) {
            return redirect()->back()->with([
                'error' => $error->getMessage(),
            ]);
        }
    }


}
