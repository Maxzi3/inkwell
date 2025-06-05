import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "../../services/apiComments";

export function useUpdateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      postId: string;
      commentId: string;
      content: string;
    }) => updateComment(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
    },
  });
}
