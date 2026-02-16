import { create } from "zustand"

interface TransactionAddModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    onToggle: () => void
}

export const useTransactionAddModal = create<TransactionAddModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))