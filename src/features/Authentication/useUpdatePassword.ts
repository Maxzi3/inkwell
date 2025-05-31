import { useMutation } from "@tanstack/react-query";
import {
  updateMyPassword,
  type PasswordUpdatePayload,
} from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { isAxiosError } from "axios";

export function useUpdatePassword() {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: PasswordUpdatePayload) => updateMyPassword(payload),
    onSuccess: async () => {
      toast.success("Password updated successfully!");
      setTimeout(() => {
        setAccessToken(null); 
        setIsAuthenticated(false);
        navigate("/login", { replace: true });
      }, 500); 
    },
    onError: (err) => {
      let message = "Update password failed";
      if (isAxiosError(err)) {
        message = err.response?.data?.message || message;
      }
      toast.error(message);

      if (
        err.message?.includes("token") ||
        err.message?.includes("Unauthorized")
      ) {
        navigate("/login");
      }
    },
  });
}
