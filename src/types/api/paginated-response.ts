export interface PaginationMeta {
    total: number
    page: number
    lastPage: number
    limit: number
}

export interface PaginatedResponse<T> {
    data: T[]
    meta: PaginationMeta
    status: string
    message: string
}

export interface ItemResponse<T> {
    data: T
    status: string
    message: string
}

