import { ApaeLayout } from '@/layouts/apae-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <ApaeLayout breadcrumbs={breadcrumbs} title="Painel de Controle">
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">teste</div>
        </ApaeLayout>
    );
}
