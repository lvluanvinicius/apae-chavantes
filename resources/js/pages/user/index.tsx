import { TablePaginate } from '@/components/table-paginate';
import { Separator } from '@/components/ui/separator';
import { ApaeLayout } from '@/layouts/apae-layout';
import { type ApiResponse, type BreadcrumbItem, type User } from '@/types';
import { Head } from '@inertiajs/react';
import { UserCreate } from './components/user-create';
import { UserTable } from './components/user-table';

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

interface PageProps {
    data: ApiResponse<User[]>;
}

export default function Index({ data }: PageProps) {
    return (
        <ApaeLayout breadcrumbs={breadcrumbs} title="Usuários">
            <Head title="Usuários" />
            <div className="rounded-lg bg-white px-8 py-6 dark:bg-secondary">
                <div className="flex items-center justify-between gap-4">
                    <div />
                    <UserCreate />
                </div>
                <UserTable data={data.data} />
                <Separator className="my-4" />
                <TablePaginate paginate={data} />
            </div>
        </ApaeLayout>
    );
}
