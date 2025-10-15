import { Header } from '@/components/website/header';
import { PropsWithChildren } from 'react';

interface LayoutProps extends PropsWithChildren {
    pageTitle?: string;
}

export function WebsiteLayout({ children, pageTitle }: LayoutProps) {
    return (
        <>
            <Header pageTitle={pageTitle} />
            {children}
        </>
    );
}
