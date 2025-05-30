import { useMutation } from "@tanstack/react-query";
import { updateMyPassword, type PasswordUpdatePayload } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useUpdatePassword() {
    const navigate = useNavigate();
    return useMutation({
      mutationFn: (payload: PasswordUpdatePayload) => updateMyPassword(payload),
      onSuccess: () => {toast.success('Password updated updated successfully!')
        navigate("/login", { replace: true })},
      onError: (err) => {
        toast.error('Failed to update password');
        if (
          err.message?.includes("token") ||
          err.message?.includes("Unauthorized")
        ) {
          navigate("/login");
        }
      },
    });
  }