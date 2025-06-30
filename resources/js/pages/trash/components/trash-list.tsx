import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type DataTrashInterface, type TrashDstType } from '@/types';
import { SquareDashedMousePointer, Trash2 } from 'lucide-react';
import { MouseEvent, useEffect, useState } from 'react';
import { GalleryList } from './gallery-list';

export function TrashList({ data, dstType }: { data: DataTrashInterface[]; dstType: TrashDstType }) {
    const [trashSelected, setTrashSelected] = useState<number[]>([]);
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
    const [selectedTrash, setSelectedTrash] = useState<number | null>(null);

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
            {dstType === 'gallery' && (
                <GalleryList handleRightClick={handleRightClick} data={data} trashSelected={trashSelected} setTrashSelected={handleSelectTrash} />
            )}
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
                    setTrashSelected={handleSelectTrash}
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
    setTrashSelected(trash: number): void;
}

export function MenuOptions({ onClose, pX, pY, trashId, setTrashSelected, trashSelected }: MenuOptionsProps) {
    function handleSelect() {
        setTrashSelected(trashId);
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
                <li>
                    <Button className="w-full cursor-pointer !bg-transparent text-black hover:!bg-none dark:text-white">
                        <Trash2 className="text-red-600" />
                        Excluír definitivamente
                    </Button>
                </li>
            </ul>
        </div>
    );
}
