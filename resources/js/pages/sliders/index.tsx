import { ApaeLayout } from '@/layouts/apae-layout';
import { queryClient } from '@/services/react-query';
import { ApiResponse, SliderInterface, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Page } from './page';

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
            <QueryClientProvider client={queryClient}>
                <Page data={data} />
            </QueryClientProvider>
        </ApaeLayout>
    );
}
