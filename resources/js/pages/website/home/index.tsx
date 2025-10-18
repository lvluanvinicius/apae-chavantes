import { WebsiteLayout } from '@/layouts/website';
import { Carousel } from './components/carousel';
import { SectionGalleries } from './components/section-galleries';

export default () => {
    return (
        <WebsiteLayout>
            <Carousel />
            <SectionGalleries />
        </WebsiteLayout>
    );
};
