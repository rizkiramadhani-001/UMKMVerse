<?php
// Migration corrected: added user_id foreignId, timestamps, and down() method

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('umkm', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('namaUmkm')->nullable();
            $table->string('nib')->nullable();
            $table->string('bidangUsaha')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('website')->nullable();
            $table->string('lokasiUsaha')->nullable();
            $table->text('alamatLengkap')->nullable();
            $table->text('deskripsiSingkat')->nullable();
            $table->longText('deskripsiLengkap')->nullable();
            $table->longText('visiMisi')->nullable();
            $table->string('targetPasar')->nullable();
            $table->text('keunggulanProduk')->nullable();
            $table->string('videoPitchUrl')->nullable();
            $table->decimal('minInvestasi', 15, 2)->nullable();
            $table->decimal('targetInvestasi', 15, 2)->nullable();
            $table->string('logo')->nullable(); // usually file path or URL
            $table->json('fotoProduk')->nullable(); // store multiple photo URLs as JSON
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('umkm');
    }
};
