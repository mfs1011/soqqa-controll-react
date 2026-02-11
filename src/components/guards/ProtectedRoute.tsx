import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "@/lib/auth-tokens";

export const ProtectedRoute = () => {
    const token = getAccessToken();

    if (!token) {
        // Login qilmagan bo'lsa, login sahifasiga jo'natamiz
        // replace: true - orqaga qaytishni (back button) cheklaydi
        return <Navigate to="/login" replace />;
    }

    // Agar login qilgan bo'lsa, ichki sahifalarni ko'rsatamiz
    return <Outlet />;
};