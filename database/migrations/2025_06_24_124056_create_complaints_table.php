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
        Schema::create('complaints', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('name')->nullable(true);
            $table->string('email')->nullable(true);
            $table->string('tel')->nullable(true);
            $table->text('message');
            $table->string('subject');

            $table->unsignedBigInteger('photo_gallery_id')->nullable();

            $table->timestamps();
            $table->foreign('photo_gallery_id')->references('id')->on('photo_galleries')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('complaints');
    }
};
