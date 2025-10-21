<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Distributor extends Model
{
    protected $table = 'distributors';

    protected $fillable = [
        'user_id',
        'thumbnail',
        'name',
        'description',
        'video_profile_url',
        'pdf_url',
    ];

    protected $casts = [
        'user_id' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
