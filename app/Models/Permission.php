<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Permission extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['description', 'permission', 'permission_section_id'];

    public function section(): BelongsTo
    {
        return $this->belongsTo(PermissionSection::class, 'id', 'permission_section_id');
    }
}
