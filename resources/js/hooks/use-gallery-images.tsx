import { GalleryFileInterface } from '@/types';
import type { Photo } from 'react-photo-album';

export const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

function imageLink(path: string) {
    const href = route('admin.photo-gallery.image', [path]);
    return href;
}

interface UseGalleryImagesProps {
    data: GalleryFileInterface[];
}

export function useGalleryImages({ data }: UseGalleryImagesProps): Photo[] {
    const links = data.map((d) => {
        return {
            id: d.id,
            src: imageLink(d.path),
            alt: d.hash,
            width: d.width,
            height: d.height,
            srcSet: breakpoints.map((breakpoint) => ({
                src: imageLink(d.path),
                width: breakpoint,
                height: Math.round((d.width / d.height) * breakpoint),
            })),
        } as Photo;
    });

    return links;
}
