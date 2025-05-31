import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editDraftById, type EditDraftPayload} from "../../services/apiPosts";
import toast from "react-hot-toast";

export function useEditDraft() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      draftId,
      payload,
    }: {
      draftId: string;
      payload: EditDraftPayload;
    }) => editDraftById(draftId, payload),

    onSuccess: () => {
      toast.success("Draft updated successfully");
      queryClient.invalidateQueries({ queryKey: ["drafts"] }); 
    },

    onError: (err: Error) => {
      const message = err?.message || "Failed to update draft";
      toast.error(message);
    },
  });
}
