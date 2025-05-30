import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { resetPassword, type ResetPayload } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useResetPassword() {
    const navigate = useNavigate();

    return useMutation({
      mutationFn: (payload: ResetPayload) => resetPassword(payload),
      onSuccess: () => { toast.success("Password reset successfully! Please login.");
        navigate("/login", { replace: true });},
      onError: () => toast.error('Reset failed'),
    });
  }