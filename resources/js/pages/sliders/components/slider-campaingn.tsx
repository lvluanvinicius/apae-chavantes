import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { dateExtFormatter, formatDateTimeMask } from '@/tools/formatter';
import { SliderCampaignInterface } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { FormEvent, useState } from 'react';

export function SliderCampaingn() {
    const [open, setOpen] = useState<boolean>(true);
    const [search, setSearch] = useState<string | null>(null);

    const { data } = useQuery({
        queryKey: ['slider-campaigns', search],
        queryFn: async () => {
            const response = await axios.get<{ data: SliderCampaignInterface[] }>('/sliders-campaign');

            if (response.status === 200 && response.data) {
                return response.data.data;
            }

            return null;
        },
        enabled: !!open,
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'outline'} size={'sm'}>
                    Campanhas
                </Button>
            </DialogTrigger>

            <DialogContent className="md:!max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Novo Slider</DialogTitle>
                    <DialogDescription>Escolha uma imagem abaixo e clique em Criar.</DialogDescription>
                </DialogHeader>

                <div className="h-[50vh] overflow-auto">
                    <div className="flex w-full items-center gap-4">
                        <div>
                            <Input className="h-9" value={search || ''} onChange={(e) => setSearch(e.currentTarget.value)} placeholder="Buscar..." />
                        </div>
                        <CreateSliderCampaingn />
                    </div>
                    <TableSliderCampaingn data={data} />
                </div>

                <DialogFooter className="flex w-full items-center justify-end gap-4">
                    <Button variant={'outline'}>Fechar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function TableSliderCampaingn({ data }: { data: SliderCampaignInterface[] | null | undefined }) {
    return (
        <Table>
            <TableHeader className="">
                <TableRow className="">
                    <TableHead className="border-b-4 py-4 whitespace-nowrap">ID</TableHead>
                    <TableHead className="border-b-4 py-4 whitespace-nowrap">Descrição</TableHead>
                    <TableHead className="border-b-4 py-4 whitespace-nowrap">Status</TableHead>
                    <TableHead className="border-b-4 py-4 whitespace-nowrap">Início</TableHead>
                    <TableHead className="border-b-4 py-4 whitespace-nowrap">Fim</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {!data && (
                    <TableRow>
                        <TableCell className="border-b-4 py-3 whitespace-nowrap">
                            <Skeleton className="h-7 w-full" />
                        </TableCell>
                        <TableCell className="border-b-4 py-3 whitespace-nowrap">
                            <Skeleton className="h-7 w-full" />
                        </TableCell>
                        <TableCell className="border-b-4 py-3 whitespace-nowrap">
                            <Skeleton className="h-7 w-full" />
                        </TableCell>
                        <TableCell className="border-b-4 py-3 whitespace-nowrap">
                            <Skeleton className="h-7 w-full" />
                        </TableCell>
                        <TableCell className="border-b-4 py-3 whitespace-nowrap">
                            <Skeleton className="h-7 w-full" />
                        </TableCell>
                    </TableRow>
                )}

                {data &&
                    data.map(function (d) {
                        return (
                            <TableRow key={d.id}>
                                <TableCell className="border-b-4 py-4 whitespace-nowrap">{d.id}</TableCell>
                                <TableCell className="border-b-4 py-4 whitespace-nowrap">{d.description}</TableCell>
                                <TableCell className="border-b-4 py-4 whitespace-nowrap">
                                    <span className="rounded bg-green-500 px-4 py-1">{d.is_running ? 'Rodando' : 'Parado'}</span>
                                </TableCell>
                                <TableCell className="border-b-4 py-4 whitespace-nowrap">{dateExtFormatter(d.start_date)}</TableCell>
                                <TableCell className="border-b-4 py-4 whitespace-nowrap">{dateExtFormatter(d.end_date)}</TableCell>
                            </TableRow>
                        );
                    })}
            </TableBody>
        </Table>
    );
}

function CreateSliderCampaingn() {
    const [open, setOpen] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);
    const [data, setData] = useState({
        description: '',
        start_date: '',
        end_date: '',
    });

    function onSetData(field: keyof typeof data, value: string) {
        setData((state) => {
            return {
                ...state,
                [field]: value,
            };
        });
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setProcessing(true);

        console.log(data);
        setProcessing(true);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'outline'} className="h-9">
                    + Criar
                </Button>
            </DialogTrigger>

            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Novo Slider</DialogTitle>
                    <DialogDescription>Escolha uma imagem abaixo e clique em Criar.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Label className="flex w-full flex-col gap-2">
                        <span className="text-muted-foreground">
                            Descrição
                            <strong className="text-red-500">*</strong>
                        </span>
                        <Input
                            placeholder="Descrição da campanha"
                            value={data.description}
                            onChange={(e) => onSetData('description', e.currentTarget.value)}
                        />
                    </Label>
                    <Label className="flex w-full flex-col gap-2">
                        <span className="text-muted-foreground">
                            Data de Início
                            <strong className="text-red-500">*</strong>
                        </span>
                        <Input
                            placeholder="Descrição da campanha"
                            value={formatDateTimeMask(data.start_date)}
                            onChange={(e) => onSetData('start_date', e.currentTarget.value)}
                        />
                    </Label>
                    <Label className="flex w-full flex-col gap-2">
                        <span className="text-muted-foreground">
                            Data Final
                            <strong className="text-red-500">*</strong>
                        </span>
                        <Input
                            placeholder="Descrição da campanha"
                            value={formatDateTimeMask(data.end_date)}
                            onChange={(e) => onSetData('end_date', e.currentTarget.value)}
                        />
                    </Label>
                    <Separator className="my-4" />
                    <DialogFooter className="flex w-full items-center justify-end gap-4">
                        <Button variant={'outline'} size={'sm'}>
                            Fechar
                        </Button>
                        <Button type="submit" size={'sm'}>
                            {processing ? (
                                <>
                                    <LoaderCircle className="h-4 w-4 animate-spin" /> Aguarde...
                                </>
                            ) : (
                                'Criar'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
