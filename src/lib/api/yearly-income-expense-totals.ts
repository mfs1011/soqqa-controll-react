import { apiFetch } from "./client"
import type { PaginatedResponse } from "@/types/api/paginated-response"
import type { YearlyTotalResponse } from "@/types/yearly-totals"

export function getYearlyTotals(params: { year?: number }): Promise<PaginatedResponse<YearlyTotalResponse>> {
    return apiFetch(
        `/dashboard/yearly-income-expense-transactions?year=${params.year ?? new Date().getFullYear()}`
    )
}