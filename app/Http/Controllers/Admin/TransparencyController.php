<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transparency;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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

        return inertia('transparency/index', [
            'breadcrumbs' => $breadcrumbs, 'data' => $data, 'uuid' => $uuid,
        ]);
    }

    /**
     * Cria um novo arquivo e um novo registro de diretório.
     * @author Luan Santos <lvluansantos@gmail.com>
     * @param \Illuminate\Http\Request $request
     * @param string|null $uuid
     * @return RedirectResponse
     */
    public function store(Request $request, string | null $uuid = null): RedirectResponse
    {
        // ID do usuário
        $userId = $request->user()->id;

        // Pasta atual (se o UUID apontar para pasta)
        $currentFolder = $this->transparency
            ->where('uuid', $uuid)
            ->where('is_folder', 'Y')
            ->first();

        // =================== ARQUIVOS (MÚLTIPLOS) ===================
        if ($request->isFile === 'S') {
            // 1. MUDANÇA: Ajuste na validação para aceitar um array de arquivos
            $request->validate([
                'isFile'  => 'required',
                'files'   => 'required|array',                  // Garante que 'files' é um array
                'files.*' => ['required', 'file', 'max:10240'], // Valida CADA arquivo no array
            ]);

            try {
                /** @var UploadedFile[] $files */
                $files = $request->file('files');

                // Disco e diretório padronizados
                $disk = config('files.transparency_disk', 'public');
                $dir  = 'uploads/transparencies';

                // 2. MUDANÇA: Arrays para armazenar dados para inserção em massa e rollback
                $filesData   = [];
                $storedPaths = [];

                // 3. MUDANÇA: Loop para processar cada arquivo
                foreach ($files as $file) {
                    // Nome físico único + upload
                    $filename      = (string) Str::uuid() . '.' . $file->getClientOriginalExtension();
                    $storedPath    = $file->storeAs($dir, $filename, $disk);
                    $storedPaths[] = $storedPath; // Guarda o caminho para possível rollback

                    // Deriva metadados SOMENTE do arquivo
                    $originalName = $file->getClientOriginalName();
                    $displayName  = Str::limit(trim(pathinfo($originalName, PATHINFO_FILENAME)), 255, '');

                    // Monta o array de dados para este arquivo
                    $filesData[] = [
                        'name'       => $originalName,
                        'is_folder'  => 'N',
                        'user_id'    => $userId,
                        'parent_id'  => $currentFolder->id ?? null,
                        'path'       => $storedPath,
                        'size'       => $file->getSize(),
                        'mime_type'  => $file->getClientMimeType(),
                        'ext'        => $file->getClientOriginalExtension(),
                        'disk'       => $disk,
                        'uuid'       => (string) Str::uuid(),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }

                // 4. MUDANÇA: Transação e inserção em massa
                DB::beginTransaction();
                try {
                    // Muito mais performático que um create() dentro do loop
                    $this->transparency->insert($filesData);
                    DB::commit();
                } catch (\Throwable $e) {
                    DB::rollBack();
                    // 5. MUDANÇA: Deleta todos os arquivos que foram salvos no disco
                    Storage::disk($disk)->delete($storedPaths);
                    throw $e;
                }

                $message = 'Arquivos criados com sucesso.';
            } catch (\Exception $error) {
                // Se qualquer erro ocorrer (validação, upload, etc.)
                return redirect()->back()->with('error', 'Ocorreu um erro: ' . $error->getMessage());
            }

            // =================== PASTA (LÓGICA INALTERADA) ===================
        } else {
            $request->validate([
                'name'   => 'required|string|max:255',
                'isFile' => 'required',
            ]);

            try {
                $data = [
                    'name'      => $request->name,
                    'user_id'   => $userId,
                    'is_folder' => 'Y',
                    'path'      => null,
                    'parent_id' => $currentFolder->id ?? null,
                ];

                $this->transparency->create($data);
                $message = 'Pasta criada com sucesso.';
            } catch (\Exception $error) {
                return redirect()->back()->with('error', 'Ocorreu um erro ao criar a pasta: ' . $error->getMessage());
            }
        }

        // Redireciona para a visão correta
        $route = $uuid ?
        route('admin.transparency.index', ['uuid' => $uuid]) :
        route('admin.transparency.index');

        return redirect($route)->with('success', $message);
    }

    /**
     * Atualiza um registro.
     * @author Luan Santos <lvluansantos@gmail.com>
     *
     *
     * @param \Illuminate\Http\Request $request
     * @param string $uuid
     * @param string|null $parent
     * @throws \Exception
     * @return RedirectResponse
     */
    public function update(Request $request, string $uuid, string | null $parent = null): RedirectResponse
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
            ]);

            if (! $file = $this->transparency->where('uuid', $uuid)->first()) {
                throw new \Exception('Arquivo não encontrado.');
            }

            if (! $file->update(['name' => $request->name])) {
                throw new \Exception('Houve um erro ao editar os registros em banco.');
            }

            if ($parent) {
                $message = ($file->is_folder == 'Y' ? 'Pasta' : 'Arquivo') . " atualiz" . ($file->is_folder == 'Y' ? 'a' : 'o') . " com sucesso.";
                return redirect()->route('admin.transparency.index', ['uuid' => $parent])->with('success', $message);
            }

            $message = ($file->is_folder == 'Y' ? 'Pasta' : 'Arquivo') . " atualiz" . ($file->is_folder == 'Y' ? 'a' : 'o') . " com sucesso.";

            return redirect()->route('admin.transparency.index')->with('success', $message);
        } catch (\Exception $error) {
            return redirect()->back()->with('error', $error->getMessage());
        }
    }

    public function destroy(string $uuid, string | null $parent = null): RedirectResponse
    {
        try {
            if (! $file = $this->transparency->where('uuid', $uuid)->first()) {
                throw new \Exception('Arquivo não encontrado.');
            }

            $data['path'] = $file->is_folder == 'N' ? $file->path : null;
            $isFolder     = $file->is_folder;

            if (! $file->delete()) {
                throw new \Exception('Houve um erro ao tentar excluír o arquivo.');
            }

            if ($parent) {
                $message           = ($isFolder == 'Y' ? 'Pasta' : 'Arquivo') . " excluíd" . ($isFolder == 'Y' ? 'a' : 'o') . " com sucesso.";
                $data['parent_id'] = $parent;
                return redirect()->route('admin.transparency.index', ['uuid' => $parent])->with('success', $message);
            }

            $message = ($isFolder == 'Y' ? 'Pasta' : 'Arquivo') . " excluíd" . ($isFolder == 'Y' ? 'a' : 'o') . " com sucesso.";
            return redirect()->route('admin.transparency.index')->with('success', $message);
        } catch (\Exception $error) {
            $errorMessage = $error->getMessage();

            $error->getCode() == '23000' && $errorMessage = "Não é possível excluir o arquivo, pois ele está vinculado a outro registro.";

            return redirect()->back()->with('error', $errorMessage);
        }
    }

}
