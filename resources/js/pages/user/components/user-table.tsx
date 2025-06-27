import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type User } from '@/types';
import { UserTableRow } from './user-table-row';

export function UserTable({ data }: { data: User[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="whitespace-nowrap">ID</TableHead>
                    <TableHead className="whitespace-nowrap">Nome</TableHead>
                    <TableHead className="whitespace-nowrap">E-mail</TableHead>
                    <TableHead className="whitespace-nowrap"></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map(function (d) {
                    return <UserTableRow key={d.id} data={d} />;
                })}
            </TableBody>
        </Table>
    );
}
