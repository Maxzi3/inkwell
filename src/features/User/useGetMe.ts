import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../services/apiUser";
import { useAuth } from "../../contexts/AuthContext";

export function useGetMe() {
    const { isAuthenticated, isLoading: authLoading } = useAuth();
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    select: (data) => data.user,
    enabled:isAuthenticated && !authLoading,
    retry: 1, 
  });
}
