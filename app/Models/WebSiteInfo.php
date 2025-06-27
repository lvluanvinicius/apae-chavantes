<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class WebSiteInfo extends Model
{
    protected static function booted()
    {
        static::creating(fn(WebSiteInfo $model) => $model->uuid = (string) Str::uuid());
    }
}
