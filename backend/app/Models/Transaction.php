<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'trx_id',
        'type',
        'description',
        'category',
        'amount',
        'date',
        'notes',
        'umkm_id',
    ];
}
