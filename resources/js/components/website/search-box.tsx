import { cn } from '@/lib/utils';
import { LucideCommand } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

const dataLinks = [
    {
        uuid: 'lk01',
        href: 'http://blog-dev.apaechavantes.org.br:8001',
        title: 'Início',
        group: null,
    },
    {
        uuid: 'lk02',
        href: 'http://blog-dev.apaechavantes.org.br:8001',
        title: 'Blog',
        group: 'Blog',
    },
    {
        uuid: 'lk03',
        href: 'http://blog-dev.apaechavantes.org.br:8001/festa-de-natal',
        title: 'Festa de Natal',
        group: 'Blog',
    },
];

export const SearchBox = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    const links = useMemo(() => {
        return dataLinks.filter((lk) => lk.title.toLocaleUpperCase().includes(search.toLocaleUpperCase()));
    }, [search]);

    useEffect(() => {
        if (window) {
            window.addEventListener('keydown', function (event: KeyboardEvent) {
                if (event.ctrlKey && event.key === 'k') {
                    event.preventDefault();
                    setOpen(!open);
                }
            });
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="relative cursor-pointer">
                    {/* <Input type="search" className="h-10 !bg-white disabled:!bg-white dark:bg-background" disabled placeholder="Buscar..." /> */}
                    <div className={cn('flex h-10 min-w-56 items-center rounded-md bg-white px-4 text-muted-foreground/40 dark:bg-background')}>
                        Buscar...
                    </div>
                    <LucideCommand className="absolute top-2 right-3 text-muted-foreground/40" />
                </div>
            </DialogTrigger>

            <DialogContent className="rounded-md !bg-background">
                <DialogHeader>
                    <DialogTitle>Buscar</DialogTitle>
                    <DialogDescription>Procure por artigos ou paginas específicas.</DialogDescription>
                </DialogHeader>

                <div className="w-full space-y-4">
                    <Input
                        type="search"
                        className="h-11 bg-background"
                        placeholder="Digite algo..."
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                    />

                    <ScrollArea>
                        <div className="flex flex-col">
                            {links.map((lk) => (
                                <a key={lk.uuid} href={lk.href} className="rounded-md px-4 py-2 text-sm hover:bg-secondary">
                                    {'-> '}
                                    {lk.title}
                                </a>
                            ))}
                        </div>
                        <ScrollBar orientation="vertical" />
                    </ScrollArea>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant={'outline'}>
                            Fechar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
