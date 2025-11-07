<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('supplier_id')->constrained('users')->onDelete('cascade');
            $table->string('category_id');
            $table->string('name');
            $table->text('description');
            $table->decimal('price', 15, 2);
            $table->string('unit', 50); // kg, liter, pcs, dll
            $table->integer('stock')->default(0);
            $table->integer('min_order')->default(1);
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->json('images')->nullable(); // Array of image URLs
            $table->integer('view_count')->default(0);
            $table->integer('order_count')->default(0);
            $table->decimal('rating', 3, 2)->default(0.00);
            $table->integer('review_count')->default(0);
            $table->timestamps();
            $table->softDeletes();

            // Indexes
            $table->index('supplier_id');
            $table->index('category_id');
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};