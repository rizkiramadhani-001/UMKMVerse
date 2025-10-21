<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class UMKM extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'umkm';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'thumbnail',
        'name',
        'description',
        'video_profile_url',
        'pdf_url',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'user_id' => 'integer',
    ];

    /**
     * Get the owner (user) of the UMKM.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
