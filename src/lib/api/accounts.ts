import { buildQuery } from "./build-query"
import apiClient from "./client"
import type { PaginatedResponse } from "@/types/api/paginated-response"
import type { AccountsQueryParams, Account } from "@/types/accounts"

export function getAccounts(
    params: AccountsQueryParams
): Promise<PaginatedResponse<Account>> {
    const query = buildQuery({
        page: params.page,
        limit: params.limit,
    })

    return apiClient.get(`/accounts?${query}`)
}

export function deleteAccount(id: number): Promise<{ account_id: number }> {
    return apiClient.delete(`/accounts/${id}`)
}

export function updateAccount(id: number, data: Partial<Account>): Promise<Account> {
    return apiClient.patch(`/accounts/${id}`, data)
}

export function addAccount(data: Pick<Account, "name">): Promise<Account> {
    return apiClient.post('/accounts', data)
}