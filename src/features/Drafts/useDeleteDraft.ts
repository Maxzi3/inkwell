import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDraftById } from "../../services/apiPosts";
import toast from "react-hot-toast";

export function useDeleteDraft() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (draftId: string) => deleteDraftById(draftId),
    onSuccess: () => {
      toast.success("Draft deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
    },
    onError: (error: Error) => {
      const message = error.message || "Failed to delete draft";
      toast.error(message);
    },
  });
}
