import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../../services/apiPosts'


export const useGetPosts = () =>
  useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })
  

  