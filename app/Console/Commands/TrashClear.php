<?php
namespace App\Console\Commands;

use App\Models\DataTrash;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TrashClear extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:trash-clear {--dst-type=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Excluí todos os itens da lixeira de acordo com a data de exclusão.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {

            $dstType = $this->option('dst-type');

            if ($dstType == 'gallery') {
                // Recuperando disco dos arquivos.
                $disk = Storage::disk('public');

                // Recupera os registros na gelria.
                $dataTrash = DataTrash::where('dst_type', 'gallery')
                    ->whereRaw("DATE_FORMAT(deletion_date, '%Y-%m-%d %H:%i:%s') <= ?", [now()->format('Y-m-d H:i:s')])->get();

                foreach ($dataTrash as $trash) {
                    $gll = json_decode($trash->content);

                    DB::transaction(function () use ($trash, $gll, $disk) {
                        $fileName = $gll->gallery_image;

                        $trash->delete();

                        // Remover imagem anterior.
                        $disk->delete($fileName);
                    });
                }
            }

            if ($dstType == 'gallery-images') {
                // Recuperando disco dos arquivos.
                $disk = Storage::disk('public');

                // Recupera os registros na gelria.
                $dataTrash = DataTrash::where('dst_type', 'gallery-images')
                    ->whereRaw("DATE_FORMAT(deletion_date, '%Y-%m-%d %H:%i:%s') <= ?", [now()->format('Y-m-d H:i:s')])->get();

                foreach ($dataTrash as $trash) {
                    $image = json_decode($trash->content);

                    DB::transaction(function () use ($trash, $image, $disk) {

                        $trash->delete();

                        // Remover imagem anterior.
                        $disk->delete($image->path);
                    });
                }
            }

            $this->info('Gallery cleaning completed.');
            $this->info('Success in cleaning up the trash.');
        } catch (\Exception $error) {
            $this->error("Error clearing trash: " . $error->getMessage());
        }
    }
}
