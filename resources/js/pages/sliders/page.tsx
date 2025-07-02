import { TablePaginate } from '@/components/table-paginate';
import { Separator } from '@/components/ui/separator';
import { ApiResponse, SliderInterface } from '@/types';
import { CreateSlider } from './components/create-slider';
import { SliderCampaingn } from './components/slider-campaingn';

interface PageProps {
    data: ApiResponse<SliderInterface[]>;
}

export function Page({ data }: PageProps) {
    return (
        <div className="rounded-lg bg-white px-8 py-6 dark:bg-secondary">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <CreateSlider />
                    <SliderCampaingn />
                </div>
                <div />
            </div>
            <Separator className="my-4" />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {data.data.map(function (slider) {
                    return (
                        <div key={slider.id} className="h-44 w-full rounded-xl border p-2 md:h-64">
                            <img
                                className="h-full w-full rounded-[inherit]"
                                src={route('admin.photo-gallery.image', [slider.slider_images['original']])}
                            />
                        </div>
                    );
                })}
            </div>

            <Separator className="my-4" />

            <TablePaginate paginate={data} />
        </div>
    );
}
