import { ApiResponse, TransparencyInterface, TransparencyTypeList } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FileListing } from './components/file-list';
import { Header } from './components/header';

const TYPE_LIST_KEY = '@apae:type-listing';

export function Page() {
    const { breadcrumbs, data, uuid } = usePage<{
        breadcrumbs: TransparencyInterface[];
        uuid: string | null;
        data: ApiResponse<TransparencyInterface[]>;
    }>().props;

    const [typeList, setTypeList] = useState<TransparencyTypeList>(() => {
        const type = localStorage.getItem(TYPE_LIST_KEY);

        if (type) {
            return type as TransparencyTypeList;
        }

        return 'folder';
    });

    const toggleTypeList = (type: TransparencyTypeList) => {
        localStorage.setItem(TYPE_LIST_KEY, type);
        setTypeList(type);
    };

    useEffect(() => {
        const type = localStorage.getItem(TYPE_LIST_KEY) as TransparencyTypeList | null;

        if (type) {
            setTypeList(type);
        }
    }, []);

    return (
        <div className="w-full space-y-8">
            <Header breadcrumbs={breadcrumbs} parentId={uuid} toggleTypeList={toggleTypeList} typeList={typeList} />
            <FileListing data={data.data} parentId={uuid} typeList={typeList} />
        </div>
    );
}
