import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

export function MoveGalleryTrash({
    galleries,
    isUnit = true,
    onClearSelected,
}: {
    galleries: number[];
    isUnit?: boolean;
    onClearSelected: (images: number[]) => void;
}) {
    const [open, setOpen] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);

    function handleDelete() {
        router.post(
            route('admin.photo-gallery-trash'),
            { galleries: galleries },
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
                <Button variant={'destructive'} size={isUnit ? 'icon' : 'sm'}>
                    {isUnit ? (
                        <Trash2 />
                    ) : (
                        <>
                            <Trash2 /> Mover para lixeira
                        </>
                    )}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deseja realmente prosseguir?</AlertDialogTitle>
                    <AlertDialogDescription></AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button
                        variant={'outline'}
                        onClick={() => {
                            setProcessing(false);
                            setOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleDelete}>{processing ? 'Aguarde...' : 'Confirmar'}</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
