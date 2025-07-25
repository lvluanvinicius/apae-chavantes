<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class MoveDataTrashController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        $request->validate([
            'data' => 'required|array',
            'dst_type',
        ]);

        try {
            dd($request->data);

            return redirect()->back()->with('success', 'Item movido com sucesso.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
