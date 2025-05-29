import { useQuery } from '@tanstack/react-query'
import { getPostBySlug } from '../../services/apiPosts'


export const useGetPostBySlug = (slug: string) =>
  useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug, 
  })
