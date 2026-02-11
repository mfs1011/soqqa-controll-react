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

export function deleteAccount(id: number): Promise<void> {
    return apiClient.delete(`/accounts/${id}`)
}

export function updateAccount(id: string, data: Omit<Account, "name">): Promise<Account> {
    return apiClient.patch(`/accounts/${id}`, data)
}
