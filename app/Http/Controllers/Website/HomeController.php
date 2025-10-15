<?php
namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use App\Models\SliderCampaign;
use Inertia\Response as InertiaResponse;

class HomeController extends Controller
{
    public function __construct(protected SliderCampaign $sliderCampaign, protected Slider $slider)
    {}

    public function index(): InertiaResponse
    {
        $sliders = [];

        if ($sliderCampaign = $this->sliderCampaign->where('is_running', true)->first()) {
            $sliders = $this->slider->whereIn('id', $sliderCampaign->sliders)->get();
        } else {
            $sliders = $this->slider->where('slider_active', true)->get();
        }

        return inertia('website/home/index', [
            'sliders' => $sliders,
        ]);
    }
}
