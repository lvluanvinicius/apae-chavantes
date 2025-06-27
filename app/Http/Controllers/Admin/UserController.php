<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserCreateRequest;
use App\Http\Requests\Admin\UserUpdateRequest;
use App\Models\PermissionSection;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;

class UserController extends Controller
{
    public function __construct(protected User $modelUser, protected PermissionSection $modelPermissionSection)
    {}

    /**
     * Retorna o display de listagem.
     * @author Luan Santos <lvluansantos@gmail.com>
     * @param \Illuminate\Http\Request $request
     * @return InertiaResponse|\Inertia\ResponseFactory
     */
    public function index(Request $request): InertiaResponse
    {
        $search   = $request->has('search') ? $request->get('search') : 10;
        $paginate = $request->has('paginate') ? $request->get('paginate') : 10;

        // Recupera todas as permisões do sistema.
        $permissions = $this->modelPermissionSection->get();
        $permissions->load('permissions');

        $query = $this->modelUser->query();

        $users = $query->paginate($paginate);

        return inertia('user/index', ['data' => $users, 'permissions' => $permissions]);
    }

    /**
     * Cria um novo registro.
     * @author Luan Santos <lvluansantos@gmail.com>
     *
     * @param \App\Http\Requests\Admin\UserCreateRequest $request
     * @throws \Exception
     * @return RedirectResponse
     */
    public function store(UserCreateRequest $request): RedirectResponse
    {
        try {
            $data = $request->only([
                'email',
                'password',
                'name',
            ]);

            $created = $this->modelUser->create($data);
            if (! $created) {
                throw new \Exception("Houve um erro ao tentar criar o usuário.");
            }

            return to_route('admin.users.index')->with([
                'success' => 'Usuário criado com sucesso.',
            ]);
        } catch (\Exception $error) {
            return redirect()->back()->with([
                'error' => $error->getMessage(),
            ]);
        }
    }

    /**
     * Atualiza um registro.
     * @author Luan Santos <lvluansantos@gmail.com>
     * @param \App\Http\Requests\Admin\UserUpdateRequest $request
     * @param string $id
     * @throws \Exception
     * @return RedirectResponse
     */
    public function update(UserUpdateRequest $request, string $id): RedirectResponse
    {
        try {
            $user = $this->modelUser->where('id', $id)->first();

            if (! $user) {
                throw new \Exception("Usuário não encontrado.");
            }

            $data = $request->only([
                'email',
                'password',
                'name',
            ]);

            if (array_key_exists('password', $data) && $data['password'] == null) {
                unset($data['password']);
            }

            if (! $user->update($data)) {
                throw new \Exception("Houve um erro ao tentar atualizar o usuário.");
            }

            return redirect()->route('admin.users.index')->with([
                'success' => 'Usuário atualizado com sucesso.',
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
            if (! $user = $this->modelUser->where('id', $id)->first()) {
                throw new \Exception('Usuário não encontrado.');
            }

            ! $user->delete() && throw new \Exception('Houve um erro ao tentar excluír o usuário.');

            return to_route('admin.users.index')->with([
                'success' => 'Usuário excluído com sucesso.',
            ]);
        } catch (\Exception $error) {
            return redirect()->back()->with([
                'error' => $error->getMessage(),
            ]);
        }
    }
}
