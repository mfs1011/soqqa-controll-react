export interface TransfersQueryParams {
    page: number
    limit: number
    fromId?: number
    sort?: string
    direction?: "ASC" | "DESC"
}

export interface Transfer {
    id: number
    fromAccountId: number
    toAccountId: number,
    amount: number
    description?: string
    createdAt: string
    createdBy?: number
}