import { useAuth } from "@/providers/auth";
import { Navigate, Outlet } from "react-router-dom";

export function AdminRoute() {
  const { isAdmin } = useAuth();
  if (!isAdmin) return <Navigate to="*" replace />;
  return <Outlet />;
}
