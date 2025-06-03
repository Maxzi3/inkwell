import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDraft} from "../../services/apiPosts";
import { toast } from "react-hot-toast";
import { isAxiosError } from "axios";

export const useCreateDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createDraft(formData),
    onSuccess: () => {
      toast.success("Draft created");
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
    },
    onError: (error: Error) => {
      let message = "Something went wrong";

      if (isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      toast.error(message);
    },
  });
};
