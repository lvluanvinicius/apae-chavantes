import { ApaeLayout } from '@/layouts/apae-layout';
import { ApiResponse, DataTrashInterface, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Page } from './page';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Painel de Controle',
        href: '/dashboard',
    },
    {
        title: 'Usuários',
        href: '/users',
    },
];

export interface TrashPageProps {
    data: ApiResponse<DataTrashInterface[]>;
}

export default function index({ data }: TrashPageProps) {
    return (
        <ApaeLayout breadcrumbs={breadcrumbs} title="Lixeira">
            <Head title="Lixeira" />

            <Page data={data} />
        </ApaeLayout>
    );
}
