import { OptionSelectGallery, SelectGallery } from '@/components/select-gallery';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { type DataTrashInterface, type TrashDstType } from '@/types';
import { SquareDashedMousePointer } from 'lucide-react';
import { type MouseEvent, useEffect, useState } from 'react';
import { DeletePermanently } from './delete-permanently';
import { GalleryImagesList } from './gallery-images-list';
import { GalleryList } from './gallery-list';
import { TrashRestore } from './trash-restore';

export function TrashList({ data, dstType }: { data: DataTrashInterface[]; dstType: TrashDstType }) {
    const [trashSelected, setTrashSelected] = useState<number[]>([]);
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
    const [selectedTrash, setSelectedTrash] = useState<number | null>(null);
    const [targeRestoreGalleryImage, setTargeRestoreGalleryImage] = useState<OptionSelectGallery | null>(null);

    /**
     * Abre o menu de opções para manipulação de imagens.
     * @param event
     * @param trashId
     * @returns
     */
    const handleRightClick = (event: MouseEvent, trashId: number) => {
        event.preventDefault();

        setMenuPosition({ x: event.clientX, y: event.clientY });
        setSelectedTrash(trashId);
    };

    /**
     * Seleciona um registro / remove das seleções.
     * @param t
     */
    function handleSelectTrash(t: number) {
        setTrashSelected((state) => {
            if (!state.find((st) => st == t)) {
                return [...state, t];
            }

            return [...state.filter((st) => st != t)];
        });
    }

    if (data.length < 0) {
        return <div className="rounded-md bg-secondary p-4 text-center text-muted-foreground">Clique em Filtrar para efetuar a busca.</div>;
    }

    return (
        <>
            <div className="flex flex-col gap-4 rounded-md bg-secondary p-4">
                <div className="flex w-full justify-between">
                    {dstType === 'gallery-images' && (
                        <Label className="flex flex-col gap-2">
                            <span className="text-muted-foreground">Selecione uma galeria para onde será restaurada as imagens.</span>
                            <SelectGallery onSelect={(selected) => setTargeRestoreGalleryImage(selected)} selected={targeRestoreGalleryImage} />
                        </Label>
                    )}

                    <div className="flex items-center gap-2">
                        <TrashRestore
                            onClear={() => {
                                setTrashSelected([]);
                                setTargeRestoreGalleryImage(null);
                            }}
                            trash={trashSelected}
                            isUnit={false}
                            dstType={dstType}
                            restoreGallery={targeRestoreGalleryImage?.value}
                            className="cursor-pointer border bg-transparent text-black hover:!bg-primary dark:text-white"
                        />

                        {trashSelected.length > 0 && (
                            <DeletePermanently
                                onClear={() => {
                                    setTrashSelected([]);
                                }}
                                trash={trashSelected}
                            />
                        )}
                    </div>
                </div>

                {dstType === 'gallery' && (
                    <GalleryList handleRightClick={handleRightClick} data={data} trashSelected={trashSelected} setTrashSelected={handleSelectTrash} />
                )}

                {dstType === 'gallery-images' && (
                    <GalleryImagesList
                        handleRightClick={handleRightClick}
                        data={data}
                        trashSelected={trashSelected}
                        setTrashSelected={handleSelectTrash}
                    />
                )}
            </div>

            {/* <div className="rounded-md bg-secondary p-4 text-center text-muted-foreground">Nenhum tipo válido foi selecionado.</div> */}

            {menuPosition && selectedTrash !== null && (
                <MenuOptions
                    trashId={selectedTrash}
                    pX={menuPosition.x}
                    pY={menuPosition.y}
                    onClose={() => {
                        setMenuPosition(null);
                        setSelectedTrash(null);
                    }}
                    trashSelected={trashSelected}
                    onSelectTrash={handleSelectTrash}
                />
            )}
        </>
    );
}

interface MenuOptionsProps {
    trashId: number;
    pX: number;
    pY: number;
    onClose: () => void;
    trashSelected: number[];
    onSelectTrash(trash: number): void;
}

export function MenuOptions({ onClose, pX, pY, trashId, onSelectTrash, trashSelected }: MenuOptionsProps) {
    function handleSelect() {
        onSelectTrash(trashId);
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
                            trashSelected.includes(trashId) && '!bg-cyan-100 dark:!bg-cyan-100/20',
                        )}
                        onClick={handleSelect}
                    >
                        <SquareDashedMousePointer className="text-cyan-400" />
                        Selecionar
                    </Button>
                </li>
            </ul>
        </div>
    );
}
