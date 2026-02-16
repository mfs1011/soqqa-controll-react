import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addTransaction, addTransfer, getTransactions } from "@/lib/api/transactions"
import type { PaginatedResponse } from "@/types/api/paginated-response"
import type { Transaction, TransactionsQueryParams } from "@/types/transactions"
import { toast } from "sonner";
import type { Transfer } from "@/types/transfers";

export function useTransactions(
    params: TransactionsQueryParams
) {
    const queryClient = useQueryClient();

    const query = useQuery<
        PaginatedResponse<Transaction>
    >({
        queryKey: ["transactions", params],
        queryFn: () => getTransactions(params),
    })

    // 1. Add transaction Mutation
    const addMut = useMutation({
        mutationFn: (data: Pick<Transaction, "amount" | "description" | "type" | "accountId">) => addTransaction(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            toast.success("Transaction added successfully", {
                description: `Transaction added successfully`,
                duration: 3000,
                position: "top-right",
                className: "bg-green-500 text-white",
            })
        },
        onError: ({ response }: any) => {
            console.log({ response });

            toast.error(`Failed to add transaction ${response.data.message}`, {
                description: "Failed to add transaction",
                duration: 3000,
                position: "top-right",
                className: "bg-red-500 text-white",
            })
        },
    });

    // 2. Add Transfer Mutation
    const addTransferMut = useMutation({
        mutationFn: (data: Pick<Transfer, "fromAccountId" | "toAccountId" | "amount" | "description">) => addTransfer(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transfers'] });
            toast.success("Transfer added successfully", {
                description: `Transfer added successfully`,
                duration: 3000,
                position: "top-right",
                className: "bg-green-500 text-white",
            })
        },
        onError: ({ response }: any) => {
            console.log({ response });

            toast.error(`Failed to add transfer ${response.data.message}`, {
                description: "Failed to add transfer",
                duration: 3000,
                position: "top-right",
                className: "bg-red-500 text-white",
            })
        },
    });


    return {
        ...query,
        items: query.data?.data ?? [],
        meta: query?.data?.meta,
        addTransaction: addMut.mutate,
        isAddingTransaction: addMut.isPending,
        addTransfer: addTransferMut.mutate,
        isAddingTransfer: addTransferMut.isPending,
    }
}
