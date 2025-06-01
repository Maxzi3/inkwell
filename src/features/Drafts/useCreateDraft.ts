import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDraft} from "../../services/apiPosts";
import { toast } from "react-hot-toast";

export const useCreateDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createDraft(formData),
    onSuccess: () => {
      toast.success("Draft created");
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};
