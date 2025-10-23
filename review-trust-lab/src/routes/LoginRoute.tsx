import { useAuth } from "@/providers/auth";
import { Navigate, Outlet } from "react-router-dom";

export function LoginRoute() {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return <Outlet />;
}
