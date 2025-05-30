import { useMutation } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { deleteMe } from '../../services/apiUser';

export function useDeleteMe() {
  return useMutation({
    mutationFn: deleteMe,
    onSuccess: () => {
      toast.success('Account deleted.');
      // you might want to log out user here too
    },
    onError: () => {
      toast.error('Failed to delete account.');
    },
  });
}
