<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class DonateNow extends Model
{
    protected static function booted()
    {
        static::creating(fn(DonateNow $model) => $model->uuid = (string) Str::uuid());
    }
}
