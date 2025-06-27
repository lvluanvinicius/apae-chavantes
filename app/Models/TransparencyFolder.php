<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TransparencyFolder extends Model
{
    protected static function booted()
    {
        static::creating(fn(TransparencyFolder $model) => $model->uuid = (string) Str::uuid());
    }
}
