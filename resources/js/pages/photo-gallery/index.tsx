import { TablePaginate } from '@/components/table-paginate';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ApaeLayout } from '@/layouts/apae-layout';
import { cn } from '@/lib/utils';
import { ApiResponse, PhotoGalleryInterface, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, CheckCheck } from 'lucide-react';
import { MouseEvent, useState } from 'react';
import { FormCreate } from './components/form-create';
import { FormUpdate } from './components/form-update';
import { MoveGalleryTrash } from './components/move-gallery-trash';

const breadcrumbs: BreadcrumbItem[] = [
    {
        href: '/dashboard',
        title: 'Painel de Controle',
    },
    {
        href: '/photo-gallery',
        title: 'Galeria de Fotos',
    },
];

interface PageProps {
    data: ApiResponse<PhotoGalleryInterface[]>;
}

export default function Index({ data }: PageProps) {
    const [selectedGalleries, setSelectedGalleries] = useState<number[]>([]);

    /**
     * Seleciona uma a uma.
     * @param gallery
     */
    function handleSelectGallery(gallery: number) {
        setSelectedGalleries((state) => {
            if (state.includes(gallery)) {
                return state.filter((id) => id !== gallery);
            }

            return [...state, gallery];
        });
    }

    /**
     * Captura o evendo de click do botão direito.
     *
     * @param event
     * @param gallery
     */
    const handleRightClick = (event: MouseEvent, gallery: number) => {
        event.preventDefault();

        handleSelectGallery(gallery);
    };

    /**
     * Seleciona todas as galerias ou remove qualquer seleção.
     */
    function selectAllGalleries() {
        if (selectedGalleries.length > 0) {
            setSelectedGalleries([]);
        } else {
            const ids = data.data.map((g) => g.id);
            setSelectedGalleries(ids);
        }
    }

    return (
        <ApaeLayout title="Galeria de Fotos" breadcrumbs={breadcrumbs}>
            <Head title="Galeria de Fotos" />

            <div className="flex items-center justify-between">
                <div />
                <div className="flex items-center gap-2">
                    {selectedGalleries.length > 0 && <MoveGalleryTrash galleries={selectedGalleries} isUnit={false} />}
                    <Button onClick={selectAllGalleries} size={'sm'} variant={selectedGalleries.length > 0 ? 'default' : 'outline'}>
                        <CheckCheck />
                        {selectedGalleries.length > 0 ? 'Limpar seleção' : 'Selecionar tudo'}
                    </Button>
                    <FormCreate />
                </div>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col gap-4">
                {data.data.map(function (gll) {
                    return (
                        <div
                            key={gll.id}
                            className={cn(
                                'flex h-52 items-center rounded-lg border-2 border-transparent bg-white p-2 shadow-md shadow-black/20 dark:bg-secondary',
                                selectedGalleries.includes(gll.id) && 'border-primary',
                            )}
                            onContextMenu={(e) => handleRightClick(e, gll.id)}
                        >
                            <div className="mr-2 flex h-full w-6 flex-col items-start">
                                {selectedGalleries.length > 0 && (
                                    <Checkbox
                                        value={gll.id}
                                        checked={selectedGalleries.includes(gll.id)}
                                        onCheckedChange={() => handleSelectGallery(gll.id)}
                                        className="border-gray-400"
                                    />
                                )}
                            </div>

                            <div className={cn('flex h-48 w-52 items-center justify-center rounded-xl border border-white/5')}>
                                <img src={route('admin.photo-gallery.image', [gll.gallery_image])} className="h-full w-full rounded-xl" />
                            </div>
                            <div className="flex h-full w-full flex-col gap-2 p-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2>{gll.gallery_name}</h2>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link href={route('admin.photo-gallery.show', [gll.uuid])}>
                                            <Button className="bg-blue-400 hover:bg-blue-500">
                                                <BookOpen />
                                            </Button>
                                        </Link>
                                        <FormUpdate gallery={gll} />
                                        <MoveGalleryTrash galleries={[gll.id]} />
                                    </div>
                                </div>
                                <p className="line-clamp-3 w-full text-sm">{gll.gallery_description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Separator className="my-4" />

            <div>
                <TablePaginate paginate={data} />
            </div>
        </ApaeLayout>
    );
}
