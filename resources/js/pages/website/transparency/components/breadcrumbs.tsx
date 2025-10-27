import { TransparencyInterface } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { FolderIcon } from 'lucide-react';

export const Breadcrumb = () => {
    const { breadcrumbs } = usePage<{ breadcrumbs?: TransparencyInterface[] }>().props;
    const parent = breadcrumbs ? (breadcrumbs.length >= 1 ? breadcrumbs[0] : null) : null;

    return (
        <section className="container mx-auto mt-4 rounded-md bg-white px-4 py-4 shadow-md dark:bg-background">
            <div className="w-full">
                {parent ? (
                    <Link href={route('website.transparencia.index', [parent.uuid])} className="flex items-center gap-2">
                        <FolderIcon strokeWidth={0} fill={'orange'} /> {parent.name}
                    </Link>
                ) : (
                    <Link href={route('website.transparencia.index')} className="flex items-center gap-2">
                        <FolderIcon strokeWidth={0} fill={'orange'} /> Início
                    </Link>
                )}
            </div>
        </section>
    );
};
