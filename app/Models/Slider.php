<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Slider extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        "sliders_hash",
        "sliders_size",
        "sliders_image",
        "sliders_format",
        "sliders_active",
    ];

    protected static function booted()
    {
        static::creating(fn(Slider $model) => $model->uuid = (string) Str::uuid());
    }
}
