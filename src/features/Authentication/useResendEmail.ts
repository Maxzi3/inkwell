import { useMutation } from "@tanstack/react-query";
import { resendVerificationEmail } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useResendEmail() {
    return useMutation({
      mutationFn: (payload: { email: string }) => resendVerificationEmail(payload),
      onSuccess: () => toast.success('Verification email resent'),
      onError: () => toast.error('Failed to resend email'),
    });
  }