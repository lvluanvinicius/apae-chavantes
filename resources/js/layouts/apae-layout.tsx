import ApaeHeader from '@/components/apae-header';
import Sidebar from '@/components/apae-sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { ApaeSonner } from '@/hooks/apae-sonner';
import { type BreadcrumbItem } from '@/types';
import { PropsWithChildren, ReactNode, useState } from 'react';

interface ApaeLayout extends PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }> {
    children: ReactNode;
    title: string;
}

export function ApaeLayout({ children, title, breadcrumbs = [] }: ApaeLayout) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <ThemeProvider defaultTheme="light" storageKey="appearance">
            <ApaeSonner />

            <div className="flex h-screen bg-background">
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                <div className="flex flex-1 flex-col overflow-hidden">
                    <ApaeHeader breadcrumbs={breadcrumbs} toggleSidebar={toggleSidebar} title={title} />

                    <main className="flex-1 overflow-y-auto p-6">{children}</main>
                </div>
            </div>
        </ThemeProvider>
    );
}
