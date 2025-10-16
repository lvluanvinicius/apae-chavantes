import { Button } from '@/components/ui/button';
import { transformSearchParams } from '@/tools/urls';
import { router, usePage } from '@inertiajs/react';
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface PaginateProps {
    paginate: {
        current_page: number;
        total: number;
        per_page: number;
    };
}

export default ({ paginate }: PaginateProps) => {
    const { url } = usePage();
    const totalPages = Math.ceil(paginate.total / paginate.per_page);

    const handlePaginate = (action: 'previous' | 'next' | 'last' | 'first') => {
        const params: Record<string, string | number> = {};
        const uri = url.split('?')[0];
        const currentQuery = url.split('?')[1];
        // Inserindo todos os parametros dentro do objeto params.
        new URLSearchParams(currentQuery).forEach((v, k) => (params[k] = v));

        switch (action) {
            case 'next':
                if (params.page) {
                    const p = parseInt(params.page as string);

                    if (p < totalPages) {
                        params.page = p + 1;
                    }
                } else {
                    params.page = 2;
                }
                break;

            case 'previous':
                if (params.page) {
                    const p = parseInt(params.page as string);

                    if (p <= 2) {
                        delete params.page;
                    } else {
                        params.page = p - 1;
                    }
                }
                break;

            case 'last':
                params.page = totalPages;
                break;

            case 'first':
                delete params.page;
                break;

            default:
                break;
        }

        router.get(`${uri}?${transformSearchParams({ ...params })}`);
    };

    return (
        <section>
            <div className="container mx-auto flex justify-center rounded-xl bg-white p-4 dark:bg-secondary">
                <div className="flex items-center gap-2">
                    <Button size={'icon'} title="Página anterior" onClick={() => handlePaginate('first')} disabled={paginate.current_page <= 1}>
                        <ChevronFirstIcon />
                    </Button>
                    <Button size={'icon'} title="Primeira página" onClick={() => handlePaginate('previous')} disabled={paginate.current_page <= 1}>
                        <ChevronLeftIcon />
                    </Button>

                    <Button
                        size={'icon'}
                        title="Próxima página"
                        onClick={() => handlePaginate('next')}
                        disabled={paginate.current_page >= totalPages}
                    >
                        <ChevronRightIcon />
                    </Button>
                    <Button size={'icon'} title="Última página" onClick={() => handlePaginate('last')} disabled={paginate.current_page >= totalPages}>
                        <ChevronLastIcon />
                    </Button>
                </div>
            </div>
        </section>
    );
};
