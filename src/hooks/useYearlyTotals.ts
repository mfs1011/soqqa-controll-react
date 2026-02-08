import { useQuery } from "@tanstack/react-query"
import type { PaginatedResponse } from "@/types/api/paginated-response"
import { getYearlyTotals } from "@/lib/api/yearly-income-expense-totals"
import type { YearlyTotalResponse } from "@/types/yearly-totals"

export function useYearlyTotals(params: { year?: number }) {
    const query = useQuery<
        PaginatedResponse<YearlyTotalResponse>
    >({
        queryKey: ["yearly-totals", params],
        queryFn: () => getYearlyTotals(params),
    })

    return {
        ...query,
        data: query.data?.data,
    }
}
