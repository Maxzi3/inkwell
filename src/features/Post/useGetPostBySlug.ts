import { useQuery } from '@tanstack/react-query'
import { getPostBySlug } from '../../services/apiPosts'
import { toast } from 'react-hot-toast'

export const useGetPostBySlug = (slug: string) =>
  useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug,
    onError: (error: Error) => toast.error(error.message),
  })
