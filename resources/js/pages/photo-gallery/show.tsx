import { ApaeLayout } from '@/layouts/apae-layout';
import { type BreadcrumbItem, type PhotoGalleryInterface } from '@/types';
import { FormUpdate } from './components/form-update';
import { GalleryShow } from './components/gallery-show';
import { PreviewImage } from './components/preview-photo';

interface PageProps {
    data: PhotoGalleryInterface;
}

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

export default function Index({ data }: PageProps) {
    return (
        <ApaeLayout title={data.gallery_name} breadcrumbs={breadcrumbs}>
            <div className="rounded-xl bg-white p-4 shadow dark:bg-secondary">
                <div className="flex h-52 items-center justify-start gap-4">
                    <div className="h-52 w-60 border">
                        <PreviewImage photo={''} />
                    </div>
                    <div className="flex h-52 w-full items-start gap-4">
                        <div className="my-2 mr-2 flex w-full items-center justify-between border">
                            <FormUpdate gallery={data} />
                            <div />
                        </div>
                    </div>
                </div>

                <div className="mt-4">{data.files && <GalleryShow files={data.files} />}</div>
            </div>
        </ApaeLayout>
    );
}
