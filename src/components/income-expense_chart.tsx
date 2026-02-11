
import { useState } from "react"
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ChartSpline, ChartBar } from "lucide-react"
import { formatNumber } from "@/lib/formatters"

export function IncomeExpenseChart({ data, year, onChangeYear }: any) {
    const [chartType, setChartType] = useState<"line" | "bar">("line")

    const MOTH_NAMES = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Yillar ro'yxati (Buni props orqali ham berish mumkin)
    const yearOptions = Array.from({ length: 2026 - 2010 + 1 }, (_, i) => 2010 + i);

    const formatYAxis = (value: number) => {
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
        return value.toString();
    };

    const commonProps = {
        data: data,
        margin: { top: 10, right: 10, left: 10, bottom: 0 }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <CardTitle className="text-lg font-semibold">
                        Income & Expense Totals
                    </CardTitle>

                    <div className="flex items-center gap-3">
                        {/* Yil tanlash Select */}
                        <Select
                            value={String(year)}
                            onValueChange={(v) => onChangeYear?.(Number(v))}
                        >
                            <SelectTrigger className="w-fit">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {yearOptions.reverse().map((option) => (
                                        <SelectItem key={option} value={String(option)}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* Chart Type Toggle */}
                        <div className="flex items-center gap-1 border rounded-md p-1 bg-muted/50">
                            <Button
                                variant={chartType === "line" ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setChartType("line")}
                                className="h-8 w-8 p-0"
                            >
                                <ChartSpline className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={chartType === "bar" ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setChartType("bar")}
                                className="h-8 w-8 p-0"
                            >
                                <ChartBar className="h-4 w-4 -rotate-x-180 rotate-z-90" />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        {chartType === "line" ? (
                            <LineChart {...commonProps}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="month"
                                    tickFormatter={(v) => MOTH_NAMES[v - 1]}
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={10}
                                />
                                <YAxis
                                    tickFormatter={formatYAxis}
                                    tickLine={false}
                                    axisLine={false}
                                    width={60}
                                />
                                <Tooltip
                                    formatter={(value) => [formatNumber(Number(value)), "Amount"]}
                                    labelFormatter={(label) => `Month: ${MOTH_NAMES[label - 1]}`}
                                />
                                <Legend verticalAlign="top" height={36} iconType="line" />
                                <Line
                                    name="Income"
                                    type="monotone"
                                    dataKey="totalIncome"
                                    stroke="#16a34a"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: "#16a34a" }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    name="Expense"
                                    type="monotone"
                                    dataKey="totalExpense"
                                    stroke="#dc2626"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: "#dc2626" }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        ) : (
                            <BarChart {...commonProps}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="month"
                                    tickFormatter={(v) => MOTH_NAMES[v - 1]}
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={10}
                                />
                                <YAxis
                                    tickFormatter={formatYAxis}
                                    tickLine={false}
                                    axisLine={false}
                                    width={60}
                                />
                                <Tooltip
                                    formatter={(value) => [formatNumber(Number(value)), "Amount"]}
                                    labelFormatter={(label) => `Month: ${MOTH_NAMES[label - 1]}`}
                                />
                                <Legend verticalAlign="top" height={36} iconType="square" />
                                <Bar
                                    name="Income"
                                    dataKey="totalIncome"
                                    fill="#16a34a"
                                    radius={[4, 4, 0, 0]}
                                    barSize={30}
                                />
                                <Bar
                                    name="Expense"
                                    dataKey="totalExpense"
                                    fill="#dc2626"
                                    radius={[4, 4, 0, 0]}
                                    barSize={30}
                                />
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}