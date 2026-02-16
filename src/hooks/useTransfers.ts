import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { PaginatedResponse } from "@/types/api/paginated-response"
import type { TransactionsQueryParams } from "@/types/transactions"
import { getTransfers } from "@/lib/api/transfers"
import type { Transfer } from "@/types/transfers"
import { addTransfer } from "@/lib/api/transactions"
import { toast } from "sonner"

export function useTransfers(
    params: TransactionsQueryParams
) {
    const queryClient = useQueryClient();
    const query = useQuery<
        PaginatedResponse<Transfer>
    >({
        queryKey: ["transfers", params],
        queryFn: () => getTransfers(params),
    })



    // 1. Add Transfer Mutation
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
        addTransfer: addTransferMut.mutate,
        isAddingTransfer: addTransferMut.isPending,
    }
}
