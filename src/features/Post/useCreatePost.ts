import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/apiPosts";
import { toast } from "react-hot-toast";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (formData: FormData) => createPost(formData),
    onSuccess: () => {
      toast.success("Post created");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/"); // Redirect to home page after creating post
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
