import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function MoveImagesTrash({
    gallery,
    images,
    onClearSelected,
}: {
    gallery: string;
    images: number[];
    onClearSelected: (images: number[]) => void;
}) {
    const [open, setOpen] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);

    async function handleDelete() {
        router.post(
            route('admin.gallery-image-trash', [gallery]),
            { images },
            {
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
                onSuccess() {
                    setOpen(false);
                    onClearSelected([]);
                },
            },
        );
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant={'destructive'} size={'sm'} title="Mover selecionados para lixeira" className="cursor-pointer">
                    <Trash2 /> Mover para lixeira
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogTitle>Atenção</AlertDialogTitle>
                <AlertDialogDescription>
                    Você está apenas movendo essas imagens para a lixeira, portanto ainda estarão pendentes e serão excluídas dentro de 30 dias.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <Button variant={'outline'} onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete}>
                        {processing ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animate-spin" /> Aguarde...
                            </>
                        ) : (
                            'Confirmar'
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
