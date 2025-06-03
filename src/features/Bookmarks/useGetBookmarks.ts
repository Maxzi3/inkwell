import { useQuery } from '@tanstack/react-query'
import { getBookmarks } from '../../services/apiPosts'


export const useGetBookmarks = () =>
  useQuery({
    queryKey: ['bookmarks'],
    queryFn: getBookmarks,
  })
