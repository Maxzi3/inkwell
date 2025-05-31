import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Spinner from "../ui/Spinner";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate("/login");
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) return <Spinner />;
  if (isAuthenticated) return <Outlet />;

  return null;
};

export default ProtectedRoute;
