import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostId } from "../../services/apiPosts";
import { toast } from "react-hot-toast";
import { isAxiosError } from "axios";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deletePostId(postId),
    onSuccess: () => {
      toast.success("Post deleted");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
    },
    onError: (error: Error) => {
      let message = "Failed to delete Post";

      if (isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      toast.error(message);
    },
  });
};
