import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishDraft } from "../../services/apiPosts";
import { toast } from "react-hot-toast";
import { isAxiosError } from "axios";

export const usePublishDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => publishDraft(postId),
    onSuccess: () => {
      toast.success("Draft published");
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: Error) => {
      let message = "Failed to PUBLISH DRAFT";

      if (isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      toast.error(message);
    },
  });
};
