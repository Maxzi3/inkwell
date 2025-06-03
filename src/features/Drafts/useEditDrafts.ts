import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editDraftById, type EditDraftPayload} from "../../services/apiPosts";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

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
    onError: (error: Error) => {
      let message = "Failed to update draft";

      if (isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      toast.error(message);
    },
  });
}
