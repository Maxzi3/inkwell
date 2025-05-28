import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from '../../services/apiPosts'
import { toast } from 'react-hot-toast'

type CreatePostInput = {
  title: string
  content: string
  category: string
  image?: string
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (post: CreatePostInput) => createPost(post),
    onSuccess: () => {
      toast.success('Post created')
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error: Error) => toast.error(error.message),
  })
}
