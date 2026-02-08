import { useTotals } from "@/hooks/useTotals"
import { Card, CardContent } from "../ui/card"
import { formatNumber } from "@/lib/formatters"

export default function TotalsWidget() {
    const { data, isLoading, error } = useTotals()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error loading totals</div>
    }

    if (!data) {
        return <div>No data available</div>
    }

    return (
        <div className="flex gap-6">
            <Card className="flex-1">
                <CardContent>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold">Total Balance</h3>
                        <p className="text-3xl font-semibold">
                            {formatNumber(data.totalBalance)}
                        </p>
                    </div>
                </CardContent>
            </Card>
            <Card className="flex-1">
                <CardContent>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold">Total Income</h3>
                        <p className="text-3xl font-semibold text-green-700">
                            {formatNumber(data.totalIncome)}
                        </p>
                    </div>
                </CardContent>
            </Card>
            <Card className="flex-1">
                <CardContent>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold">Total Expense</h3>
                        <p className="text-3xl font-semibold text-red-700 ">
                            {formatNumber(data.totalExpense)}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
