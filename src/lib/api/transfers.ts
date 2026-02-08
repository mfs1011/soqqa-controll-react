import { buildQuery } from "./build-query"
import { apiFetch } from "./client"
import type { PaginatedResponse } from "@/types/api/paginated-response"
import type { Transfer, TransfersQueryParams } from "@/types/transfers"

export function getTransfers(
    params: TransfersQueryParams
): Promise<PaginatedResponse<Transfer>> {
    const query = buildQuery({
        page: params.page,
        limit: params.limit,
        from_id: params.fromId,
        sort: params.sort,
        direction: params.direction,
    })


    return apiFetch(
        `/transactions/transfers?${query}`
    )
}

