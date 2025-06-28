export function PreviewImage({ photo }: { photo: File | null | string }) {
    if (photo instanceof File) {
        return <img className="w-full rounded-xl" src={URL.createObjectURL(photo)} />;
    }

    if (photo) {
        return <img className="rounded-xl" src={route('admin.photo-gallery.image', [photo])} />;
    }

    return;
}
