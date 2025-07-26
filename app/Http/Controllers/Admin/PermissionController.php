<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PermissionUpdateRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

class PermissionController extends Controller
{
    public function __construct(protected User $modelUser)
    {}

    /**
     * Atualiza as permissões de um usuário.
     * @author Luan Santos <lvluansantos@gmail.com>
     *
     * @param PermissionUpdateRequest $request
     * @param string $id
     * @return RedirectResponse
     */
    public function update(PermissionUpdateRequest $request, string $id): RedirectResponse
    {
        try {
            if (! $user = $this->modelUser->where('id', $id)->first()) {
                throw new \Exception('Usuário não encontrado.');
            }

            // Converte array de permissçoes para JSON.
            $user->permissions = json_encode($request->permissions);

            ! $user->update() && throw new \Exception('Houve um erro ao tentar atualizar as permissões do usuário.');

            return redirect()->route('admin.users.index')->with([
                'success' => 'Permissões atualizadas com sucesso.',
            ]);
        } catch (\Exception $error) {
            return redirect()->back()->with([
                'error' => $error->getMessage(),
            ])->withInput();
        }
    }
}
