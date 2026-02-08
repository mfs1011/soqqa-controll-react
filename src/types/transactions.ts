export interface TransactionsQueryParams {
    page: number
    limit: number
    accountId?: number
    sort?: string
    direction?: "ASC" | "DESC"
}

export interface Transaction {
    id: number
    accountId: number
    type: 'income' | 'expense'
    amount: number
    description?: string
    createdAt: string
    createdBy?: number
}