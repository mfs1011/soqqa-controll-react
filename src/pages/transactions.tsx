import RecentTransactionWidget from "@/components/dashboard/recent-transaction-widget"
import RecentTransferWidget from "@/components/dashboard/recent-transfer-widget"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTransactionAddModal } from "@/store/use-transaction-add-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAccounts } from "@/hooks/useAccounts"
import type { Account } from "@/types/accounts"
import { FieldLabel } from "@/components/ui/field"
import { TransactionType } from "@/enums/TransactionType"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTransactions } from "@/hooks/useTransactions"

export default function Transactions() {
    const [searchParams, setSearchParams] = useSearchParams()
    const activeTab = searchParams.get("tab") ?? "income-expense"

    const isOpen = useTransactionAddModal((state) => state.isOpen)
    const { addTransaction, addTransfer } = useTransactions({ page: 1, limit: 10 })

    return (
        <div className="flex flex-col gap-4">
            <TransactionAddModal
                isOpen={isOpen}
                onTransactionAccept={(payload) => addTransaction(payload)}
                onTransferAccept={(payload) => addTransfer(payload)}
            />
            <h2 className="text-2xl font-bold">
                Transactions
            </h2>
            <Card>
                <CardContent>
                    <Tabs
                        value={activeTab}
                        onValueChange={(value) => {
                            const params =
                                new URLSearchParams(searchParams)

                            params.set("tab", value)

                            setSearchParams(params)
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <TabsList>
                                <TabsTrigger value="income-expense">Income & Expense</TabsTrigger>
                                <TabsTrigger value="transfers">Transfers</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="income-expense">
                            <RecentTransactionWidget pagination />
                        </TabsContent>

                        <TabsContent value="transfers">
                            <RecentTransferWidget pagination />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}

interface TransactionCreatePayload {
    accountId: number,
    type: "income" | "expense",
    amount: number,
    description: string,
}

interface TransferCreatePayload {
    fromAccountId: number,
    toAccountId: number,
    amount: number,
    description: string,
}

const TransactionAddModal = ({
    isOpen,
    onTransactionAccept,
    onTransferAccept
}: {
    isOpen: boolean,
    onTransactionAccept: (payload: TransactionCreatePayload) => void,
    onTransferAccept: (payload: TransferCreatePayload) => void
}) => {
    const onClose = useTransactionAddModal((state) => state.onClose)
    const [activeTab, setActiveTab] = useState("income-expense")

    const [incomeExpensePayload, setIncomeExpensePayload] = useState<TransactionCreatePayload>({
        accountId: 0,
        type: "income",
        amount: 0,
        description: "",
    })

    const [transferPayload, setTransferPayload] = useState<TransferCreatePayload>({
        fromAccountId: 0,
        toAccountId: 0,
        amount: 0,
        description: "",
    })
    // ** Validation holati
    const [incomeExpenseErrors, setIncomeExpenseErrors] = useState<Partial<Record<keyof TransactionCreatePayload, string>>>({})
    const [transferErrors, setTransferErrors] = useState<Partial<Record<keyof TransferCreatePayload, string>>>({})

    // ** Formani tekshirish funksiyasi
    const validateIncomeExpense = () => {
        const newErrors: typeof incomeExpenseErrors = {}

        if (!incomeExpensePayload.accountId || incomeExpensePayload.accountId === 0) {
            newErrors.accountId = "Iltimos, hisobni tanlang"
        }
        if (!incomeExpensePayload.amount || incomeExpensePayload.amount <= 0) {
            newErrors.amount = "Summa 0 dan katta bo'lishi kerak"
        }
        if (!incomeExpensePayload.description || incomeExpensePayload.description.trim().length < 3) {
            newErrors.description = "Tavsif kamida 3 ta belgidan iborat bo'lsin"
        }

        setIncomeExpenseErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const validateTransfer = () => {
        const newErrors: typeof transferErrors = {}

        if (!transferPayload.fromAccountId || transferPayload.fromAccountId === 0) {
            newErrors.fromAccountId = "Iltimos, chiqish hisobini tanlang"
        }
        if (!transferPayload.toAccountId || transferPayload.toAccountId === 0) {
            newErrors.toAccountId = "Iltimos, kirish hisobini tanlang"
        }
        if (transferPayload.fromAccountId === transferPayload.toAccountId) {
            newErrors.toAccountId = "Chiqish va kirish hisoblari bir xil bo'lishi mumkin emas"
        }
        if (!transferPayload.amount || transferPayload.amount <= 0) {
            newErrors.amount = "Summa 0 dan katta bo'lishi kerak"
        }
        if (!transferPayload.description || transferPayload.description.trim().length < 3) {
            newErrors.description = "Tavsif kamida 3 ta belgidan iborat bo'lsin"
        }

        setTransferErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleAccept = () => {
        if (activeTab === "income-expense") {
            if (validateIncomeExpense()) {
                onTransactionAccept(incomeExpensePayload) // Ma'lumotlarni yuborish mantiqi
                setIncomeExpensePayload({
                    accountId: 0,
                    type: "income",
                    amount: 0,
                    description: "",
                }) // Formani tozalash
                onClose()  // Faqat validationdan o'tsa modal yopiladi
            }
        } else {
            if (validateTransfer()) {
                onTransferAccept(transferPayload)
                setTransferPayload({
                    fromAccountId: 0,
                    toAccountId: 0,
                    amount: 0,
                    description: "",
                }) // Formani tozalash
                onClose()  // Faqat validationdan o'tsa modal yopiladi
            }
        }
    }

    useEffect(() => {
        // Tab o'zgarganda xatolarni tozalash
        if (activeTab === "income-expense") {
            setIncomeExpenseErrors({})
        } else {
            setTransferErrors({})
        }
    }, [activeTab]) // Payload o'zgarganda validation xatolarini yangilash uchun (ixtiyoriy)

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) onClose() // Tashqarini bossa ham yopish (agar xohlasangiz)
            }}
        >
            <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
                {/* onPointerDownOutside => Modal tashqarisini bosganda yopilmasligi uchun */}

                <Tabs
                    value={activeTab}
                    onValueChange={(value) => {
                        setActiveTab(value)
                    }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <TabsList>
                            <TabsTrigger value="income-expense">Income & Expense</TabsTrigger>
                            <TabsTrigger value="transfers">Transfers</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="income-expense">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Transaction Type */}
                            <div className="flex flex-col gap-1 col-span-1">
                                <FieldLabel className="w-full">Transaction type *</FieldLabel>
                                <Select
                                    value={incomeExpensePayload.type}
                                    onValueChange={(v) => setIncomeExpensePayload({ ...incomeExpensePayload, type: v as "income" | "expense" })}
                                >
                                    <SelectTrigger className={`w-full ${incomeExpenseErrors.type ? "border-red-500" : ""}`}>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(TransactionType).map((item) => (
                                            <SelectItem key={item} value={item}>{item}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Account Select */}
                            <div className="flex flex-col gap-1 col-span-1">
                                <FieldLabel className="w-full">Account *</FieldLabel>
                                <Select
                                    value={incomeExpensePayload.accountId ? String(incomeExpensePayload.accountId) : ""}
                                    onValueChange={(v) => {
                                        setIncomeExpensePayload({ ...incomeExpensePayload, accountId: Number(v) })
                                        setIncomeExpenseErrors({ ...incomeExpenseErrors, accountId: "" }) // Xatoni tozalash
                                    }}
                                >
                                    <SelectTrigger className={`w-full ${incomeExpenseErrors.accountId ? "border-red-500" : ""}`}>
                                        <SelectValue placeholder="Select account" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {useAccounts({ page: 1, limit: 100 }).items.map((item: Account) => (
                                            <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {incomeExpenseErrors.accountId && <span className="text-xs text-red-500">{incomeExpenseErrors.accountId}</span>}
                            </div>

                            {/* Amount Input */}
                            <div className="flex flex-col gap-1 col-span-1">
                                <FieldLabel className="w-full">Amount *</FieldLabel>
                                <Input
                                    type="number"
                                    className={incomeExpenseErrors.amount ? "border-red-500" : ""}
                                    value={incomeExpensePayload.amount}
                                    onChange={({ target }) => {
                                        setIncomeExpensePayload({ ...incomeExpensePayload, amount: Number(target.value) })
                                        setIncomeExpenseErrors({ ...incomeExpenseErrors, amount: "" })
                                    }}
                                />
                                {incomeExpenseErrors.amount && <span className="text-xs text-red-500">{incomeExpenseErrors.amount}</span>}
                            </div>

                            {/* Description Textarea */}
                            <div className="flex flex-col gap-1 col-span-2">
                                <FieldLabel className="w-full">Description *</FieldLabel>
                                <Textarea
                                    className={`h-32 ${incomeExpenseErrors.description ? "border-red-500" : ""}`}
                                    placeholder="Oylik oldim / Internetga to'ladim"
                                    value={incomeExpensePayload.description}
                                    onChange={({ target }) => {
                                        setIncomeExpensePayload({ ...incomeExpensePayload, description: target.value })
                                        setIncomeExpenseErrors({ ...incomeExpenseErrors, description: "" })
                                    }}
                                />
                                {incomeExpenseErrors.description && <span className="text-xs text-red-500">{incomeExpenseErrors.description}</span>}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="transfers">
                        <div className="grid grid-cols-2 gap-4">
                            {/* From Account Select */}
                            <div className="flex flex-col gap-1 col-span-1">
                                <FieldLabel className="w-full">From Account *</FieldLabel>
                                <Select
                                    value={transferPayload.fromAccountId ? String(transferPayload.fromAccountId) : ""}
                                    onValueChange={(v) => {
                                        setTransferPayload({ ...transferPayload, fromAccountId: Number(v) })
                                        setTransferErrors({ ...transferErrors, fromAccountId: "" }) // Xatoni tozalash
                                    }}
                                >
                                    <SelectTrigger className={`w-full ${transferErrors.fromAccountId ? "border-red-500" : ""}`}>
                                        <SelectValue placeholder="Select account" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {useAccounts({ page: 1, limit: 100 }).items.map((item: Account) => (
                                            <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {transferErrors.fromAccountId && <span className="text-xs text-red-500">{transferErrors.fromAccountId}</span>}
                            </div>

                            {/* To Account Select */}
                            <div className="flex flex-col gap-1 col-span-1">
                                <FieldLabel className="w-full">To Account *</FieldLabel>
                                <Select
                                    value={transferPayload.toAccountId ? String(transferPayload.toAccountId) : ""}
                                    onValueChange={(v) => {
                                        setTransferPayload({ ...transferPayload, toAccountId: Number(v) })
                                        setTransferErrors({ ...transferErrors, toAccountId: "" }) // Xatoni tozalash
                                    }}
                                >
                                    <SelectTrigger className={`w-full ${transferErrors.toAccountId ? "border-red-500" : ""}`}>
                                        <SelectValue placeholder="Select account" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {useAccounts({ page: 1, limit: 100 }).items.map((item: Account) => (
                                            <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {transferErrors.toAccountId && <span className="text-xs text-red-500">{transferErrors.toAccountId}</span>}
                            </div>

                            {/* Amount Input */}
                            <div className="flex flex-col gap-1 col-span-1">
                                <FieldLabel className="w-full">Amount *</FieldLabel>
                                <Input
                                    type="number"
                                    className={transferErrors.amount ? "border-red-500" : ""}
                                    value={transferPayload.amount}
                                    onChange={({ target }) => {
                                        setTransferPayload({ ...transferPayload, amount: Number(target.value) })
                                        setTransferErrors({ ...transferErrors, amount: "" })
                                    }}
                                />
                                {transferErrors.amount && <span className="text-xs text-red-500">{transferErrors.amount}</span>}
                            </div>

                            {/* Description Textarea */}
                            <div className="flex flex-col gap-1 col-span-2">
                                <FieldLabel className="w-full">Description *</FieldLabel>
                                <Textarea
                                    className={`h-32 ${transferErrors.description ? "border-red-500" : ""}`}
                                    placeholder="Oylik oldim / Internetga to'ladim"
                                    value={transferPayload.description}
                                    onChange={({ target }) => {
                                        setTransferPayload({ ...transferPayload, description: target.value })
                                        setTransferErrors({ ...transferErrors, description: "" })
                                    }}
                                />
                                {transferErrors.description && <span className="text-xs text-red-500">{transferErrors.description}</span>}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>


                <DialogFooter>
                    {/* Close tugmasi yopishda davom etadi */}
                    <Button variant="outline" onClick={onClose}>Close</Button>

                    {/* Accept tugmasidan DialogClose olib tashlandi */}
                    <Button variant="default" onClick={handleAccept}>Accept</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}