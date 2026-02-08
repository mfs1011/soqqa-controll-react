import { useQuery } from "@tanstack/react-query"
import { getTransactions } from "@/lib/api/transactions"
import type { PaginatedResponse } from "@/types/api/paginated-response"
import type { Transaction, TransactionsQueryParams } from "@/types/transactions"

export function useTransactions(
    params: TransactionsQueryParams
) {
    const query = useQuery<
        PaginatedResponse<Transaction>
    >({
        queryKey: ["transactions", params],
        queryFn: () => getTransactions(params),
    })

    return {
        ...query,
        items: query.data?.data ?? [],
        meta: query?.data?.meta,
    }
}
