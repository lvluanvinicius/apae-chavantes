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
                        <Card title={gallery.gallery_name} className="pt-0 pr-0 pl-0">
                            <CardContent className="flex h-64 w-full items-center justify-center p-0">
                                <img
                                    alt={gallery.gallery_name}
                                    src={route('storage.local', [gallery.gallery_image])}
                                    className="h-full w-full rounded-t-xl object-cover"
                                />
                            </CardContent>
                            <CardHeader>
                                <CardTitle>{gallery.gallery_name}</CardTitle>
                            </CardHeader>
                            <CardFooter className="flex-col gap-4">
                                <p className="line-clamp-3">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod minima amet quam optio obcaecati, est beatae
                                    eveniet nisi quo incidunt molestiae harum omnis expedita libero, quidem, in facere! Cupiditate, provident.
                                </p>

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
