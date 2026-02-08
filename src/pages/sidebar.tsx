import { NavLink } from "react-router-dom"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-6">
        Soqqa
      </h2>

      <nav className="flex flex-col gap-2">
        <NavLink 
            to="/"
            className={({ isActive }) =>
                isActive ? "text-blue-600" : ""
            }    
        >
            Dashboard
        </NavLink>
        <NavLink
            to="/accounts"
            className={({ isActive }) =>
                isActive ? "text-blue-600" : ""
            }
        >
            Accounts
        </NavLink>
        <NavLink
            to="/transactions"
            className={({ isActive }) =>
                isActive ? "text-blue-600" : ""
            }
        >
            Transactions</NavLink>
        <NavLink
            to="/transfers"
            className={({ isActive }) =>
                isActive ? "text-blue-600" : ""
            }
        >
            Transfers
        </NavLink>
      </nav>
    </aside>
  )
}
