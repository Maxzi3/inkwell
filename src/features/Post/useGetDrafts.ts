import { useQuery } from '@tanstack/react-query'
import { getDrafts } from '../../services/apiPosts'


export const useGetDrafts = () =>
  useQuery({
    queryKey: ['drafts'],
    queryFn: getDrafts,
  })
