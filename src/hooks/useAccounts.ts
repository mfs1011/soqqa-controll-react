import { getAccounts, deleteAccount, updateAccount, addAccount } from "@/lib/api/accounts";
import type { Account, AccountsQueryParams } from "@/types/accounts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAccounts = (params: AccountsQueryParams) => {
    const queryClient = useQueryClient();

    // 1. Data Fetching
    const query = useQuery({
        queryKey: ['accounts', params],
        queryFn: () => getAccounts(params),
    });

    // 2. Delete Mutation
    const deleteMut = useMutation({
        mutationFn: (id: number) => deleteAccount(id),
        onSuccess: ({ account_id }: { account_id: number }) => {
            // Ro'yxatni yangilash
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            toast.success("Account deleted successfully", {
				description: `Account with ${JSON.stringify(account_id, null, 2)} added successfully`,
				duration: 3000,
				position: "top-right",
				className: "bg-green-500 text-white",
			})
        },
        onError: () => alert("O'chirishda xatolik yuz berdi")
    });

    // 3. Edit Mutation
    const editMut = useMutation({
        mutationFn: ({ id, name }: Pick<Account, 'id' | 'name'>) => updateAccount(id, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
        },
        onError: () => alert("Yangilashda xatolik yuz berdi")
    });

    // 4. Add Mutation
    const addMut = useMutation({
        mutationFn: (data: Pick<Account, 'name'>) => addAccount(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            toast.success("Account added successfully", {
				description: `Account added successfully`,
				duration: 3000,
				position: "top-right",
				className: "bg-green-500 text-white",
			})
        },
        onError: (data: any) => {
            toast.error(`Failed to add account ${JSON.stringify(data.message, null, 2)}`, {
				description: "Failed to add account",
				duration: 3000,
				position: "top-right",
				className: "bg-red-500 text-white overflow-scroll",
			})
        },
    });

    return {
        ...query,
        items: query.data?.data ?? [],
        meta: query?.data?.meta,
        // Mutatsiyalarni tashqariga chiqaramiz
        deleteAccount: deleteMut.mutate,
        isDeleting: deleteMut.isPending,
        editAccount: editMut.mutate,
        isEditing: editMut.isPending,
        addAccount: addMut.mutate,
        isAdding: addMut.isPending
    }
}