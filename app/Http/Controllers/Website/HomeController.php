<?php
namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use Inertia\Response as InertiaResponse;

class HomeController extends Controller
{
    public function index(): InertiaResponse
    {
        return inertia('website/home/index');
    }
}
