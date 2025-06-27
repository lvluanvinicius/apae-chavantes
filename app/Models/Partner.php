<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Partner extends Model
{
    protected static function booted()
    {
        static::creating(fn(Partner $model) => $model->uuid = (string) Str::uuid());
    }
}
