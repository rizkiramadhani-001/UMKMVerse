<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sender')->constrained('users')->onDelete('cascade');
            $table->foreignId('reciever')->constrained('users')->onDelete('cascade');
            $table->string('produk');
            $table->integer('jumlah');
            $table->enum('status', ['Pending', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan'])->default('Pending');
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
