import { ThreeDotsDropdown } from "@/components/ThreeDotsDropdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAccounts } from "@/hooks/useAccounts";
import { formatDate, formatNumber } from "@/lib/formatters";
import type { Account } from "@/types/accounts";
import { ArrowUpIcon, CheckIcon, PencilIcon, SquarePlusIcon, TrashIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { type SubmitEvent } from "react";
import { toast } from "sonner";

export default function Accounts() {
	const [searchParams, setSearchParams] = useSearchParams()
	const page = Number(searchParams.get("page") ?? "1")
	const limit = Number(searchParams.get("limit") ?? "10")
	const [editedAccountId, setEditedAccountId] = useState<number | null>(null)
	const [editedAccountName, setEditedAccountName] = useState<string>("")
	const [deletingAccountId, setDeletingAccountId] = useState<number | null>(null)
	const [isOpenAddAccountModal, setIsOpenAddAccountModal] = useState<boolean>(false)

	const { items, isLoading, error, deleteAccount, editAccount, addAccount } = useAccounts({
		page,
		limit,
	});

	const handleEdit = (account: Account) => {
		console.log("Edit bosildi", account.id)
		setEditedAccountName(account.name)
		setEditedAccountId(account.id)
	}

	const handleDelete = (id: number) => {
		setDeletingAccountId(id)
	}

	const onCancel = () => {
		setEditedAccountId(null)
		setEditedAccountName("")
	}

	const onSave = () => {
		editAccount(editedAccountId, editedAccountName)

		setEditedAccountId(null)
		setEditedAccountName("")
	}

	const onAddAccount = async (accountName: string) => {
		await addAccount({ name: accountName })
		setIsOpenAddAccountModal(false)
	}

	const openAddAccountModal = () => {
		setIsOpenAddAccountModal(true);
	}

	if (isLoading)
		return <div>Loading...</div>

	if (error)
		return <div>Error loading accounts</div>

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">
					Accounts
				</h2>
				<div>
					<Button onClick={openAddAccountModal}>
						<SquarePlusIcon />
						Add Account
					</Button>
				</div>
			</div>

			<AddAccountModal
				isOpen={isOpenAddAccountModal}
				setIsOpen={(open) => {
					if (!open) setIsOpenAddAccountModal(false)
				}}
				onSubmit={onAddAccount}
			/>

			{items.length === 0 ? (
				<div className="text-center text-gray-500 py-10">
					No accounts found.
				</div>
			) : (
				<>
					<DialogModal
						isOpen={!!deletingAccountId}
						setIsOpen={(open) => {
							if (!open) setDeletingAccountId(null)
						}}
						onAccept={() => deleteAccount(deletingAccountId!)}
					/>

					{/* Cards shu yerga */}
					<div className="grid grid-cols-3 gap-4">
						{items.map(account => (
							<Card key={account.id} className="flex-1">
								<CardContent>
									<div className="flex flex-col gap-3">
										<div className="flex items-center justify-between">
											<h3 className="text-lg font-semibold">
												{editedAccountId === account.id ? (
													<div className="flex items-center gap-1">
														<Input defaultValue={account.name} autoFocus value={editedAccountName} onChange={({ target }) => setEditedAccountName(target.value)} />
														<Button
															variant="default" size="icon"
															className="size-6 ml-2"
															disabled={account.name === editedAccountName}
															onClick={onSave}
														>
															<CheckIcon className="size-4" />
														</Button>
														<Button variant="default" size="icon" className="size-6" onClick={onCancel}>
															<XIcon className="size-4" />
														</Button>
													</div>
												) : (
													account.name
												)}
											</h3>
											<ThreeDotsDropdown actions={[
												{
													label: "Edit",
													icon: <PencilIcon className="size-4" />,
													onClick: () => handleEdit(account),
													showSeparator: true,
												},
												{
													label: "Delete",
													icon: <TrashIcon className="size-4" />,
													onClick: () => handleDelete(account.id),
													variant: "destructive" as const,
												},
											]}
											/>
										</div>
										<p className="text-3xl font-semibold">
											{formatNumber(account.balance)}
										</p>
										<div className="mt-2 flex items-center justify-between">
											<p className="text-green-600 text-sm flex items-center">24% <ArrowUpIcon size={16} /></p>
											<p className="text-gray-500 text-sm ml-auto">
												{formatDate(new Date(account.createdAt))}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</>
			)}
		</div>
	)
}

function DialogModal({ isOpen, setIsOpen, onAccept }: { isOpen: boolean; setIsOpen: (open: boolean) => void, onAccept?: () => void }) {
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Account</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this account?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Close</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button variant="default" onClick={onAccept}>Accept</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

function AddAccountModal({ isOpen, setIsOpen, onSubmit }: { isOpen: boolean; setIsOpen: (open: boolean) => void, onSubmit: (accountName: string) => void }) {
	const [accountName, setAccountName] = useState<string>("")

	const onAdd = async(e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		onSubmit(accountName)
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<form onSubmit={onAdd} className="flex flex-col gap-4">
					<DialogHeader>
						<DialogTitle>Add Account</DialogTitle>
					</DialogHeader>
						
					<div>
						<Input placeholder="Account Name Example: Naqd, Karta ..." value={accountName} onChange={({ target }) => setAccountName(target.value)} />
					</div>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Close</Button>
						</DialogClose>
						<Button type="submit" variant="default">Add</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}