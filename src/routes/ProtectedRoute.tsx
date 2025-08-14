import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores";

export default function ProtectedRoute() {
  // const token = useSelector((state: RootState) => state.auth.token);
  const token = true;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
