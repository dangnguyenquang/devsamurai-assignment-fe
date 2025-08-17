import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/stores";
import { jwtDecode } from "jwt-decode";
import { useAuthInitialization } from "@/hooks/useAuthInitialization";
import { logout } from "@/features/auth/authSlice";
import httpClient from "@/lib/http/httpClient";

interface JwtPayload {
  exp: number;
  iat?: number;
  sub?: string;
}

export default function ProtectedRoute() {
  const dispatch = useDispatch<AppDispatch>();
  useAuthInitialization();
  
  const token = useSelector((state: RootState) => state.auth.token);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  let isTokenValid = false;
  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      const bufferTime = 30 * 1000;
      isTokenValid = decoded.exp * 1000 > Date.now() + bufferTime;
      
      if (!isTokenValid) {
        console.warn('Token expired, logging out');
        dispatch(logout());
        httpClient.removeAuthToken();
      }
    } catch (error) {
      console.warn('Invalid token format:', error);
      isTokenValid = false;

      dispatch(logout());
      httpClient.removeAuthToken();
    }
  }

  if (!token || !isTokenValid) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}