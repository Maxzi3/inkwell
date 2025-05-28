import { useQuery } from '@tanstack/react-query'
import { getBookmarks } from '../../services/apiPosts'
import { toast } from 'react-hot-toast'

export const useGetBookmarks = () =>
  useQuery({
    queryKey: ['bookmarks'],
    queryFn: getBookmarks,
    onError: (error: Error) => toast.error(error.message),
  })
