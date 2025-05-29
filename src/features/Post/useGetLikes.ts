import { useQuery } from '@tanstack/react-query'
import { getLikes } from '../../services/apiPosts'

export const useGetLikes = () =>
  useQuery({
    queryKey: ['likes'],
    queryFn: getLikes,
  })
