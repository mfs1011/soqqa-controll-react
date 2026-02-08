import { useYearlyTotals } from "@/hooks/useYearlyTotals"
import { IncomeExpenseChart } from "../income-expense_chart"
import { useSearchParams } from "react-router-dom"

export default function YearlyTotalsWidget() {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get("year") ?? new Date().getFullYear())

    const { data, isLoading, error } = useYearlyTotals({
        year: page,
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error loading totals</div>
    }

    if (!data) {
        return <div>No data available</div>
    }

    // return (
    //     <pre>{JSON.stringify(data, null, 2)}</pre>
    // )

    return (
        <IncomeExpenseChart data={data} year={page} onChangeYear={(year: any) => setSearchParams({ year: String(year) })} />
    )
}
