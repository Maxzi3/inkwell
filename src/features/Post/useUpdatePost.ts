import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePost } from '../../services/apiPosts'
import { toast } from 'react-hot-toast'

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ postId, update }: { postId: string; update: any }) =>
      updatePost(postId, update),
    onSuccess: () => {
      toast.success('Post updated')
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error: Error) => toast.error(error.message),
  })
}
