import { PreviewImage } from '@/components/preview-photo';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';

export function CreateSlider() {
    const [open, setOpen] = useState<boolean>(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        image: null as File | null,
    });

    function changeFile(event: ChangeEvent<HTMLInputElement>) {
        if (!event.currentTarget.files || event.currentTarget.files.length <= 0) return;

        const { files } = event.currentTarget;

        if (files instanceof FileList) {
            setData('image', files[0]);
        }
    }

    function create(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        post(route('admin.sliders.store'), {
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
                <Button size={'sm'}>+ Novo</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Novo Slider</DialogTitle>
                    <DialogDescription>Escolha uma imagem abaixo e clique em Criar.</DialogDescription>
                </DialogHeader>
                <form onSubmit={create}>
                    <div className="flex flex-col gap-4">
                        <Label className="flex flex-col gap-2">
                            <Input
                                type="file"
                                className={cn('', errors.image && 'border !border-destructive')}
                                onChange={changeFile}
                                accept=".png, .jpeg, .jpg, .webp"
                            />
                            {errors.image && <p className="w-full text-destructive">{errors.image}</p>}

                            <div className="">
                                <div className="w-w-full">
                                    <PreviewImage photo={data.image} />
                                </div>
                            </div>
                        </Label>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex w-full items-center justify-end gap-4">
                        <Button variant={'outline'}>Cancelar</Button>
                        <Button type="submit">
                            {processing ? (
                                <>
                                    <LoaderCircle className="h-4 w-4 animate-spin" /> Aguarde...
                                </>
                            ) : (
                                'Criar'
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
