import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost, type PostUpdatePayload } from "../../services/apiPosts";
import { toast } from "react-hot-toast";
import { isAxiosError } from "axios";

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      payload,
    }: {
      postId: string;
      payload: PostUpdatePayload;
    }) => updatePost(postId, payload),
    onSuccess: () => {
      toast.success("Post updated");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: Error) => {
      let message = "Failed to update post";

      if (isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      toast.error(message);
    },
  });
};
