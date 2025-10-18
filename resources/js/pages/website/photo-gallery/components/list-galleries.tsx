import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PhotoGalleryInterface } from '@/types';
import { Link } from '@inertiajs/react';

interface ListProps {
    galleries: PhotoGalleryInterface[];
}

export default ({ galleries }: ListProps) => {
    return (
        <section className="w-full px-4 py-8 sm:px-0">
            <div className="container mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {galleries.map((gallery) => (
                    <Link href={''} key={gallery.uuid}>
                        <Card title={gallery.gallery_name} className="flex h-[29rem] w-[350px] flex-col justify-between pt-0 pr-0 pl-0">
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
                                    Abrir galeria
                                </Button>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    );
};
