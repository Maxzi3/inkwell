import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationAsRead } from "../../services/apiNotification";

export const useMarkOneRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: string) =>
      markNotificationAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
