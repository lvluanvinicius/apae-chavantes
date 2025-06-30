import { useGalleryImages } from '@/hooks/use-gallery-images';
import { GalleryFileInterface } from '@/types';
import { MouseEvent, useEffect, useState } from 'react';

import 'react-photo-album/rows.css';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// import optional lightbox plugins
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CheckCheck, SquareDashedMousePointer, Trash2 } from 'lucide-react';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { MoveImagesTrash } from './move-images-trash';

function MenuOptions({
    imageId,
    pX,
    pY,
    onClose,
    selectedImages,
    onSelectImage,
}: {
    imageId: number;
    pX: number;
    pY: number;
    onClose: () => void;
    selectedImages: number[];
    onSelectImage: (imageId: number) => void;
}) {
    function handleSelect() {
        onSelectImage(imageId);
    }

    useEffect(() => {
        const handler = () => onClose();
        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    }, [onClose]);

    return (
        <div className="absolute z-50 rounded-md border bg-white text-black shadow dark:bg-background dark:text-black" style={{ top: pY, left: pX }}>
            <ul className="flex flex-col">
                <li>
                    <Button
                        className={cn(
                            'w-full cursor-pointer !bg-transparent text-black hover:!bg-none dark:text-white',
                            selectedImages.includes(imageId) && '!bg-cyan-100',
                        )}
                        onClick={handleSelect}
                    >
                        <SquareDashedMousePointer className="text-cyan-400" />
                        Selecionar
                    </Button>
                </li>
                <li>
                    <Button className="w-full cursor-pointer !bg-transparent text-black hover:!bg-none dark:text-white">
                        <Trash2 className="text-red-600" />
                        Mover para lixeira
                    </Button>
                </li>
            </ul>
        </div>
    );
}

export function GalleryShow({ files, gallery }: { files: GalleryFileInterface[]; gallery: string }) {
    const imageLinks = useGalleryImages({ data: files });

    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
    const [index, setIndex] = useState(-1);
    const [selectedImages, setSelectedImages] = useState<number[]>([]);

    /**
     * Seleciona umagem por imagem ou a remove da seleção.
     * @param imageId
     */
    function selectImage(imageId: number) {
        setSelectedImages((state) => {
            if (state.includes(imageId)) {
                return state.filter((id) => id !== imageId);
            }

            return [...state, imageId];
        });
    }

    /**
     * Seleciona todas as imagens ou remove qualquer seleção.
     */
    function selectAllImages() {
        if (selectedImages.length > 0) {
            setSelectedImages([]);
        } else {
            const ids = files.map((f) => f.id);
            setSelectedImages(ids);
        }
    }

    /**
     * Abre o menu de opções para manipulação de imagens.
     * @param event
     * @param imageId
     * @returns
     */
    const handleRightClick = (event: MouseEvent, imageId: number) => {
        event.preventDefault();

        setMenuPosition({ x: event.clientX, y: event.clientY });
        setSelectedPhoto(imageId);
    };

    /**
     * Abre uma imagem em preview na sua posição.
     * Caso haja mais que uma imagem selecionada, bloqueia o preview e seleciona as imagens clicadas.
     * @param index
     * @param imageId
     * @returns
     */
    function selectLeftButton(index: number, imageId: number) {
        // Libera o preview apenas quando não houver nenhuma imagem selecionada.
        if (selectedImages.length <= 0) {
            setIndex(index);
            return;
        }

        selectImage(imageId);
    }

    return (
        <div className="mt-4">
            <Separator className="my-4" />
            <div className="mb-4 flex h-10 w-full items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    {selectedImages.length > 0 && <MoveImagesTrash gallery={gallery} images={selectedImages} onClearSelected={setSelectedImages} />}
                    <Button onClick={selectAllImages} size={'sm'} variant={selectedImages.length > 0 ? 'default' : 'outline'}>
                        <CheckCheck />
                        {selectedImages.length > 0 ? 'Limpar seleção' : 'Selecionar tudo'}
                    </Button>
                </div>
            </div>

            <div className="w-full rounded-2xl bg-black/10 p-4">
                <div className="columns-2 gap-4 space-y-4 md:columns-3 lg:columns-4">
                    {files.map(function (image, index) {
                        return (
                            <div
                                key={index}
                                onClick={() => selectLeftButton(index, image.id)}
                                className={cn(
                                    'relative break-inside-avoid rounded-md border-3 border-transparent',
                                    selectedImages.includes(image.id) && 'border-primary/70',
                                )}
                                onContextMenu={(e) => handleRightClick(e, image.id)}
                            >
                                {selectedImages.includes(image.id) && (
                                    <div className="absolute top-0 left-0 h-full w-full rounded-md bg-black/30"></div>
                                )}
                                <img
                                    src={route('admin.photo-gallery.image', image.path)}
                                    height={image.height}
                                    width={image.width}
                                    className="w-full rounded-md shadow"
                                />
                            </div>
                        );
                    })}
                </div>

                {menuPosition && selectedPhoto !== null && (
                    <MenuOptions
                        imageId={selectedPhoto}
                        pX={menuPosition.x}
                        pY={menuPosition.y}
                        onClose={() => {
                            setMenuPosition(null);
                            setSelectedPhoto(null);
                        }}
                        selectedImages={selectedImages}
                        onSelectImage={selectImage}
                    />
                )}

                <Lightbox
                    slides={imageLinks}
                    open={index >= 0}
                    index={index}
                    close={() => setIndex(-1)}
                    // enable optional lightbox plugins
                    plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                />
            </div>
        </div>
    );
}
