import { TypeFormMethod } from '@/types';
import { LoaderCircleIcon } from 'lucide-react';

export default ({
    processing,
    messages,
    action,
}: {
    processing: boolean;
    action: TypeFormMethod;
    messages?: {
        creating?: string;
        updating?: string;
        deleting?: string;
        create?: string;
        update?: string;
        destroy?: string;
    };
}) => {
    if (processing) {
        return (
            <>
                <LoaderCircleIcon className="h-4 w-4 animate-spin" />
                {action === 'POST' && messages?.creating}
                {action === 'PUT' && messages?.updating}
                {action === 'DELETE' && messages?.deleting}
            </>
        );
    }

    if (action === 'DELETE') {
        return <>{messages?.destroy || 'Excluir'}</>;
    }

    if (action === 'POST') {
        return <>{messages?.create || 'Criar'}</>;
    }

    if (action === 'PUT') {
        return <>{messages?.update || 'Atualizar'}</>;
    }
};
