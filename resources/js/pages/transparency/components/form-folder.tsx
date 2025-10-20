import FormButtonLoading from '@/components/form-button-loading';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { TransparencyInterface, TypeFormMethod } from '@/types';
import { useForm } from '@inertiajs/react';
import { EditIcon } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

interface FolderCreateProps {
    parentId: string | null;
    method: TypeFormMethod;
    transparency?: TransparencyInterface;
}

export function FormFolder({ parentId, method, transparency }: FolderCreateProps) {
    const [open, setOpen] = useState(false);

    const { data, setData, errors, post, put, reset, processing } = useForm({
        name: transparency?.name ?? '',
        isFile: 'N',
    });

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (method === 'POST') {
            const routeCreate = parentId ? route('admin.transparency.store', parentId) : route('admin.transparency.store');

            post(routeCreate, {
                onSuccess() {
                    reset();
                    setOpen(false);
                },
            });
        }

        if (method === 'PUT' && transparency) {
            const routeUpdate = parentId
                ? route('admin.transparency.store', [transparency.uuid, parentId])
                : route('admin.transparency.store', transparency.uuid);

            put(routeUpdate, {
                onSuccess() {
                    reset();
                    setOpen(false);
                },
            });
        }
    }

    useEffect(() => {
        if (transparency) {
            setData('name', transparency.name);
        }
    }, [transparency, setData]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={method === 'POST' ? 'sm' : 'icon'} className={cn('cursor-pointer', method === 'PUT' && 'size-8')}>
                    {method === 'PUT' ? <EditIcon /> : '+ Nova pasta'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nova Pasta</DialogTitle>
                    <DialogDescription>De um nome para a nova pasta que você está criando.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <span>Nome</span>
                        <Input value={data.name} onChange={(e) => setData('name', e.currentTarget.value)} />

                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>

                    <DialogFooter>
                        <DialogClose className="h-8">Cancelar</DialogClose>
                        <Button className="h-8 min-w-[5rem]" type="submit">
                            <FormButtonLoading
                                processing={processing}
                                action={method}
                                messages={{
                                    create: 'Criar',
                                    creating: 'Aguarde...',
                                    update: 'Atualizar',
                                    updating: 'Aguarde...',
                                }}
                            />
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
