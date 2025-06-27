<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PermissionSection extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['title', 'type'];

    public function permissions(): HasMany
    {
        return $this->hasMany(Permission::class, 'permission_section_id');
    }
}
