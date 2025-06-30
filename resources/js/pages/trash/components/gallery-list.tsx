import { cn } from '@/lib/utils';
import { DataTrashInterface, PhotoGalleryInterface } from '@/types';

export function GalleryList({ data }: { data: DataTrashInterface[] }) {
    return (
        <div className="grid grid-cols-1 gap-2 rounded-md bg-secondary p-4 xl:grid-cols-6">
            {data.map(function (d) {
                const content = JSON.parse(d.content) as PhotoGalleryInterface;
                return (
                    <div key={d.id} className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 px-2 py-4">
                        <div className={cn('flex h-48 w-52 items-center justify-center rounded-xl border-white/5')}>
                            <img src={route('admin.photo-gallery.image', [content.gallery_image])} className="h-full w-full rounded-xl" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-sm">{content.gallery_name}</h3>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
