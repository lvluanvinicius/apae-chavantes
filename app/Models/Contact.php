<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Contact extends Model
{
    protected static function booted()
    {
        static::creating(fn(Contact $model) => $model->uuid = (string) Str::uuid());
    }
}
