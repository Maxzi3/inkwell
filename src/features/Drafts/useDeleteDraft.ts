import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDraftById } from "../../services/apiPosts";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

export function useDeleteDraft() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (draftId: string) => deleteDraftById(draftId),
    onSuccess: () => {
      toast.success("Draft deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
    },
    onError: (error: Error) => {
      let message = "Failed to delete draft";

      if (isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      toast.error(message);
    },
  });
}
