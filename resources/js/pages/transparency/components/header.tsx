import { Button } from '@/components/ui/button';
import { TransparencyInterface, TransparencyTypeList } from '@/types';
import { Link } from '@inertiajs/react';
import { FolderIcon, Table2Icon } from 'lucide-react';
import { FormFolder } from './form-folder';
import { FormUploader } from './form-uploader';

export const Header = ({
    breadcrumbs,
    parentId,
    typeList = 'folder',
    toggleTypeList,
}: {
    breadcrumbs: TransparencyInterface[];
    parentId: string | null;
    typeList: TransparencyTypeList;
    toggleTypeList(type: 'table' | 'folder'): void;
}) => {
    const parent = breadcrumbs.length <= 0 ? null : breadcrumbs[breadcrumbs.length - 1];

    return (
        <header className="w-full border-b">
            <div className="mb-4 flex w-full items-center justify-between">
                <div className="justify-end">
                    {parent ? (
                        <Link
                            href={route('admin.transparency.index', parent.uuid)}
                            className="flex items-center gap-2 text-lg tracking-tight hover:text-gray-500 dark:text-white dark:hover:text-gray-300"
                        >
                            <FolderIcon strokeWidth={0} fill={'orange'} />
                            {parent.name}
                        </Link>
                    ) : parentId ? (
                        <Link
                            href={route('admin.transparency.index')}
                            className="flex items-center gap-2 text-lg tracking-tight hover:text-gray-500 dark:text-white dark:hover:text-gray-300"
                        >
                            <FolderIcon strokeWidth={0} fill={'orange'} /> Voltar ao início
                        </Link>
                    ) : (
                        <div className="flex items-center gap-2 text-lg tracking-tight hover:text-gray-500 dark:text-white dark:hover:text-gray-300">
                            <FolderIcon strokeWidth={0} fill={'orange'} /> Início
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <div>
                        <Button
                            onClick={() => toggleTypeList('table')}
                            className="cursor-pointer rounded-r-none"
                            variant={typeList === 'table' ? 'default' : 'outline'}
                        >
                            <Table2Icon />
                        </Button>
                        <Button
                            onClick={() => toggleTypeList('folder')}
                            className="cursor-pointer rounded-l-none"
                            variant={typeList === 'folder' ? 'default' : 'outline'}
                        >
                            <FolderIcon />
                        </Button>
                    </div>
                    <FormFolder method="POST" parentId={parentId} />
                    <FormUploader method="POST" parentId={parentId} />
                </div>
            </div>
        </header>
    );
};
