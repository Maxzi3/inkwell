import { useQuery } from '@tanstack/react-query'
import { getLikes } from '../../services/apiPosts'
import { toast } from 'react-hot-toast'

export const useGetLikes = () =>
  useQuery({
    queryKey: ['likes'],
    queryFn: getLikes,
    onError: (error: Error) => toast.error(error.message),
  })
