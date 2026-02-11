import { createBrowserRouter } from "react-router-dom"
import Layout from "./layout"

import Dashboard from "@/pages/dashboard"
import Accounts from "@/pages/accounts"
import Transactions from "@/pages/transactions"
import { Login } from "@/pages/login"
import Transfers from "@/pages/transfers"
import { ProtectedRoute } from "@/components/guards/ProtectedRoute"

export const router = createBrowserRouter([
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <Layout />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />
                    },
                    {
                        path: "accounts",
                        element: <Accounts />
                    },
                    {
                        path: "transactions",
                        element: <Transactions />
                    },
                    {
                        path: "transfers",
                        element: <Transfers />
                    },
                ],
            },
        ],
    },
    {
        path: "login",
        element: <Login />,
    },
])
