<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class News extends Model
{
    protected static function booted()
    {
        static::creating(fn(News $model) => $model->uuid = (string) Str::uuid());
    }
}
