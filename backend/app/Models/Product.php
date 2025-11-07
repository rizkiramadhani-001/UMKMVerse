<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'supplier_id',
        'category_id',
        'name',
        'description',
        'price',
        'unit',
        'stock',
        'min_order',
        'status',
        'images',
        'view_count',
        'order_count',
        'rating',
        'review_count',
    ];

    protected $casts = [
        'images' => 'array',
        'price' => 'decimal:2',
        'rating' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $appends = [
        'formatted_price',
        'is_low_stock',
        'image_urls',
    ];

    // Relationships
    public function supplier()
    {
        return $this->belongsTo(User::class, 'supplier_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function wishlists()
    {
        return $this->hasMany(Wishlist::class);
    }

    // Accessors
    public function getFormattedPriceAttribute()
    {
        return 'Rp ' . number_format($this->price, 0, ',', '.');
    }

    public function getIsLowStockAttribute()
    {
        return $this->stock > 0 && $this->stock <= 10;
    }

    public function getImageUrlsAttribute()
    {
        if (!$this->images || count($this->images) === 0) {
            return [];
        }

        return array_map(function ($image) {
            if (filter_var($image, FILTER_VALIDATE_URL)) {
                return $image;
            }
            return Storage::url($image);
        }, $this->images);
    }

    public function getFirstImageAttribute()
    {
        $urls = $this->image_urls;
        return count($urls) > 0 ? $urls[0] : null;
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeInStock($query)
    {
        return $query->where('stock', '>', 0);
    }

    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    public function scopeBySupplier($query, $supplierId)
    {
        return $query->where('supplier_id', $supplierId);
    }

    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%");
        });
    }

    public function scopePriceRange($query, $minPrice, $maxPrice)
    {
        if ($minPrice) {
            $query->where('price', '>=', $minPrice);
        }
        if ($maxPrice) {
            $query->where('price', '<=', $maxPrice);
        }
        return $query;
    }

    public function scopePopular($query)
    {
        return $query->orderBy('order_count', 'desc');
    }

    public function scopeTopRated($query)
    {
        return $query->where('review_count', '>', 0)
                     ->orderBy('rating', 'desc');
    }

    // Methods
    public function incrementViewCount()
    {
        $this->increment('view_count');
    }

    public function updateStock($quantity)
    {
        $this->stock -= $quantity;
        $this->save();
    }

    public function isAvailable($quantity = null)
    {
        if ($this->status !== 'active') {
            return false;
        }

        if ($quantity) {
            return $this->stock >= $quantity && $quantity >= $this->min_order;
        }

        return $this->stock > 0;
    }

    public function calculateRating()
    {
        $avgRating = $this->reviews()->avg('rating');
        $reviewCount = $this->reviews()->count();

        $this->update([
            'rating' => $avgRating ?? 0,
            'review_count' => $reviewCount,
        ]);
    }
}