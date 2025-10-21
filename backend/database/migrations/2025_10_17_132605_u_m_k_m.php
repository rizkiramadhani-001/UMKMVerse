<?php
// Migration corrected: added user_id foreignId, timestamps, and down() method

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
        Schema::create("umkm", function (Blueprint $table) {
            $table->id();
            // user_id column + foreign key
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string("thumbnail");
            $table->string("name");
            $table->text("description");
            $table->string("video_profile_url");
            $table->string("pdf_url");
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
