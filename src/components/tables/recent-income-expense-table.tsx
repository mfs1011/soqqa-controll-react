import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import type { Transaction } from "@/types/transactions"
import { formatDateTime, formatNumber } from "@/lib/formatters"

export interface TableIncomeExpenseHeaders {
    id: string
    createdAt: string
    description?: string
    accountName?: string
    amount: string
}

export interface TableIncomeExpenseData {
    headers: TableIncomeExpenseHeaders,
    items: Transaction[]
}

export function RecentIncomExpenseTable({ headers, items }: TableIncomeExpenseData) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {Object.entries(headers).map(([key, value]) => (
                        <TableHead key={key} className={key === 'amount' ? 'text-right' : ''}>
                            {value}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>

            <TableBody>
                {items.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{formatDateTime(item.createdAt)}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.accountId}</TableCell>
                        <TableCell
                            className={`text-right font-semibold ${item.type === "income"
                                ? "text-green-600"
                                : item.type === "expense"
                                    ? "text-red-600"
                                    : "text-blue-600"
                                }`}
                        >
                            {item.type === "income" && "+"}
                            {item.type === "expense" && "-"}
                            {formatNumber(item.amount)}
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
