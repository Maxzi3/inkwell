import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { bookmarkPost, unbookmarkPost } from "../../services/apiPosts";

export const useBookmarkPost = () => {
  const queryClient = useQueryClient();

  return {
    bookmark: useMutation({
      mutationFn: bookmarkPost,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: () => toast.error("Could not like bookmark"),
    }),
    unbookmark: useMutation({
      mutationFn: unbookmarkPost,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: () => toast.error("Could not remove bookmark"),
    }),
  };
};
