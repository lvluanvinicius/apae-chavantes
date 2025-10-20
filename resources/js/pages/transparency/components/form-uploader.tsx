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
import { TypeFormMethod } from '@/types';
import { useForm } from '@inertiajs/react';
import { FileIcon, UploadIcon, XIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface FormUploaderProps {
    parentId: string | null;
    method: TypeFormMethod;
}

export function FormUploader({ parentId, method }: FormUploaderProps) {
    const [open, setOpen] = useState(false);

    const { data, setData, errors, post, reset, processing, progress, setError } = useForm({
        files: [] as File[],
        isFile: 'S',
    });

    const { getInputProps, getRootProps, isDragActive } = useDropzone({
        onDrop(acceptedFiles: File[]) {
            setData('files', acceptedFiles);
        },
    });

    const removeFile = (position: number) => {
        const oldFiles = data.files;

        setData(
            'files',
            oldFiles.filter((_, index) => index != position),
        );
    };

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (data.files.length <= 0) {
            setError('files', 'Informe ao menos um arquivo para enviar.');
            return;
        }

        if (method === 'POST') {
            const routeCreate = parentId ? route('admin.transparency.store', parentId) : route('admin.transparency.store');

            post(routeCreate, {
                onSuccess() {
                    reset();
                    setOpen(false);
                },
            });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={'sm'}>
                    <UploadIcon /> Enviar arquivos
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enviar arquivos</DialogTitle>
                    <DialogDescription>Informe os arquivos a serem enviados.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        {/* Campo de título normal */}

                        {/* 5. Área do Dropzone */}
                        <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', marginTop: '10px' }}>
                            <input {...getInputProps()} />
                            {isDragActive ? <p>Solte os arquivos aqui...</p> : <p>Arraste e solte seus documentos aqui, ou clique para selecionar</p>}
                        </div>

                        {/* Mostra os arquivos selecionados */}
                        {data.files.length > 0 && (
                            <ul className="space-y-2 py-4">
                                {data.files.map((file, index) => (
                                    <li key={index} className="flex items-center justify-between gap-1 text-sm">
                                        <div className="flex items-center gap-1">
                                            <FileIcon size={16} className="text-cyan-500" strokeWidth={3} /> {file.name}
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <Button
                                                type="button"
                                                className="h-6 w-4 cursor-pointer"
                                                variant={'ghost'}
                                                onClick={() => removeFile(index)}
                                            >
                                                <XIcon />
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {errors.files && <div style={{ color: 'red' }}>{errors.files}</div>}

                        {/* 6. Barra de progresso do Inertia */}
                        {progress && (
                            <progress value={progress.percentage} max="100" className="w-full">
                                {progress.percentage}%
                            </progress>
                        )}
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
                                }}
                            />
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
