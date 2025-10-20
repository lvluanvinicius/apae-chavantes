<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transparency extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'name',
        'size',
        'type',
        'mime_type',
        'ext',
        'is_folder',
        'parent_id',
        'user_id',
        'disk',
    ];

    protected static function booted()
    {
        static::creating(fn(Transparency $model) => $model->uuid = (string) \Illuminate\Support\Str::uuid());
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Transparency::class, 'parent_id');
    }

    /**
     * Configura o caminho do arquivo.
     * @author Luan Santos <lvluansantos@gmail.com>
     *     */
    public function getPathToRootAttribute()
    {
        $path    = collect();
        $current = $this;

        while ($current->parent) {
            $path->prepend($current->parent);
            $current = $current->parent;
        }

        return $path;
    }
}
