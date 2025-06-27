<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TransparencyFolders extends Model
{
    protected static function booted()
    {
        static::creating(fn(TransparencyFolders $model) => $model->uuid = (string) Str::uuid());
    }
}
