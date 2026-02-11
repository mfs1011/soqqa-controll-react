import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentTransactionWidget from "@/components/dashboard/recent-transaction-widget";
import RecentTransferWidget from "@/components/dashboard/recent-transfer-widget";
import { useSearchParams } from "react-router-dom";
import TotalsWidget from "@/components/dashboard/totals-widget";
import YearlyTotalsWidget from "@/components/dashboard/yearly-totals-widget";

export default function Dashboard() {
    const [searchParams, setSearchParams] = useSearchParams()
    const activeTab = searchParams.get("tab") ?? "income-expense"

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">
                Dashboard
            </h2>

            {/* Cards shu yerga */}
            <TotalsWidget />

            {/* Chart */}
            <YearlyTotalsWidget />

            {/* Recent */}
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
                            <h3 className="text-lg font-semibold mb-4">
                                Recent Activity
                            </h3>
                            <TabsList>
                                <TabsTrigger value="income-expense">Income & Expense</TabsTrigger>
                                <TabsTrigger value="transfers">Transfers</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="income-expense">
                            <RecentTransactionWidget />
                        </TabsContent>

                        <TabsContent value="transfers">
                            <RecentTransferWidget />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}