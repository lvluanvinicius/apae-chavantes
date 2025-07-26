<?php
namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Setting::create([
            'setting_name'  => 'application_gallery_extensions',
            'setting_value' => serialize(['webp', 'png', 'jpg', 'jpeg']),
            'setting_type'  => 'extensions',
        ]);

        Setting::create([
            'setting_name'  => 'application_partners_extensions',
            'setting_value' => serialize(['webp', 'png', 'jpg', 'jpeg']),
            'setting_type'  => 'extensions',
        ]);

        Setting::create([
            'setting_name'  => 'application_transparency_extensions',
            'setting_value' => serialize(['pdf']),
            'setting_type'  => 'extensions',
        ]);

        Setting::create([
            'setting_name'  => 'application_sliders_extensions',
            'setting_value' => serialize(['webp', 'png', 'jpg', 'jpeg']),
            'setting_type'  => 'extensions',
        ]);

        Setting::create([
            'setting_name'  => 'application_sliders_extensions',
            'setting_value' => serialize(['webp', 'png', 'jpg', 'jpeg']),
            'setting_type'  => 'extensions',
        ]);
    }
}
