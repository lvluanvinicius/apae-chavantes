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
        Schema::create('news', function (Blueprint $table) {
            $table->id();

            $table->uuid('uuid')->unique();

            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('category_id')->nullable();

            $table->string('news_post_title');
            $table->longText('news_post_content');
            $table->string('news_post_slug');
            $table->string('news_post_summary')->nullable(true);
            $table->string('news_post_tags')->nullable(true);
            $table->integer('news_post_views')->default(0);
            $table->boolean('news_post_status')->default(true);
            $table->boolean('news_post_active_comments')->default(true);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('SET NULL');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('SET NULL');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
