import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createDraft } from '../../services/apiPosts'
import { toast } from 'react-hot-toast'

export const useCreateDraft = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createDraft,
    onSuccess: () => {
      toast.success('Draft created')
      queryClient.invalidateQueries({ queryKey: ['drafts'] })
    },
    onError: (error: Error) => toast.error(error.message),
  })
}
