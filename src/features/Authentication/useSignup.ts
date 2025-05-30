import { useMutation} from "@tanstack/react-query";
import { signupUser, type SignupPayload } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

export function useSignup() {
    const navigate = useNavigate();
  
    return useMutation({
      mutationFn: (payload: SignupPayload) => signupUser(payload),
      onSuccess: () => {
        toast.success("Account created! Check Your Email to verify");
        navigate("/login");
      },
      onError: (error) => {
        let message = "Signup failed";
  
     
        if (isAxiosError(error)) {
          message = error.response?.data?.message || message;
        }
  
        toast.error(message);
      },
    });
  }