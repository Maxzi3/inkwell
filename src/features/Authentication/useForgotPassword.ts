import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useForgotPassword() {
    return useMutation({
      mutationFn: (payload: { email: string }) => forgotPassword(payload),
      onSuccess: () => toast.success('Reset link sent! Check your email.'),
      onError: () => toast.error('Failed to send reset email'),
    });
  }
  