import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { PermissionSectionInterface } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { KeyRound, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

export function UserPermissions({ userId, userPermissions = [] }: { userId: number; userPermissions: string[] }) {
    const [open, setOpen] = useState<boolean>(false);

    const { permissions } = usePage().props;
    const secPermissions = { sections: permissions } as { sections: PermissionSectionInterface[] };

    const { put, data, setData, processing } = useForm({
        permissions: userPermissions,
    });

    function update() {
        put(route('admin.users.permissions.update', [userId]), {
            onSuccess() {
                setOpen(false);
            },
        });
    }

    function handleSelect(value: string) {
        if (data.permissions.includes(value)) {
            setData(
                'permissions',
                data.permissions.filter((perm) => perm != value),
            );
        } else {
            setData('permissions', [...data.permissions, value]);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={'icon'}>
                    <KeyRound />
                </Button>
            </DialogTrigger>
            <DialogContent className="flex h-full max-h-[100vh] w-full max-w-[100vw] flex-col gap-4 md:!max-h-[80vh] md:!max-w-[50vw]">
                <DialogHeader className="">
                    <DialogTitle>Editar permissões</DialogTitle>
                    <DialogDescription>Atualize as permissões do usuário.</DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-auto p-4">
                    <div className="grid grid-cols-2 items-start gap-4 md:grid-cols-3 xl:grid-cols-5">
                        {secPermissions.sections.map(function (sec) {
                            return (
                                <div className="flex flex-col gap-4" key={sec.id}>
                                    <span>{sec.title}</span>
                                    <ul className="flex flex-col gap-3">
                                        {sec.permissions &&
                                            sec.permissions.map(function (perm) {
                                                return (
                                                    <li key={perm.id}>
                                                        <Label className="flex cursor-pointer flex-nowrap items-center gap-2">
                                                            <Checkbox
                                                                value={perm.permission}
                                                                checked={data.permissions.includes(perm.permission)}
                                                                onCheckedChange={() => handleSelect(perm.permission)}
                                                            />
                                                            <span className="text-muted-foreground">{perm.description}</span>
                                                        </Label>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={() => setOpen(false)} variant={'outline'}>
                        Cancelar
                    </Button>
                    <Button onClick={update}>
                        {processing ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animate-spin" /> Aguarde...
                            </>
                        ) : (
                            'Atualizar'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
