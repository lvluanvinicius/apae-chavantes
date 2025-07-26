<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SliderCampaign extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        "description",
        "is_running",
        "start_date",
        "end_date",
        "sliders",
    ];

    /**
     * @var array
     */
    protected $casts = [
        "is_running" => "boolean",
        "sliders"    => "array",
    ];

    protected static function booted()
    {
        static::creating(fn(SliderCampaign $model) => $model->uuid = (string) Str::uuid());
    }
}
