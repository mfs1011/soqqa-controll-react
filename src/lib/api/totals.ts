import type { TotalsResponse } from "@/types/totals"
import { apiFetch } from "./client"
import type { ItemResponse } from "@/types/api/paginated-response"

export function getTotals(): Promise<ItemResponse<TotalsResponse>> {
    return apiFetch(
        `/dashboard/totals`
    )
}