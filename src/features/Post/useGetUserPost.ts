import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../../services/apiPosts'
import { toast } from 'react-hot-toast'
import type {Post} from "../../ui/types"

export const useGetPosts = () =>
  useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: getPosts,
    onError: (error) => toast.error(error.message),
  })

  