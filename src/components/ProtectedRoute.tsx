import { Navigate, useLocation } from "react-router-dom";
import { useEffect, type ReactNode} from "react";

import toast from "react-hot-toast";
import { accessToken } from "../services/api";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = !!accessToken;

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to view this page");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
