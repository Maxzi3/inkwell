  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { logoutUser } from "../../services/apiAuth";
  import toast from "react-hot-toast";
  import { useNavigate } from "react-router-dom";
  import { setAccessToken } from "../../services/api";
  import { isAxiosError } from "axios";
import { useAuth } from "../../contexts/AuthContext";

  export function useLogout() {
    const { setIsAuthenticated } = useAuth();
      const navigate = useNavigate();
      const queryClient = useQueryClient();
    
      return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
          setAccessToken(null)
          setIsAuthenticated(false);
            toast.success('Logged out!');
            queryClient.invalidateQueries({ queryKey: ['authStatus'] });
            setTimeout(() => {
                navigate("/login", { replace: true });
              }, 100);
        },
        onError: (error) => {
          let message = "Logout failed";
    
          if (isAxiosError(error)) {
            message = error.response?.data?.message || message;
          }
    
          toast.error(message);
        },
      });
      
    }