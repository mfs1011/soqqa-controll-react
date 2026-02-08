import { useQuery } from "@tanstack/react-query"
import { getTotals } from "@/lib/api/totals"
import type { TotalsResponse } from "@/types/totals"
import type { ItemResponse } from "@/types/api/paginated-response"

export function useTotals() {
    const query = useQuery<
        ItemResponse<TotalsResponse>
    >({
        queryKey: ["totals"],
        queryFn: () => getTotals(),
    })

    return {
        ...query,
        data: query.data?.data,
    }
}
