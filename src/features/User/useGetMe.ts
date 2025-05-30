import { useQuery } from '@tanstack/react-query';
import { getMe } from '../../services/apiUser';


export function useGetMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    retry: 1, // optional, depending on your app behavior
  });
}
