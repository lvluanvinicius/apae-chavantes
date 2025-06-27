<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class GalleryFile extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['photo_gallery_id', 'filename', 'path', 'size_file', 'hash', 'type_file', 'width', 'height'];

    protected static function booted()
    {
        static::creating(fn(GalleryFile $model) => $model->uuid = (string) Str::uuid());
    }

    public function gallery()
    {
        return $this->belongsTo(PhotoGallery::class, 'photo_gallery_id');
    }
}
