<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Complaint extends Model
{
    protected static function booted()
    {
        static::creating(fn(Complaint $model) => $model->uuid = (string) Str::uuid());
    }
}
