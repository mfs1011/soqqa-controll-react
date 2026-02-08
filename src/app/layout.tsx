import { Outlet } from "react-router-dom"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-700">

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>

    </div>
  )
}
