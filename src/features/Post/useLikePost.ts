import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost, unlikePost } from "../../services/apiPosts";
import { toast } from "react-hot-toast";

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return {
    like: useMutation({
      mutationFn: likePost,
      onSuccess: () => {
        // Invalidate both the specific post and the list of posts
        queryClient.invalidateQueries({
          queryKey: ["post"],
        });
        queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
      },
      onError: () => toast.error("Could not like post"),
    }),
    unlike: useMutation({
      mutationFn: unlikePost,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({ queryKey: ["post"] });

      },
      onError: () => toast.error("Could not remove like"),
    }),
  };
};
