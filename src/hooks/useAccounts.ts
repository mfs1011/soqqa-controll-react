import { getAccounts, deleteAccount, updateAccount } from "@/lib/api/accounts";
import type { AccountsQueryParams } from "@/types/accounts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
        onSuccess: () => {
            // Ro'yxatni yangilash
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
        },
        onError: () => alert("O'chirishda xatolik yuz berdi")
    });

    // 3. Edit Mutation
    const editMut = useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => updateAccount(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
        },
        onError: () => alert("Yangilashda xatolik yuz berdi")
    });

    return {
        ...query,
        items: query.data?.data ?? [],
        meta: query?.data?.meta,
        // Mutatsiyalarni tashqariga chiqaramiz
        deleteAccount: deleteMut.mutate,
        isDeleting: deleteMut.isPending,
        editAccount: editMut.mutate,
        isEditing: editMut.isPending
    }
}