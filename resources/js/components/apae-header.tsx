import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SharedData, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { LogOut, Menu, Settings } from 'lucide-react';
import { Breadcrumbs } from './breadcrumbs';

interface HeaderProps {
    toggleSidebar: () => void;
    breadcrumbs?: BreadcrumbItemType[];
    title: string;
}
export default function ApaeHeader({ toggleSidebar, title, breadcrumbs = [] }: HeaderProps) {
    const { auth } = usePage<SharedData>().props;

    const signOut = () => {
        router.post(route('logout'));
    };

    return (
        <header className="border-b bg-card px-6 py-4 shadow-sm dark:bg-secondary">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
                        <Menu size={20} />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">{title}</h1>
                        {/* <p className="text-sm text-muted-foreground">Bem-vindo ao sistema administrativo</p> */}
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    {/* <Button variant="ghost" size="icon" className="relative">
                        <Bell size={20} />
                        <Badge className="absolute -top-1 -right-1 h-2 w-2 bg-destructive p-0">
                            <span className="sr-only">Notificações</span>
                        </Badge>
                    </Button> */}

                    <div className="flex items-center space-x-3 border-l pl-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex h-auto items-center space-x-2 p-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-primary text-primary-foreground">A</AvatarFallback>
                                    </Avatar>
                                    <div className="hidden text-left md:block">
                                        <p className="text-sm font-medium">Administrador</p>
                                        <p className="text-xs text-muted-foreground">{auth.user.email}</p>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel></DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link href={route('profile.edit')}>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Configurações</span>
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={signOut}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sair</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
}
