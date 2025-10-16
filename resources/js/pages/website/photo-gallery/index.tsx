import { WebsiteLayout } from '@/layouts/website';
import { ApiResponse, PhotoGalleryInterface } from '@/types';
import GalleryPaginate from './components/gallery-paginate';
import ListGalleries from './components/list-galleries';

interface PageProps {
    data: ApiResponse<PhotoGalleryInterface[]>;
}

export default ({ data }: PageProps) => {
    const { current_page, total, per_page } = data;

    return (
        <WebsiteLayout>
            <ListGalleries galleries={data.data} />
            <GalleryPaginate paginate={{ current_page, total, per_page }} />
        </WebsiteLayout>
    );
};
