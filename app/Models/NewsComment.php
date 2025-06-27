<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class NewsComment extends Model
{
    protected static function booted()
    {
        static::creating(fn(NewsComment $model) => $model->uuid = (string) Str::uuid());
    }
}
