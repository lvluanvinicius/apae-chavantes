import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface DeletePermanentlyProps {
    trash: number[];
    onClear: () => void;
}

export function DeletePermanently({ trash, onClear }: DeletePermanentlyProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);

    function handleDelete() {
        router.post(
            route('admin.trash-destroy'),
            { trashIds: trash },
            {
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
                onSuccess() {
                    setOpen(false);
                    onClear();
                },
            },
        );
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant={'destructive'} size={'sm'}>
                    <Trash2 /> Excluir permanentemente
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    {trash.length > 0 ? (
                        <>
                            <AlertDialogTitle>Deseja realmente prosseguir?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Ao clicar em Confirmar, você concorda que todos os arquivos selecionados serão removidos permanentemente?
                            </AlertDialogDescription>
                        </>
                    ) : (
                        <>
                            <AlertDialogTitle>Ooops!</AlertDialogTitle>
                            <AlertDialogDescription>Você precisa selecionar ao menos um item na lixeira para excluir</AlertDialogDescription>
                        </>
                    )}
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <Button
                        variant={'outline'}
                        onClick={() => {
                            setProcessing(false);
                            setOpen(false);
                        }}
                    >
                        Cancelar
                    </Button>
                    {trash.length > 0 && (
                        <Button disabled={trash.length <= 0} onClick={handleDelete}>
                            {processing ? 'Aguarde...' : 'Confirmar'}
                        </Button>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
