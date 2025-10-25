import { WebsiteLayout } from '@/layouts/website';
import { ApiResponse, TransparencyInterface } from '@/types';
import { FileList } from './components/file-list';

interface PageProps {
    data: ApiResponse<TransparencyInterface[]>;
}

export default ({ data }: PageProps) => {
    return (
        <WebsiteLayout>
            <FileList data={data.data} />
        </WebsiteLayout>
    );
};
