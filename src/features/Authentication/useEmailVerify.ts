import { useMutation} from "@tanstack/react-query";
import { emailVerify } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useEmailVerify() {
    const navigate = useNavigate();
    return useMutation({
      mutationFn: (payload: { token: string }) => emailVerify(payload),
      onSuccess: (data) => {
        if (data.status === "success") {
          if (data.verified) {
            toast.success("Email verified successfully!");
            navigate("/login?verified=true", { replace: true });
          } else if (data.alreadyVerified) {
            toast.success("Email is already verified!");
            navigate("/login?alreadyVerified=true", { replace: true });
          }
        }
      },
      onError: () => {
        toast.error("Email verification failed");
        navigate("/login?error=invalidToken", { replace: true });
      },
    });
  }