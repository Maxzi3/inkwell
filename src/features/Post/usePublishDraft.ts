import { useMutation, useQueryClient } from '@tanstack/react-query'
import { publishDraft } from '../../services/apiPosts'
import { toast } from 'react-hot-toast'

export const usePublishDraft = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: string) => publishDraft(postId),
    onSuccess: () => {
      toast.success('Draft published')
      queryClient.invalidateQueries({ queryKey: ['drafts'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error: Error) => toast.error(error.message),
  })
}
