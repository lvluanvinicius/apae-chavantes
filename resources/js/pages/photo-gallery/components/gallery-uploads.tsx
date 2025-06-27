import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface GalleryUploadsProps {
    galleryId: number;
}
export function GalleryUploads({ galleryId }: GalleryUploadsProps) {
    const [processing, setProcessing] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const { post, setData } = useForm({
        files: [] as File[],
    });

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
        setPreviews(acceptedFiles.map((file) => URL.createObjectURL(file)));
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
        accept: {
            'image/*': [],
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        const formData = new FormData();

        files.forEach((file, i) => {
            formData.append(`files[${i}]`, file);
        });

        setData('files', files);

        post(route('admin.photo-gallery.uploads', [galleryId]), {
            forceFormData: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                setFiles([]);
                setPreviews([]);
                setOpen(false);
            },
            onFinish() {
                setProcessing(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">Upload de Imagens</Button>
            </DialogTrigger>

            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Enviar imagens para a galeria</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div
                        {...getRootProps()}
                        className={`cursor-pointer rounded-md border-2 border-dashed p-6 text-center ${
                            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                        }`}
                    >
                        <input {...getInputProps()} />
                        <p>{isDragActive ? 'Solte as imagens aqui…' : 'Arraste ou clique para selecionar imagens'}</p>
                    </div>

                    {previews.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                            {previews.map((src, i) => (
                                <div key={i} className="relative">
                                    <img src={src} alt={`preview-${i}`} className="h-32 w-full rounded object-cover shadow" />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setFiles([]);
                                setPreviews([]);
                                setOpen(false);
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing || files.length === 0}>
                            {processing ? 'Enviando…' : 'Enviar'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
