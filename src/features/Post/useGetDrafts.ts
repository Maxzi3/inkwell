import { useQuery } from '@tanstack/react-query'
import { getDrafts } from '../../services/apiPosts'
import { toast } from 'react-hot-toast'
import type {Post} from "../../ui/types"

export const useGetDrafts = () =>
  useQuery({
    queryKey: ['drafts'],
    queryFn: getDrafts,
    onError: (error: Error) => toast.error(error.message),
  })
