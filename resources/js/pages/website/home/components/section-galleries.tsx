import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { PhotoGalleryInterface } from '@/types';
import { usePage } from '@inertiajs/react';

export const SectionGalleries = () => {
    const { galleries } = usePage<{ galleries: PhotoGalleryInterface[] }>().props;

    return (
        <section className="flex h-full min-h-[80vh] w-full flex-col justify-center bg-white py-8 dark:bg-transparent">
            <div className="container mx-auto space-y-8 px-4 sm:px-0 md:space-y-16">
                <div className="w-full">
                    <h2 className="text-xl font-bold md:text-2xl">Galeria de fotos</h2>
                    <p className="text-sm md:text-[1rem]">Veja em nossa galeria, os registros de um dos nossos melhores momentos.</p>
                </div>

                <ScrollArea className="relative w-full">
                    <div className="mb-8 flex items-center gap-8">
                        {galleries.map((gallery) => (
                            <Card
                                title={gallery.gallery_name}
                                className="flex h-[29rem] w-[350px] flex-col justify-between pt-0 pr-0 pl-0 shadow-md shadow-muted-foreground dark:shadow-none"
                            >
                                <CardContent className="flex h-64 w-full items-center justify-center p-0">
                                    <img
                                        alt={gallery.gallery_name}
                                        src={route('storage.local', [gallery.gallery_image])}
                                        className="h-full w-full rounded-t-xl object-cover"
                                    />
                                </CardContent>
                                <CardHeader className="flex-1">
                                    <CardTitle>{gallery.gallery_name}</CardTitle>
                                </CardHeader>
                                <CardFooter className="flex-col gap-4">
                                    <p className="line-clamp-3">{gallery.gallery_description}</p>

                                    <Button className="w-full cursor-pointer dark:bg-secondary" title="Abrir galeria">
                                        Ver na galeria
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </section>
    );
};
