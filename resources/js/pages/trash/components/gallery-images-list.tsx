import { cn } from '@/lib/utils';
import { GalleryFileInterface, type DataTrashInterface } from '@/types';
import { Image } from 'lucide-react';
import { type MouseEvent } from 'react';

interface GalleryImagesListProps {
    data: DataTrashInterface[];
    trashSelected: number[];
    setTrashSelected(trash: number): void;
    handleRightClick(e: MouseEvent, trashId: number): void;
}

export function GalleryImagesList({ data, handleRightClick, setTrashSelected, trashSelected }: GalleryImagesListProps) {
    return (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:col-span-4 xl:grid-cols-5">
            {data.map(function (d) {
                const content = JSON.parse(d.content) as GalleryFileInterface;

                return (
                    <div
                        key={d.id}
                        onClick={() => setTrashSelected(d.id)}
                        className={cn(
                            'flex flex-col items-center justify-center gap-2 rounded-xl border-3 px-2 py-4',
                            trashSelected.includes(d.id) && 'border-primary/70',
                        )}
                        onContextMenu={(e) => handleRightClick(e, d.id)}
                    >
                        <div className={cn('relative flex h-48 w-52 items-center justify-center rounded-xl border-white/5')}>
                            {trashSelected.includes(d.id) && <div className="absolute right-0 left-0 h-full w-full rounded-xl bg-black/40" />}
                            <img src={route('admin.photo-gallery.image', [content.path])} className="h-full w-full rounded-xl" />
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <Image className="text-cyan-500" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
