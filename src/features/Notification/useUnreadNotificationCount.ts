import { useQuery } from "@tanstack/react-query";
import { fetchUnreadCount } from "../../services/apiNotification";

export const useUnreadNotificationCount = () => {
  return useQuery({
    queryKey: ["unread-notification-count"],
    queryFn: fetchUnreadCount,
    refetchInterval: 10000, // Optional: refresh every 10s
  });
};
