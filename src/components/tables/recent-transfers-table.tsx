import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatDateTime, formatNumber } from "@/lib/formatters"
import type { Transfer } from "@/types/transfers"

export interface TableTransferHeaders {
    id: string
    createdAt: string,
    fromTo: string,
    description?: string,
    amount: string,
}

export interface TableTransferData {
    headers: TableTransferHeaders,
    items: Transfer[]
}

export function RecentTransferTable({ headers, items }: TableTransferData) {
    return (
        <>
            <Table>
                {/* HEADER */}
                <TableHeader>
                    <TableRow>
                        {Object.entries(headers).map(([key, value]) => (
                            <TableHead key={key} className={key === 'amount' ? 'text-right' : ''}>
                                {value}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                {/* BODY */}
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{formatDateTime(item.createdAt)}</TableCell>
                            <TableCell>{item.fromAccountId} → {item.toAccountId}</TableCell>
                            <TableCell>{item.description || '-'}</TableCell>
                            <TableCell className="text-right font-semibold text-blue-700">{formatNumber(item.amount)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </>
    )
}
