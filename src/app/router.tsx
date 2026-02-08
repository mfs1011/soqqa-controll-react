import { createBrowserRouter } from "react-router-dom"
import Layout from "./layout"

import Dashboard from "@/pages/dashboard"
import Accounts from "@/pages/accounts"
import Transactions from "@/pages/transactions"
import Transfers from "@/pages/transfers"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "accounts",
                element: <Accounts />,
            },
            {
                path: "transactions",
                element: <Transactions />,
            },
            {
                path: "transfers",
                element: <Transfers />,
            },
        ],
    },
])
