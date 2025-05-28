import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bookmarkPost } from '../../services/apiPosts'
import { toast } from 'react-hot-toast'

export const useBookmarkPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: string) => bookmarkPost(postId),
    onSuccess: () => {
      toast.success('Post bookmarked')
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
    },
    onError: (error: Error) => toast.error(error.message),
  })
}
