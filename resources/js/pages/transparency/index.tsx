import { ApaeLayout } from '@/layouts/apae-layout';
import { queryClient } from '@/services/react-query';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Page } from './page';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Painel de Controle',
        href: '/dashboard',
    },
    {
        title: 'Transparência',
        href: '/transparency',
    },
];

export default function index() {
    return (
        <ApaeLayout breadcrumbs={breadcrumbs} title="Sliders">
            <Head title="Sliders" />
            <QueryClientProvider client={queryClient}>
                <Page />
            </QueryClientProvider>
        </ApaeLayout>
    );
}
