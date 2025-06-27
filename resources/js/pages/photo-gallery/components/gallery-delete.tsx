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

export function GalleryDelete({ galleryId }: { galleryId: number }) {
    const [open, setOpen] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);

    function handleDelete() {
        setProcessing(true);
        router.delete(route('admin.photo-gallery.destroy', [galleryId]), {
            onSuccess() {
                setProcessing(false);
                setOpen(false);
            },
            onFinish() {
                setProcessing(false);
            },
        });
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant={'destructive'} size={'icon'}>
                    <Trash2 />
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
