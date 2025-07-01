import { PreviewImage } from '@/components/preview-photo';
import { Separator } from '@/components/ui/separator';
import { ApaeLayout } from '@/layouts/apae-layout';
import { ApiResponse, SliderInterface, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Painel de Controle',
        href: '/dashboard',
    },
    {
        title: 'Sliders',
        href: '/sliders',
    },
];

interface PageProps {
    data: ApiResponse<SliderInterface[]>;
}

export default function index({ data }: PageProps) {
    return (
        <ApaeLayout breadcrumbs={breadcrumbs} title="Sliders">
            <Head title="Sliders" />
            <div className="rounded-lg bg-white px-8 py-6 dark:bg-secondary">
                <div className="flex items-center justify-between gap-4">
                    <div />
                </div>
                <Separator className="my-4" />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="h-48 w-full rounded-xl border p-2">
                        <PreviewImage photo={'/storage/gallery/20250701/banner-hero-a2083d8d6b6521906afefcd4c7f9373b.png'} />
                    </div>
                </div>
            </div>
        </ApaeLayout>
    );
}
