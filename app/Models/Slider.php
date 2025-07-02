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
        "slider_hash",
        "slider_images",
        "slider_active",
    ];

    protected $casts = [
        'slider_images' => 'array',
        'slider_active' => 'boolean',
    ];

    protected static function booted()
    {
        static::creating(fn(Slider $model) => $model->uuid = (string) Str::uuid());
    }

}
