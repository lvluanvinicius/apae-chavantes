import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { ArchiveRestore } from 'lucide-react';

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function TrashRestore({
    trash,
    onClear,
    isUnit = true,
    className,
}: {
    trash: number[];
    onClear: (v: number[]) => void;
    isUnit?: boolean;
    className?: string;
}) {
    const [open, setOpen] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);

    function handleDelete() {
        console.log('resre');

        router.post(
            route('admin.trash-restore'),
            { trashIds: trash },
            {
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
                onSuccess() {
                    setOpen(false);
                    onClear([]);
                },
            },
        );
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant={'destructive'} size={isUnit ? 'icon' : 'sm'} className={cn(className)}>
                    {isUnit ? (
                        <ArchiveRestore />
                    ) : (
                        <>
                            <ArchiveRestore /> Restaurar
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
