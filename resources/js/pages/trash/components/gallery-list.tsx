import { cn } from '@/lib/utils';
import { DataTrashInterface, PhotoGalleryInterface } from '@/types';
import { BookOpen } from 'lucide-react';
import { MouseEvent } from 'react';

interface GalleryListProps {
    data: DataTrashInterface[];
    trashSelected: number[];
    setTrashSelected(trash: number): void;
    handleRightClick(e: MouseEvent, trashId: number): void;
}

export function GalleryList({ data, trashSelected, setTrashSelected, handleRightClick }: GalleryListProps) {
    return (
        <>
            <div className="grid grid-cols-1 gap-2 xl:grid-cols-6">
                {data.map(function (d) {
                    const content = JSON.parse(d.content) as PhotoGalleryInterface;
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
                                <img src={route('admin.photo-gallery.image', [content.gallery_image])} className="h-full w-full rounded-xl" />
                            </div>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <BookOpen className="text-cyan-500" />
                                <h3 className="font-poppins mb-4 line-clamp-2 text-sm">{content.gallery_name}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
