import { PreviewImage } from '@/components/preview-photo';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { SliderInterface } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react';
import { DeleteSlider } from './delete-slider';

interface UpdateSliderProps {
    slider: SliderInterface;
    children: ReactNode;
}

export function UpdateSlider({ slider, children }: UpdateSliderProps) {
    const [open, setOpen] = useState<boolean>(false);

    const [imageString, setImageString] = useState<string | null>(slider.slider_images.original);

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

    /**
     * Chama a Ação de atualizar o slider.
     */
    function update(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        post(route('admin.sliders.update', [slider.id]), {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess() {
                reset();
                setOpen(false);
            },
        });
    }

    /**
     * Efetua chamada de atualização do status do slider.
     */
    function activeAndInactive() {
        router.put(
            route('admin.sliders.active-and-inactive', [slider.id]),
            {},
            {
                onSuccess() {
                    reset();
                    setOpen(false);
                },
            },
        );
    }

    useEffect(
        function () {
            if (open) {
                setImageString(slider.slider_images.original);
            }
        },
        [setImageString, imageString, open, slider],
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Atualizar Slider</DialogTitle>
                    <DialogDescription>Escolha outra imagem e clique em Atualizar.</DialogDescription>
                </DialogHeader>
                <form onSubmit={update}>
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
                                    <PreviewImage photo={data.image || imageString} />
                                </div>
                            </div>
                        </Label>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex w-full items-center justify-end gap-4">
                        <Button type="button" onClick={() => activeAndInactive()} variant={slider.slider_active ? 'destructive' : 'default'}>
                            {slider.slider_active ? 'Desativar' : 'Ativar'}
                        </Button>
                        <DeleteSlider sliderId={slider.id} />

                        <Button type="submit" variant={'secondary'}>
                            {processing ? (
                                <>
                                    <LoaderCircle className="h-4 w-4 animate-spin" /> Aguarde...
                                </>
                            ) : (
                                'Atualizar'
                            )}
                        </Button>
                        <Button type="button" variant={'outline'}>
                            Cancelar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
