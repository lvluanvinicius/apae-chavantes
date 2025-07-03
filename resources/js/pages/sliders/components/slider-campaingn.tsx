import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { messages } from '@/data/messages';
import { cn } from '@/lib/utils';
import { queryClient } from '@/services/react-query';
import { convertISOToBRDateTime, dateExtFormatter, formatToDateTime } from '@/tools/formatter';
import { ActionsResponse, SliderCampaignInterface } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Edit, LoaderCircle } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

export function SliderCampaingn() {
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string | null>(null);

    const { data } = useQuery({
        queryKey: ['slider-campaigns', search],
        queryFn: async () => {
            const response = await axios.get<{ data: SliderCampaignInterface[] }>('/sliders-campaign', { params: { search } });

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
                                    <span className={cn('rounded px-4 py-1', d.is_running ? 'bg-green-500' : 'bg-gray-500')}>
                                        {d.is_running ? 'Rodando' : 'Parado'}
                                    </span>
                                </TableCell>
                                <TableCell className="border-b-4 py-4 whitespace-nowrap">{dateExtFormatter(d.start_date)}</TableCell>
                                <TableCell className="border-b-4 py-4 whitespace-nowrap">{dateExtFormatter(d.end_date)}</TableCell>
                                <TableCell className="border-b-4 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <UpdateSliderCampaingn campaign={d} />
                                    </div>
                                </TableCell>
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
    const [errors, setErrors] = useState<Record<keyof typeof data, string> | null>(null);

    function onSetData(field: keyof typeof data, value: string) {
        setData((state) => {
            return {
                ...state,
                [field]: value,
            };
        });
    }

    const { mutateAsync: create } = useMutation({
        mutationFn: async function () {
            try {
                const response = await axios.post<ActionsResponse<[]>>('/sliders-campaign', data);

                if (response.status === 200 && response.data) {
                    if (response.data.status) {
                        setProcessing(false);
                        setOpen(false);
                        setData({
                            description: '',
                            end_date: '',
                            start_date: '',
                        });
                        queryClient.invalidateQueries({
                            queryKey: ['slider-campaigns'],
                        });
                        return toast.success(response.data.message);
                    } else {
                        throw new Error(response.data.message);
                    }
                }

                throw new Error(messages.frontend.axiosUnknown);
            } catch (error) {
                if (error instanceof AxiosError && error.response) {
                    const response = error.response.data as ActionsResponse<[]>;

                    if (error.response.status === 422) {
                        // const errors = error.response.
                        setProcessing(false);
                        return setErrors(response.errors as Record<keyof typeof data, string> | null);
                    }

                    return toast.error(response.message);
                }

                if (error instanceof Error && error) {
                    setProcessing(false);
                    return toast.error(error.message);
                }

                toast.error(messages.frontend.axiosUnknown);
                setProcessing(false);
            }
        },
    });

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setProcessing(true);

        await create();
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
                    <DialogTitle>Nova Campanha de Slider</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Label className="flex w-full flex-col gap-2">
                        <span className="text-muted-foreground">
                            Descrição
                            <strong className="text-red-500">*</strong>
                        </span>
                        <Input
                            className={cn('', errors?.description && 'border-red-600')}
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
                            className={cn('', errors?.start_date && 'border-red-600')}
                            placeholder="Descrição da campanha"
                            value={formatToDateTime(data.start_date)}
                            onChange={(e) => onSetData('start_date', e.currentTarget.value)}
                        />
                    </Label>
                    <Label className="flex w-full flex-col gap-2">
                        <span className="text-muted-foreground">
                            Data Final
                            <strong className="text-red-500">*</strong>
                        </span>
                        <Input
                            className={cn('', errors?.end_date && 'border-red-600')}
                            placeholder="Descrição da campanha"
                            value={formatToDateTime(data.end_date)}
                            onChange={(e) => onSetData('end_date', e.currentTarget.value)}
                        />
                    </Label>
                    <Separator className="my-4" />
                    <DialogFooter className="flex w-full items-center justify-end gap-4">
                        <Button type="button" onClick={() => setOpen(false)} variant={'outline'} size={'sm'}>
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

function UpdateSliderCampaingn({ campaign }: { campaign: SliderCampaignInterface }) {
    console.log(campaign);

    const [open, setOpen] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);
    const [data, setData] = useState({
        description: campaign.description,
        start_date: convertISOToBRDateTime(campaign.start_date),
        end_date: convertISOToBRDateTime(campaign.end_date),
    });
    const [errors, setErrors] = useState<Record<keyof typeof data, string> | null>(null);

    function onSetData(field: keyof typeof data, value: string) {
        setData((state) => {
            return {
                ...state,
                [field]: value,
            };
        });
    }

    const { mutateAsync: create } = useMutation({
        mutationFn: async function () {
            try {
                const response = await axios.put<ActionsResponse<[]>>(`/sliders-campaign/${campaign.id}`, data);

                if (response.status === 200 && response.data) {
                    if (response.data.status) {
                        setProcessing(false);
                        setOpen(false);
                        setData({
                            description: '',
                            end_date: '',
                            start_date: '',
                        });
                        queryClient.invalidateQueries({
                            queryKey: ['slider-campaigns'],
                        });
                        return toast.success(response.data.message);
                    } else {
                        throw new Error(response.data.message);
                    }
                }

                throw new Error(messages.frontend.axiosUnknown);
            } catch (error) {
                if (error instanceof AxiosError && error.response) {
                    const response = error.response.data as ActionsResponse<[]>;

                    if (error.response.status === 422) {
                        // const errors = error.response.
                        setProcessing(false);
                        return setErrors(response.errors as Record<keyof typeof data, string> | null);
                    }

                    return toast.error(response.message);
                }

                if (error instanceof Error && error) {
                    setProcessing(false);
                    return toast.error(error.message);
                }

                toast.error(messages.frontend.axiosUnknown);
                setProcessing(false);
            }
        },
    });

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setProcessing(true);

        await create();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'outline'} className="h-9">
                    <Edit />
                </Button>
            </DialogTrigger>

            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Nova Campanha de Slider</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Label className="flex w-full flex-col gap-2">
                        <span className="text-muted-foreground">
                            Descrição
                            <strong className="text-red-500">*</strong>
                        </span>
                        <Input
                            className={cn('', errors?.description && 'border-red-600')}
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
                            className={cn('', errors?.start_date && 'border-red-600')}
                            placeholder="Descrição da campanha"
                            value={formatToDateTime(data.start_date)}
                            onChange={(e) => onSetData('start_date', e.currentTarget.value)}
                        />
                    </Label>
                    <Label className="flex w-full flex-col gap-2">
                        <span className="text-muted-foreground">
                            Data Final
                            <strong className="text-red-500">*</strong>
                        </span>
                        <Input
                            className={cn('', errors?.end_date && 'border-red-600')}
                            placeholder="Descrição da campanha"
                            value={formatToDateTime(data.end_date)}
                            onChange={(e) => onSetData('end_date', e.currentTarget.value)}
                        />
                    </Label>
                    <Separator className="my-4" />
                    <DialogFooter className="flex w-full items-center justify-end gap-4">
                        <Button type="button" onClick={() => setOpen(false)} variant={'outline'} size={'sm'}>
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
