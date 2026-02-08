import { useQuery } from "@tanstack/react-query"
import type { PaginatedResponse } from "@/types/api/paginated-response"
import type { TransactionsQueryParams } from "@/types/transactions"
import { getTransfers } from "@/lib/api/transfers"
import type { Transfer } from "@/types/transfers"

export function useTransfers(
    params: TransactionsQueryParams
) {
    const query = useQuery<
        PaginatedResponse<Transfer>
    >({
        queryKey: ["transfers", params],
        queryFn: () => getTransfers(params),
    })

    return {
        ...query,
        items: query.data?.data ?? [],
        meta: query?.data?.meta,
    }
}
