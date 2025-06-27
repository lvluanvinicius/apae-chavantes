import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type User } from '@/types';
import { useForm } from '@inertiajs/react';
import { Edit, LoaderCircle } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

interface UserCreateProps {
    user: User;
}

export function UserUpdate({ user }: UserCreateProps) {
    const [open, setOpen] = useState<boolean>(false);

    const { processing, data, setData, put, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        password: '',
    });

    function save(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        put(route('admin.users.update', [user.id]), {
            onSuccess() {
                reset();
                setOpen(false);
            },
        });
    }

    function validateFieldCompletion() {
        if (data.name.length <= 2) return true;

        return false;
    }

    useEffect(
        function () {
            setData({
                email: user.email,
                name: user.name,
                password: '',
            });
        },
        [setData, user],
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={'icon'}>
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent className="!w-full max-w-[80vh]">
                <DialogHeader className="px-8">
                    <DialogTitle>Novo usuário</DialogTitle>
                    <DialogDescription>Crie um novo usuário</DialogDescription>
                </DialogHeader>

                <form onSubmit={save} className="max-h-[100vh] overflow-auto p-8">
                    <Label className="mb-4 grid grid-cols-1 items-center md:grid-cols-2">
                        <div>
                            <span className="text-muted-foreground">
                                Nome Completo <strong className="text-red-500">*</strong>
                            </span>
                            <p className="mt-2 text-xs text-red-500">{errors.name && errors.name}</p>
                        </div>

                        <div>
                            <Input
                                value={data.name}
                                placeholder="Nome completo"
                                className={cn('h-11', errors.name && '!border-red-600')}
                                onChange={(e) => setData('name', e.currentTarget.value)}
                            />
                        </div>
                    </Label>

                    <Label className="mb-4 grid grid-cols-1 items-center md:grid-cols-2">
                        <div>
                            <span className="text-muted-foreground">
                                E-mail <strong className="text-red-500">*</strong>
                            </span>
                            <p className="mt-2 text-xs text-red-500">{errors.email && errors.email}</p>
                        </div>

                        <div>
                            <Input
                                value={data.email}
                                type="email"
                                placeholder="username@example.com"
                                className={cn('h-11', errors.email && '!border-red-600')}
                                onChange={(e) => setData('email', e.currentTarget.value)}
                            />
                        </div>
                    </Label>

                    <Label className="mb-4 grid grid-cols-1 items-center md:grid-cols-2">
                        <div>
                            <span className="text-muted-foreground">
                                Senha <strong className="text-red-500">*</strong>
                            </span>
                            <p className="mt-2 text-xs text-red-500">{errors.password && errors.password}</p>
                        </div>

                        <div>
                            <Input
                                value={data.password}
                                type="password"
                                placeholder="*****"
                                className={cn('h-11', errors.password && '!border-red-600')}
                                onChange={(e) => setData('password', e.currentTarget.value)}
                            />
                        </div>
                    </Label>

                    <Separator className="my-4" />

                    <div className="flex items-center justify-end">
                        <Button className="w-28" disabled={validateFieldCompletion()}>
                            {processing ? (
                                <>
                                    <LoaderCircle className="h-4 w-4 animate-spin" /> Aguarde...
                                </>
                            ) : (
                                'Atualizar'
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
