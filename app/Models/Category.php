<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    protected static function booted()
    {
        static::creating(fn(Category $model) => $model->uuid = (string) Str::uuid());
    }
}
