import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { PreviewImage } from './preview-photo';

export function FormCreate() {
    const [open, setOpen] = useState<boolean>(false);

    const { processing, data, setData, post, errors, reset } = useForm({
        gallery_name: '',
        gallery_description: '',
        cover: null as File | null,
    });

    function changeFile(event: ChangeEvent<HTMLInputElement>) {
        if (!event.currentTarget.files || event.currentTarget.files.length === 0) {
            return;
        }

        const files = event.currentTarget.files;

        if (files instanceof FileList) {
            const file = files[0];

            if (!file.type.includes('png') && !file.type.includes('jpeg') && !file.type.includes('jpg') && !file.type.includes('webp')) {
                return null;
            }

            setData('cover', file);
        }
    }

    function create(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        post(route('admin.photo-gallery.store'), {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess() {
                reset();
                setOpen(false);
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={'sm'}>+ Nova</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[100vh] w-full max-w-[100vw] overflow-auto md:px-8 xl:!max-h-[90vh] xl:!max-w-[50vw]">
                <DialogHeader className="">
                    <DialogTitle>Nova galeria</DialogTitle>
                    <DialogDescription>
                        Informe corretamente todos os dados obrigatórios marcados com (<strong className="text-red-500">*</strong>).
                    </DialogDescription>
                </DialogHeader>

                <Separator className="my-4" />

                <form onSubmit={create} className="flex flex-col">
                    <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="space-y-1">
                            <span className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">
                                Nome do Album <strong className="text-red-500">*</strong>
                            </span>
                            <p className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400"></p>
                        </div>

                        <Label className="flex flex-col gap-2">
                            <Input
                                placeholder="Festa de fim de ano"
                                className={cn('', errors.gallery_name && 'border !border-destructive')}
                                value={data.gallery_name}
                                onChange={(e) => setData('gallery_name', e.currentTarget.value)}
                            />
                            {errors.gallery_name && <p className="w-full text-destructive">{errors.gallery_name}</p>}
                        </Label>
                    </div>

                    <Separator className="my-4" />

                    <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="space-y-1">
                            <span className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">
                                Imagem do Produto <strong className="text-red-500">*</strong>
                            </span>
                            <p className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">
                                Informe uma imagem para organização e melhor identificação para o produto.
                            </p>
                        </div>

                        <Label className="flex flex-col gap-2">
                            <Input
                                type="file"
                                className={cn('', errors.cover && 'border !border-destructive')}
                                onChange={changeFile}
                                accept=".png, .jpeg, .jpg, .webp"
                            />
                            {errors.cover && <p className="w-full text-destructive">{errors.cover}</p>}

                            <div className="">
                                <div className="w-52">
                                    <PreviewImage photo={data.cover} />
                                </div>
                            </div>
                        </Label>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex flex-col gap-2">
                        <div className="w-full">
                            <span className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">
                                Descrição da galeria <strong className="text-red-500">*</strong>
                            </span>
                            <p className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">
                                A galeria apresenta registros que representam momentos significativos. As fotos salvas podem retratar eventos
                                especiais, homenagens ou memórias importantes. Trata-se de um espaço dedicado à preservação e valorização de
                                acontecimentos marcantes.
                            </p>
                        </div>

                        <div className="w-full overflow-x-hidden">
                            <Textarea
                                rows={5}
                                cols={30}
                                maxLength={255}
                                className={cn(
                                    'h-28 w-full resize-y overflow-auto break-words break-all whitespace-pre-wrap',
                                    errors.gallery_description && 'border !border-destructive',
                                )}
                                value={data.gallery_description}
                                onChange={(e) => setData('gallery_description', e.currentTarget.value)}
                            />
                        </div>
                    </div>

                    <Separator className="my-4" />

                    <DialogFooter>
                        <Button type="button" variant={'outline'} onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">
                            {processing ? (
                                <>
                                    <LoaderCircle className="h-4 w-4 animate-spin" /> Aguarde...
                                </>
                            ) : (
                                'Criar'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
