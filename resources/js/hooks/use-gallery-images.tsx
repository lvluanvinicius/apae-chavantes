import { GalleryFileInterface } from '@/types';
import type { Photo } from 'react-photo-album';

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

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
            src: imageLink(d.filename),
            alt: d.hash,
            width: 1280,
            height: 720,
            srcSet: breakpoints.map((breakpoint) => ({
                src: imageLink(d.filename),
                width: breakpoint,
                height: Math.round((parseInt(d.size_file) / 100) * breakpoint),
            })),
        } as Photo;
    });

    return links;
}
