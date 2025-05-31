import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePost, type PostUpdatePayload } from '../../services/apiPosts'
import { toast } from 'react-hot-toast'

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      postId,
      data,
    }: {
      postId: string;
      data: PostUpdatePayload;
    }) => updatePost(postId, data),
    onSuccess: () => {
      toast.success("Post updated");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
