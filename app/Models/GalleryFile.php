<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class GalleryFile extends Model
{
    protected static function booted()
    {
        static::creating(fn(GalleryFile $model) => $model->uuid = (string) Str::uuid());
    }
}
