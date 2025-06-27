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
        Schema::create('photo_galleries', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->string('gallery_name')->unique();
            $table->text('gallery_description');

            $table->string('gallery_hash');
            $table->string('gallery_size');
            $table->string('gallery_image');
            $table->string('gallery_format');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('photo_galleries');
    }
};
