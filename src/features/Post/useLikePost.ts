import { useMutation, useQueryClient } from '@tanstack/react-query'
import { likePost } from '../../services/apiPosts'
import { toast } from 'react-hot-toast'

export const useLikePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: string) => likePost(postId),
    onSuccess: () => {
      toast.success('Post liked')
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error: Error) => toast.error(error.message),
  })
}
