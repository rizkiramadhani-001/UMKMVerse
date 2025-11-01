<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender',
        'reciever',
        'produk',
        'jumlah',
        'status',
        'catatan',
    ];

    public function umkm()
    {
        return $this->belongsTo(User::class, 'umkm_id');
    }

    public function supplier()
    {
        return $this->belongsTo(User::class, 'supplier_id');
    }
}
