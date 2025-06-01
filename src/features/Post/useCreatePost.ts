import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost} from '../../services/apiPosts'
import { toast } from 'react-hot-toast'



export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) => createPost(formData),
    onSuccess: () => {
      toast.success("Post created");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
