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
        Schema::create('data_trashes', function (Blueprint $table) {
            $table->id();

            $table->enum('dst_type', [
                'gallery',
                'gallery-images',
                'transparency',
                'transparency-years',
                'transparency-folders',
                'partners',
                'news',
                'news_comments',
                'contacts',
                'complaints',
            ]);
            $table->longText('content');
            $table->timestamp('deletion_date');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_trashes');
    }
};
