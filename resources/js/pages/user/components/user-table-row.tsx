import { TableCell, TableRow } from '@/components/ui/table';
import { type User } from '@/types';
import { UserDelete } from './user-delete';
import { UserPermissions } from './user-permissions';
import { UserUpdate } from './user-update';

export function UserTableRow({ data }: { data: User }) {
    return (
        <TableRow>
            <TableCell className="whitespace-nowrap">{data.id}</TableCell>
            <TableCell className="whitespace-nowrap">{data.name}</TableCell>
            <TableCell className="whitespace-nowrap">{data.email}</TableCell>
            <TableCell className="whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <UserUpdate user={data} />
                    <UserPermissions userId={data.id} userPermissions={data.permissions ? JSON.parse(data.permissions) : []} />
                    <UserDelete userId={data.id} />
                </div>
            </TableCell>
        </TableRow>
    );
}
