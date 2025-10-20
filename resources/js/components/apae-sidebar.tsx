import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NavSidebarItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Camera, Eye, FileText, Globe, Heart, Home, Image, Newspaper, Trash, Users, X } from 'lucide-react';
import { useTheme } from './theme-provider';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

function checkPath(path: string, compare: string) {
    const r = path.split('/');
    return r[1].replaceAll(' ', '') === compare;
}

export default function ApaeSidebar({ isOpen, toggleSidebar }: SidebarProps) {
    const { theme } = useTheme();

    const { url } = usePage();

    const menuItems: NavSidebarItem[] = [
        { href: '/dashboard', icon: Home, title: 'Painel', isActive: checkPath(url, 'dashboard') },
        { href: '/', icon: Globe, title: 'Website', isActive: checkPath(url, '') },
        { href: '/photo-gallery', icon: Camera, title: 'Galeria de Fotos', isActive: checkPath(url, 'photo-gallery') },
        { href: '/transparency', icon: Eye, title: 'Transparência', isActive: checkPath(url, '') },
        { href: '/', icon: Users, title: 'Parceiros', isActive: checkPath(url, '') },
        { href: '/', icon: Newspaper, title: 'Notícias', isActive: checkPath(url, '') },
        { href: '/sliders', icon: Image, title: 'Sliders', isActive: checkPath(url, '') },
        { href: '/', icon: FileText, title: 'Estatuto', isActive: checkPath(url, '') },
        { href: '/users', icon: Users, title: 'Usuários', isActive: checkPath(url, 'users') },
        { href: '/trash', icon: Trash, title: 'Lixeira', isActive: checkPath(url, 'trash') },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={toggleSidebar} />}

            {/* Sidebar */}
            <div
                className={cn(
                    'fixed inset-y-0 left-0 z-50 lg:relative',
                    'w-64 bg-gradient-to-b from-primary to-primary',
                    theme != 'light' && 'bg-secondary',
                    'transform transition-transform duration-300 ease-in-out',
                    'border-r shadow-xl',
                    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-primary-foreground/20 p-6">
                        <div className="flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground">
                                <Heart className="h-6 w-6 fill-current text-primary" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-primary-foreground">APAE</h1>
                                <p className="text-xs text-primary-foreground/80">Administração</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSidebar}
                            className="text-primary-foreground hover:bg-primary-foreground/20 lg:hidden"
                        >
                            <X size={20} />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2 px-4 py-6">
                        {menuItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <Link key={index} href={item.href}>
                                    <Button
                                        className={cn(
                                            'h-12 w-full cursor-pointer justify-start space-x-3 bg-transparent',
                                            item.isActive
                                                ? 'bg-primary-foreground/20 text-primary-foreground shadow-sm hover:bg-primary-foreground/10'
                                                : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground',
                                        )}
                                    >
                                        <Icon size={20} />
                                        <span className="font-medium">{item.title}</span>
                                    </Button>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    {/* <div className="border-t border-primary-foreground/20 p-4">
                        <div className="rounded-lg bg-primary-foreground/10 p-3 text-center">
                            <p className="mb-1 text-xs text-primary-foreground/80">Luan Santos</p>
                            <p className="text-sm font-semibold text-primary-foreground">v2.1.0</p>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}
