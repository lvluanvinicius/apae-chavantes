import { WebsiteLayout } from '@/layouts/website';
import { ApiResponse, PhotoGalleryInterface } from '@/types';
import ListGalleries from './components/list-galleries';

interface PageProps {
    data: ApiResponse<PhotoGalleryInterface[]>;
}

export default ({ data }: PageProps) => {
    return (
        <WebsiteLayout>
            <ListGalleries galleries={data.data} />
        </WebsiteLayout>
    );
};
