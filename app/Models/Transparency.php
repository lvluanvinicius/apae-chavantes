<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Transparency extends Model
{
    protected static function booted()
    {
        static::creating(fn(Transparency $model) => $model->uuid = (string) Str::uuid());
    }
}
