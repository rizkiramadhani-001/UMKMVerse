<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    protected $fillable = [
        'user_id',
        'contract_number',
        'type',
        'partner_name',
        'partner_email',
        'partner_type',
        'amount',
        'expiry_date',
        'description',
        'file_path',
        'contract_url',
        'open_sign_doc_id',
        'status',
    ];

    protected $casts = [
        'expiry_date' => 'date',
        'amount' => 'decimal:2',
    ];
}
