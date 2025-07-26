<?php
namespace App\Http\Middleware;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = ['Desenvolvido por Luan Santos', 'Luan Santos'];

        /**
         * @var User|null
         */
        $user = $request->user();

        // ! $user ? $user->translate = 'pt-BR' : ['translate' => 'pt-BR'];
        if ($user) {$user->translate = 'pt-BR';} else {
            $user['translate'] = 'pt-BR';
        }

        return [
             ...parent::share($request),
            'name'        => config('app.name'),
            'quote'       => ['message' => trim($message), 'author' => trim($author)],
            'auth'        => [
                'user' => $user,
            ],
            'ziggy'       => fn(): array      => [
                 ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash'       => [
                'success' => $request->session()->get('success'),
                'error'   => $request->session()->get('error'),
            ],
        ];
    }
}
