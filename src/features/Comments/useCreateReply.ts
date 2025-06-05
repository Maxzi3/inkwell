import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReplyOnComment, type ReplyPayload } from "../../services/apiComments";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

export function useCreateReply() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ReplyPayload) => createReplyOnComment(payload),
    onSuccess: (_, variables) => {
        toast.success("Reply created");
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
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
