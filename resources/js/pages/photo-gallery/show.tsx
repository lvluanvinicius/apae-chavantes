import { ApaeLayout } from '@/layouts/apae-layout';
import { type BreadcrumbItem, type PhotoGalleryInterface } from '@/types';
import { Head } from '@inertiajs/react';
import { PreviewImage } from '../../components/preview-photo';
import { FormUpdate } from './components/form-update';
import { GalleryShow } from './components/gallery-show';
import { GalleryUploads } from './components/gallery-uploads';

interface PageProps {
    data: PhotoGalleryInterface;
}

export default function Index({ data }: PageProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            href: '/dashboard',
            title: 'Painel de Controle',
        },
        {
            href: '/photo-gallery',
            title: 'Galeria de Fotos',
        },
        {
            href: '',
            title: data.gallery_name,
        },
    ];

    return (
        <ApaeLayout title={data.gallery_name} breadcrumbs={breadcrumbs}>
            <Head title={data.gallery_name} />

            <div className="rounded-xl bg-white p-4 shadow-md shadow-black/20 dark:bg-secondary">
                <div className="flex flex-col items-center justify-start gap-4 sm:h-52 md:flex-row">
                    <div className="flex items-center justify-center border border-white/5 bg-black/10 p-2 md:h-52 md:w-60">
                        <PreviewImage photo={data.gallery_image} />
                    </div>

                    <div className="flex h-52 w-full flex-col items-start gap-4">
                        <div className="my-2 mr-2 flex w-full flex-col items-center justify-between gap-4 md:flex-row">
                            <div className="flex-1">
                                <h2 className="text-xl">{data.gallery_name}</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <FormUpdate gallery={data} />
                                <GalleryUploads galleryId={data.id} />
                            </div>
                        </div>

                        <div className="w-full flex-1">
                            <p className="text-muted-foreground">{data.gallery_description}</p>
                        </div>
                    </div>
                </div>

                {data.files ? (
                    <GalleryShow files={data.files} gallery={data.uuid} />
                ) : (
                    <div className="flex h-52 items-center justify-center rounded-2xl border text-lg text-muted-foreground/50">
                        Nenhuma imagem foi carregada.
                    </div>
                )}
            </div>
        </ApaeLayout>
    );
}
