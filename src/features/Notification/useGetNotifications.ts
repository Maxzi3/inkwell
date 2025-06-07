import { useQuery } from "@tanstack/react-query";
import { getMyNotifications } from "../../services/apiNotification";
import { useAuth } from "../../contexts/AuthContext";

export const useNotifications = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getMyNotifications,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: isAuthenticated && !authLoading,
    retry: 1,
  });
};
