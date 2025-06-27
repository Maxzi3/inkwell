import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "../../services/apiComments";
import toast from "react-hot-toast";

export function useUpdateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      postId: string;
      commentId: string;
      content: string;
    }) => updateComment(payload),
    onSuccess: () => {
      toast.success('Comment Updated')
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
}
