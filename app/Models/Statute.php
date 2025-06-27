<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Statute extends Model
{
    protected static function booted()
    {
        static::creating(fn(Statute $model) => $model->uuid = (string) Str::uuid());
    }
}
