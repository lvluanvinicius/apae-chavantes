<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class PhotoGallery extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['gallery_name', 'gallery_description', 'gallery_hash', 'gallery_size', 'gallery_image', 'gallery_format'];

    protected static function booted()
    {
        static::creating(fn(PhotoGallery $model) => $model->uuid = (string) Str::uuid());
    }

    public function files(): HasMany
    {
        return $this->hasMany(GalleryFile::class, 'photo_gallery_id');
    }
}
