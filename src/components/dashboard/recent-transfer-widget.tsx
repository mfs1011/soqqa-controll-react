import { useTransfers } from "@/hooks/useTransfers"
import { useSearchParams } from "react-router-dom"
import { TablePagination } from "../tables/table-pagination"
import { RecentTransferTable, type TableTransferHeaders } from "../tables/recent-transfers-table"

export default function RecentTransferWidget({ pagination = false }: { pagination?: boolean }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get("transfers_page") ?? "1")
    const limit = Number(searchParams.get("transfers_limit") ?? "10")

    const { items, meta, isLoading, error } = useTransfers({
        page: page,
        limit: limit,
        sort: "id",
        direction: "ASC",
    })

    const transferHeaders: TableTransferHeaders = {
        id: "ID",
        createdAt: "Date",
        fromTo: "From → To",
        description: "Description",
        amount: "Amount",
    }

    if (isLoading)
        return <div>Loading...</div>

    if (error)
        return <div>Error loading transactions</div>

    if (!items.length) {
        return <div className="min-h-40 flex items-center justify-center">No transfers available</div>
    }

    return (
        <div className="flex flex-col gap-4">
            {/* <pre>{JSON.stringify({ items, meta, isLoading, error }, null, 2)}</pre> */}

            <RecentTransferTable
                items={items}
                headers={transferHeaders}
            />

            {pagination && meta && (
                <TablePagination
                    meta={meta}
                    limit={limit}

                    onPageChange={(p) => {
                        const params = new URLSearchParams(searchParams)

                        params.set("transfers_page", String(p))

                        setSearchParams(params)
                    }}

                    onLimitChange={(l) => {
                        const params = new URLSearchParams(searchParams)

                        params.set("transfers_limit", String(l))
                        params.set("transfers_page", "1")
                        setSearchParams(params)
                    }}
                />
            )}
        </div>
    )

}