import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDraft} from "../../services/apiPosts";
import { toast } from "react-hot-toast";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useCreateDraft = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: FormData) => createDraft(formData),
    onSuccess: () => {
      toast.success("Draft created");
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
      navigate("/drafts"); // Redirect to drafts page after creating draft
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
