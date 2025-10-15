import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PhotoGalleryInterface } from '@/types';
import { Link } from '@inertiajs/react';

interface ListProps {
    galleries: PhotoGalleryInterface[];
}

export default ({ galleries }: ListProps) => {
    return (
        <section className="w-full py-8">
            <div className="container mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {galleries.map((gallery) => (
                    <Link href={''} key={gallery.uuid}>
                        <Card title={gallery.gallery_name}>
                            <CardHeader>
                                <CardTitle>{gallery.gallery_name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-center">
                                <div className="h-64 w-[90%] rounded-2xl border sm:h-44 md:h-52">
                                    <img
                                        alt={gallery.gallery_name}
                                        src={route('storage.local', [gallery.gallery_image])}
                                        className="h-full w-full rounded-[inherit] object-cover"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col gap-2">
                                <p className="line-clamp-3">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod minima amet quam optio obcaecati, est beatae
                                    eveniet nisi quo incidunt molestiae harum omnis expedita libero, quidem, in facere! Cupiditate, provident.
                                </p>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    );
};
