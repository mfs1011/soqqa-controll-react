import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon } from "lucide-react";

export default function Accounts() {
	const accounts = [
		{
			id: 1,
			name: "Account 1",
			amount: 1000,
			createdAt: "2024-01-01",
		},
		{
			id: 2,
			name: "Account 2",
			amount: 2000,
			createdAt: "2024-01-02",
		},
		{
			id: 3,
			name: "Account 3",
			amount: 3000,
			createdAt: "2024-01-03",
		},
		{
			id: 4,
			name: "Account 4",
			amount: 4000,
			createdAt: "2024-01-04",
		}
	];

	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">
				Accounts
			</h2>

			{/* Cards shu yerga */}
			<div className="grid grid-cols-4 gap-6">
				{accounts.map(account => (
					<Card key={account.id}>
						<CardContent>
							<div className="flex flex-col gap-3">
								<h3 className="text-lg font-semibold">
									{account.name}
								</h3>
								<p className="text-3xl font-semibold">
									${account.amount}
								</p>
								<div className="mt-2 flex items-center justify-between">
									<p className="text-green-600 text-sm flex items-center">24% <ArrowUpIcon size={16} /></p>
									<p className="text-gray-500 text-sm ml-auto">
										Created: {account.createdAt}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}
