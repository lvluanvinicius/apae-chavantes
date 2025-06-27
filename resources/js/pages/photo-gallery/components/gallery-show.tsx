import { useGalleryImages } from '@/hooks/use-gallery-images';
import { GalleryFileInterface } from '@/types';
import { useState } from 'react';

import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// import optional lightbox plugins
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

export function GalleryShow({ files }: { files: GalleryFileInterface[] }) {
    const imageLinks = useGalleryImages({ data: files });

    const [index, setIndex] = useState(-1);

    return (
        <div className="border">
            <div>Teste</div>
            <RowsPhotoAlbum photos={imageLinks} targetRowHeight={150} onClick={({ index }) => setIndex(index)} />

            <Lightbox
                slides={imageLinks}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                // enable optional lightbox plugins
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
            />
        </div>
    );
}
