<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TransparencyYear extends Model
{
    protected static function booted()
    {
        static::creating(fn(TransparencyYear $model) => $model->uuid = (string) Str::uuid());
    }
}
