import { cn } from '@/lib/utils';
import { TransparencyInterface } from '@/types';
import { Link } from '@inertiajs/react';
import { FileArchiveIcon, FolderIcon } from 'lucide-react';
import { Breadcrumb } from './breadcrumbs';

export const FileList = ({ data }: { data: TransparencyInterface[] }) => {
    return (
        <section className="w-full">
            <Breadcrumb />
            <div className="container mx-auto mt-4 grid grid-cols-2 gap-4 border sm:grid-cols-3 md:grid-cols-4 md:gap-8 xl:grid-cols-6">
                {data.length <= 0 ? (
                    <div className="col-span-full flex h-16 w-full items-center justify-center rounded-md bg-background shadow-md">
                        <p className="text-[1rem] text-muted-foreground">Ainda não existe nenhum arquivo ou pasta.</p>
                    </div>
                ) : (
                    data.map((d) => <Folder key={d.uuid} data={d} />)
                )}
            </div>
        </section>
    );
};

const Folder = ({ data }: { data: TransparencyInterface }) => {
    return (
        <div className="relative rounded-2xl border border-muted-foreground/10 bg-background p-4 shadow-md">
            {data.is_folder === 'Y' ? (
                <Link
                    title={`Pasta ${data.name}`}
                    href={route('website.transparencia.index', [data.uuid])}
                    className={cn('flex w-full flex-col items-center justify-center text-sm')}
                >
                    <FolderIcon strokeWidth={0} fill={'orange'} className="h-32 w-32" />
                    {data.name}
                </Link>
            ) : (
                <div className={cn('flex w-full flex-col items-center justify-center text-sm')} title={`Arquivo ${data.name}`}>
                    <FileArchiveIcon className="h-32 w-32 text-blue-500" />
                    {data.name}
                </div>
            )}
        </div>
    );
};
