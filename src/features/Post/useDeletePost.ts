import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePostId } from '../../services/apiPosts'
import { toast } from 'react-hot-toast'

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: string) => deletePostId(postId),
    onSuccess: () => {
      toast.success('Post deleted')
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error: Error) => toast.error(error.message),
  })
}
