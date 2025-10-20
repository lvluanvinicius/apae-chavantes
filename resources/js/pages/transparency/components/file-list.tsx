import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { dateExtFormatter, formatFileSize } from '@/tools/formatter';
import { TransparencyInterface } from '@/types';
import { Link } from '@inertiajs/react';
import { FileArchiveIcon, FolderIcon } from 'lucide-react';
import { FormFolder } from './form-folder';

export const FileListing = ({
    data,
    parentId,
    typeList = 'folder',
}: {
    data: TransparencyInterface[];
    parentId: string | null;
    typeList?: 'folder' | 'table';
}) => {
    return (
        <div className="w-full">
            {typeList === 'folder' ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-8 xl:grid-cols-6">
                    {data.length <= 0 ? (
                        <div className="col-span-full flex h-16 w-full items-center justify-center rounded-md border">
                            <p className="text-[1rem] text-muted-foreground">Ainda não existe nenhum arquivo ou pasta.</p>
                        </div>
                    ) : (
                        data.map((d) => {
                            if (d.is_folder === 'Y') {
                                return (
                                    <Link
                                        href={route('admin.transparency.index', [d.uuid])}
                                        key={d.uuid}
                                        className={cn('flex w-full flex-col items-center justify-center text-sm')}
                                    >
                                        <FolderIcon strokeWidth={0} fill={'orange'} className="h-32 w-32" />
                                        {d.name}
                                    </Link>
                                );
                            } else {
                                return (
                                    <div key={d.uuid} className={cn('flex w-full flex-col items-center justify-center text-sm')}>
                                        <FileArchiveIcon className="h-32 w-32 text-blue-500" />
                                        {d.name}
                                    </div>
                                );
                            }
                        })
                    )}
                </div>
            ) : (
                <div className="rounded-lg bg-white dark:bg-secondary">
                    <Table className="">
                        <TableHeader className="border-b-4 border-background">
                            <TableRow className="border-b-4 border-background">
                                <TableHead className="px-4 pl-4 whitespace-nowrap">Nome</TableHead>
                                <TableHead className="py-4 whitespace-nowrap">Tamanho</TableHead>
                                <TableHead className="py-4 whitespace-nowrap">Enviado em</TableHead>
                                <TableHead className="py-4 whitespace-nowrap">Atualizado em</TableHead>
                                <TableHead className="py-4 pr-4 whitespace-nowrap"></TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {data.length <= 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <div className="flex h-16 items-center justify-center">
                                            <p className="text-[1rem] text-muted-foreground">Ainda não existe nenhum arquivo ou pasta.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map(function (d, index) {
                                    return <Row key={index} data={d} parentId={parentId} />;
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

const Row = ({ data, parentId }: { data: TransparencyInterface; parentId: string | null }) => {
    return (
        <TableRow className="border-b-4 border-background">
            <TableCell className="!py-4 pl-4 whitespace-nowrap">
                {data.is_folder == 'Y' ? (
                    <Link href={route('admin.transparency.index', data.uuid)} className="flex items-center gap-2 hover:text-blue-500">
                        <FolderIcon strokeWidth={0} fill={'orange'} />
                        {data.name}
                    </Link>
                ) : (
                    <div className="flex items-center gap-2">
                        <FileArchiveIcon className="text-blue-500" />
                        {data.name}
                    </div>
                )}
            </TableCell>
            <TableCell className="!py-4 whitespace-nowrap">{data.is_folder == 'Y' ? '-' : formatFileSize(data.size)}</TableCell>
            <TableCell className="!py-4 whitespace-nowrap">{data.created_at && dateExtFormatter(data.created_at)}</TableCell>
            <TableCell className="!py-4 whitespace-nowrap">{data.updated_at && dateExtFormatter(data.updated_at)}</TableCell>
            <TableCell className="!py-4 pr-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <div className="flex min-w-[10rem] items-center justify-end gap-2">
                        {/* {data.is_folder == 'N' && (
                            <FileDownload fileId={data.uuid} />
                        )} */}

                        <FormFolder transparency={data} method="PUT" parentId={parentId} />

                        <FormFolder transparency={data} method="DELETE" parentId={parentId} />
                    </div>
                </div>
            </TableCell>
        </TableRow>
    );
};
