import type { TotalsResponse } from "@/types/totals"
import apiClient from "./client"
import type { ItemResponse } from "@/types/api/paginated-response"

export function getTotals(): Promise<ItemResponse<TotalsResponse>> {
    return apiClient.get(`/dashboard/totals`)
}