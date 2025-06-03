import { useQuery } from "@tanstack/react-query";
import { getMyNotifications } from "../../services/apiNotification";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getMyNotifications,
  });
};
