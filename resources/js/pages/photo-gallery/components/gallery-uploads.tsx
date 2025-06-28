import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface GalleryUploadsProps {
    galleryId: number;
}

export function GalleryUploads({ galleryId }: GalleryUploadsProps) {
    const [processing, setProcessing] = useState(false);
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [progress, setProgress] = useState<number[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
        setPreviews(acceptedFiles.map((file) => URL.createObjectURL(file)));
        setProgress(acceptedFiles.map(() => 0));
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
        accept: { 'image/*': [] },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('files', files[i]);

            try {
                await axios.post(route('admin.photo-gallery.uploads', [galleryId]), formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (event) => {
                        const percent = Math.round((event.loaded * 100) / (event.total || 1));
                        setProgress((prev) => {
                            const updated = [...prev];
                            updated[i] = percent;
                            return updated;
                        });
                    },
                });
            } catch (err) {
                console.error(`Erro ao enviar ${files[i].name}`, err);
            }
        }

        setFiles([]);
        setPreviews([]);
        setOpen(false);
        setProcessing(false);
        router.reload({
            only: ['data'],
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">Enviar Imagens</Button>
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
                                    {processing && (
                                        <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-medium text-white">
                                            {progress[i] || 0}%
                                        </div>
                                    )}
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
                            disabled={processing}
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
