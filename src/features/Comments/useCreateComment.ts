import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, type CommentPayload } from "../../services/apiComments";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

export function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CommentPayload) => createComment(payload),
    onSuccess: () => {
      toast.success("Comment created");
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error: Error) => {
      let message = "Something went wrong";

      if (isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      toast.error(message);
    },
  });
}
