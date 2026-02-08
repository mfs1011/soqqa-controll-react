import type { Transaction, TransactionsQueryParams } from "@/types/transactions"
import { buildQuery } from "./build-query"
import { apiFetch } from "./client"
import type { PaginatedResponse } from "@/types/api/paginated-response"

export function getTransactions(
    params: TransactionsQueryParams
): Promise<PaginatedResponse<Transaction>> {
    const query = buildQuery({
        page: params.page,
        limit: params.limit,
        account_id: params.accountId,
        sort: params.sort,
        direction: params.direction,
    })


    return apiFetch(
        `/transactions?${query}`
    )
}

