<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Setting extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'setting_name',
        'setting_value',
        'setting_type',
    ];

    protected static function booted()
    {
        static::creating(fn(Setting $model) => $model->uuid = (string) Str::uuid());
    }
}
