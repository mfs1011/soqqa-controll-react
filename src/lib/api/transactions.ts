import type { Transaction, TransactionsQueryParams } from "@/types/transactions"
import { buildQuery } from "./build-query"
import apiClient from "./client"
import type { PaginatedResponse } from "@/types/api/paginated-response"
import type { Transfer } from "@/types/transfers"

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


    return apiClient.get(`/transactions?${query}`)
}

export function addTransaction(data: Pick<Transaction, "amount" | "description" | "type" | "accountId">): Promise<Transaction> {
    return apiClient.post('/transactions/income_expense', data)
}

export function addTransfer(data: Pick<Transfer, "fromAccountId" | "toAccountId" | "amount" | "description">): Promise<Transfer> {
    return apiClient.post('/transactions/transfer', data)
}