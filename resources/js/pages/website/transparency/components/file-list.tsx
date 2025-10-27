import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TransparencyInterface } from '@/types';
import { Link } from '@inertiajs/react';
import { ExternalLinkIcon, FolderIcon } from 'lucide-react';
import { Breadcrumb } from './breadcrumbs';

export const FileList = ({ data }: { data: TransparencyInterface[] }) => {
    return (
        <section className="w-full">
            <Breadcrumb />
            <div className="container mx-auto mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-8 xl:grid-cols-6">
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
    console.log(data);

    return (
        <div className="relative rounded-2xl border border-muted-foreground/10 bg-white p-4 shadow-md dark:bg-background">
            {data.is_folder === 'Y' ? (
                <Link
                    title={`Pasta ${data.name}`}
                    href={route('website.transparencia.index', [data.uuid])}
                    className={cn('flex w-full flex-col items-center justify-center text-sm')}
                >
                    <FolderIcon strokeWidth={0} fill={'orange'} className="h-32 w-32" />
                    <p className="line-clamp-1">{data.name}</p>
                </Link>
            ) : (
                <div className={cn('flex w-full flex-col items-center justify-between text-sm')} title={`Arquivo ${data.name}`}>
                    {data.mime_type.includes('pdf') && (
                        <>
                            <div className="h-32 w-32">
                                <iframe src={route('storage.local', [data.path])} className="h-full w-full" />
                            </div>
                            <p className="line-clamp-1">{data.name}</p>
                        </>
                    )}

                    {data.mime_type.includes('image') && (
                        <>
                            <div className="h-32 w-32">
                                <img src={route('storage.local', [data.path])} className="h-full w-full rounded-lg" />
                            </div>
                            <p className="line-clamp-1">{data.name}</p>
                        </>
                    )}

                    <a href={route('storage.local', [data.path])} target="_blank" className="w-full">
                        <Button size={'sm'} className="mt-2 w-full cursor-pointer" variant={'outline'} title={`Abrir arquivo ${data.name}`}>
                            <ExternalLinkIcon />
                            Abrir
                        </Button>
                    </a>
                </div>
            )}
        </div>
    );
};
