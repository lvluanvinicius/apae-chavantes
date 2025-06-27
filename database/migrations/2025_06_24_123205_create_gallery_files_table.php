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
        Schema::create('gallery_files', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->unsignedBigInteger('photo_gallery_id');

            $table->string('filename');
            $table->string('hash');

            $table->string('type_file');
            $table->string('size_file');

            $table->timestamps();

            $table->foreign('photo_gallery_id')->references('id')->on('photo_galleries')->onDelete('RESTRICT');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gallery_files');
    }
};
