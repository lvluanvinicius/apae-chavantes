import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import { ApaeLayout } from '@/layouts/apae-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Painel de Controle',
        href: '/dashboard',
    },
    {
        title: 'Aparência',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <ApaeLayout breadcrumbs={breadcrumbs} title="Configurações">
            <Head title="Configurações | Aparência" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Aparência" description="Atualize as configurações de aparência da sua conta" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </ApaeLayout>
    );
}
