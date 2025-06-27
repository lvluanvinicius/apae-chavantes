<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Setting extends Model
{
    protected static function booted()
    {
        static::creating(fn(Setting $model) => $model->uuid = (string) Str::uuid());
    }
}
