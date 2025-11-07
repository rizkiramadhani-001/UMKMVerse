<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('contract_number')->unique();
            $table->enum('type', ['investment', 'supplier', 'distributor']);
            $table->string('partner_name');
            $table->string('partner_email');
            $table->enum('partner_type', ['investor', 'supplier', 'distributor']);
            $table->decimal('amount', 20, 2)->default(0);
            $table->date('expiry_date')->nullable();
            $table->text('description');
            $table->string('file_path')->nullable(); // local file url
            $table->string('contract_url')->nullable(); // external download URL (OpenSign)
            $table->string('open_sign_doc_id')->nullable(); // ID returned by OpenSign API
            $table->enum('status', ['pending', 'signed', 'expired', 'cancelled'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
