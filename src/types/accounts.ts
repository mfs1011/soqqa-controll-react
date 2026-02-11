export interface AccountsQueryParams {
    page: number
    limit: number
}

export interface Account {
    id: number,
    name: string,
    ownerId: number,
    balance: number,
    createdById: number,
    createdAt: number,
}