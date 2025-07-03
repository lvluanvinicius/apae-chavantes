import { Toaster } from '@/components/ui/sonner';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function ApaeSonner() {
    const { flash } = usePage().props;
    const responseMessage = flash as {
        success?: string;
        error?: string;
    };

    useEffect(
        function () {
            if (responseMessage.error) {
                toast.error(responseMessage.error, {
                    className: 'bg-white dark:bg-secondary',
                });
            }

            if (responseMessage.success) {
                toast.success(responseMessage.success, {
                    className: 'bg-white dark:bg-secondary',
                });
            }
        },
        [responseMessage],
    );

    return <Toaster closeButton richColors position="top-right" />;
}
