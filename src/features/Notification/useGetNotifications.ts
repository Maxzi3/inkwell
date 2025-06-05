import { useQuery } from "@tanstack/react-query";
import { getMyNotifications } from "../../services/apiNotification";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getMyNotifications,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
