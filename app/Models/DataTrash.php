<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * dst_type: gallery
 *           gallery-images
 *           transparency
 *           transparency-years
 *           transparency-folders
 *           partners
 *           news
 *           news_comments
 *           contacts
 *           complaints
 * deletion_date: Recupera a data de 30 dias após inserir o item na lixeira.
 * content: Guarda um json com todos os dados do modelo excluído.
 */
class DataTrash extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['dst_type', 'content', 'deletion_date'];

    protected static function booted()
    {
        static::creating(fn(DataTrash $model) => $model->deletion_date = now()->addDays(30));
    }
}
