import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { trashDstType } from '@/data/trash-dst-types';
import { transformSearchParams } from '@/tools/urls';
import { type TrashDstType } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { ListFilter } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { TrashPageProps } from '.';
import { TrashList } from './components/trash-list';

function Filters({ dstType, setDstType }: { dstType: TrashDstType; setDstType: (v: TrashDstType) => void }) {
    const { url } = usePage();

    const [search, setSearch] = useState<string>(function () {
        const params: Record<string, string | number> = {};
        const query = url.split('?')[1];
        // Inserindo todos os parametros dentro do objeto params.
        new URLSearchParams(query).forEach((v, k) => (params[k] = v));

        if (params.search) {
            return params.search as string;
        }

        return '';
    });

    function handleFilter(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const params: Record<string, string | number> = {};
        const uri = url.split('?')[0];
        const currentQuery = url.split('?')[1];

        // Inserindo todos os parametros dentro do objeto params.
        new URLSearchParams(currentQuery).forEach((v, k) => (params[k] = v));

        if (params.search) {
            if (!search) {
                delete params.search;
            } else {
                params.search = search;
            }
        } else {
            if (search) params.search = search;
        }

        if (params['dst-type']) {
            if (dstType == 'gallery') {
                delete params['dst-type'];
            } else {
                params['dst-type'] = dstType;
            }
        } else {
            if (dstType) params['dst-type'] = dstType;
        }

        router.get(`${uri}?${transformSearchParams({ ...params })}`);
    }

    return (
        <>
            <form onSubmit={handleFilter} className="flex flex-col gap-4 rounded-md border p-4 shadow-md shadow-black/20 md:p-8 dark:bg-secondary">
                <h3 className="text-muted-foreground">Filtros</h3>

                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                    <Label className="flex w-full flex-col gap-2">
                        <span>Digite algo</span>
                        <Input value={search} placeholder="Galeria..." onChange={(e) => setSearch(e.currentTarget.value)} />
                    </Label>

                    <Label
                        className="flex w-full flex-col gap-2"
                        title={`${trashDstType.map(function (tp) {
                            return `${tp.label}: ${tp.description}\n\n`;
                        })}`}
                    >
                        <span>Selecione um tipo</span>
                        <Select value={dstType} onValueChange={(v: TrashDstType) => setDstType(v)}>
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {trashDstType.map(function (tp) {
                                        return (
                                            <SelectItem key={tp.value} value={tp.value}>
                                                {tp.label}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Label>
                </div>

                <div className="w-full">
                    <Button type="submit" size={'sm'}>
                        <ListFilter />
                        Filtrar
                    </Button>
                </div>
            </form>
        </>
    );
}

export function Page({ data }: TrashPageProps) {
    const { url } = usePage();

    const [dstType, setDstType] = useState<TrashDstType>(function () {
        const params: Record<string, string | number> = {};
        const query = url.split('?')[1];
        // Inserindo todos os parametros dentro do objeto params.
        new URLSearchParams(query).forEach((v, k) => (params[k] = v));

        if (params['dst-type']) {
            return params['dst-type'] as TrashDstType;
        }

        return 'gallery';
    });

    return (
        <div className="flex flex-col gap-4">
            <Filters dstType={dstType} setDstType={setDstType} />
            <TrashList data={data.data} dstType={dstType} />
        </div>
    );
}
