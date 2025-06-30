import { type DataTrashInterface, type TrashDstType } from '@/types';
import { GalleryList } from './gallery-list';

export function TrashList({ data, dstType }: { data: DataTrashInterface[]; dstType: TrashDstType }) {
    if (data.length < 0) {
        return <div className="rounded-md bg-secondary p-4 text-center text-muted-foreground">Clique em Filtrar para efetuar a busca.</div>;
    }

    switch (dstType) {
        case 'gallery':
            return <GalleryList data={data} />;

        default:
            return <div className="rounded-md bg-secondary p-4 text-center text-muted-foreground">Nenhum tipo válido foi selecionado.</div>;
    }
}
