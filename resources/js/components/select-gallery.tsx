'use client';

import { cn } from '@/lib/utils';
import { ApiResponse, PhotoGalleryInterface } from '@/types';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export interface OptionSelectGallery {
    label: string;
    value: number;
}

interface SelectGalleryProps {
    selected: OptionSelectGallery | null;
    onSelect: (selected: OptionSelectGallery | null) => void;
}

export function SelectGallery({ selected, onSelect }: SelectGalleryProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [options, setOptions] = useState<OptionSelectGallery[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (!open) return; // só busca com 2+ letras
            setLoading(true);
            fetch(`/photo-gallery-json?q=${search}`)
                .then((res) => res.json())
                .then((data: { data: ApiResponse<PhotoGalleryInterface[]> }) => {
                    const opts = data.data.data.map((d) => ({
                        label: d.gallery_name,
                        value: d.id,
                    })) as OptionSelectGallery[];

                    setOptions(opts);
                })
                .catch(() => setOptions([]))
                .finally(() => setLoading(false));
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [search, open]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn('flex w-full items-center justify-between rounded-md border px-3 py-2', !selected && 'text-muted-foreground')}
                >
                    {selected ? selected.label : 'Selecione uma galeria'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="!z-[99] p-0">
                <div className="p-2">
                    <Input placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.currentTarget.value)} />

                    <div className="mt-2">{loading && <div className="bg-secondary p-1 text-center text-muted-foreground">Buscando...</div>}</div>

                    {!loading && options && options.length === 0 && (
                        <div className="bg-secondary p-1 text-center text-muted-foreground">Nenhuma categoria encontrada.</div>
                    )}

                    <div className="mt-2 flex max-h-60 flex-col gap-1 overflow-y-auto">
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => {
                                    onSelect(opt);
                                    setOpen(false);
                                    setSearch(''); // limpa a busca após selecionar
                                }}
                                className={cn(
                                    'flex items-center rounded-md px-2 py-1 text-left text-sm hover:bg-accent hover:text-accent-foreground',
                                    selected?.value === opt.value && 'bg-accent text-accent-foreground',
                                )}
                            >
                                <Check className={cn('mr-2 h-4 w-4', selected?.value === opt.value ? 'opacity-100' : 'opacity-0')} />
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
