import { useTransactions } from "@/hooks/useTransactions"
import { RecentIncomExpenseTable, type TableIncomeExpenseHeaders } from "../tables/recent-income-expense-table"
import { useSearchParams } from "react-router-dom"
import { TablePagination } from "../tables/table-pagination"

export default function RecentTransactionWidget() {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get("transactions_page") ?? "1")
    const limit = Number(searchParams.get("transactions_limit") ?? "10")

    const { items, meta, isLoading, error } = useTransactions({
        page: page,
        limit: limit,
        sort: "id",
        direction: "ASC",
    })

    const incomeExpenseHeaders: TableIncomeExpenseHeaders = {
        id: "ID",
        createdAt: "Date",
        description: "Description",
        accountName: "Account",
        amount: "Amount",
    }

    if (isLoading)
        return <div>Loading...</div>

    if (error)
        return <div>Error loading transactions</div>

    if (!items.length) {
        return <div>No transactions available</div>
    }

    return (
        <div className="flex flex-col gap-4">
            <RecentIncomExpenseTable
                items={items}
                headers={incomeExpenseHeaders}
            />

            {meta && (
                <TablePagination
                    meta={meta}
                    limit={limit}

                    onPageChange={(p) => {
                        const params = new URLSearchParams(searchParams)

                        params.set("transactions_page", String(p))

                        setSearchParams(params)
                    }}

                    onLimitChange={(l) => {
                        const params = new URLSearchParams(searchParams)

                        params.set("transactions_limit", String(l))
                        params.set("transactions_page", "1")
                        setSearchParams(params)
                    }}
                />
            )}
        </div>
    )
}