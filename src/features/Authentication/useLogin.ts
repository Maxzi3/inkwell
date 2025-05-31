import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginUser, type AuthPayload } from "../../services/apiAuth";
import { setAccessToken } from "../../services/api";
import { isAxiosError } from "axios";
import { useAuth } from "../../contexts/AuthContext";

export function useLogin() {
  const { setIsAuthenticated } = useAuth();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
  
    return useMutation({
      mutationFn: (payload: AuthPayload) => loginUser(payload),
      onSuccess: (data) => {
        setAccessToken(data?.accessToken)
        setIsAuthenticated(true);
        // setAccessToken("fake.invalid.token")
        navigate("/", { replace: true });
        toast.success('Logged in successfully!');
        queryClient.invalidateQueries({ queryKey: ['authStatus'] });
        queryClient.invalidateQueries({ queryKey: ["me"] });
      },
       onError: (error) => {
              let message = "Login failed";
        
           
              if (isAxiosError(error)) {
                message = error.response?.data?.message || message;
              }
        
              toast.error(message);
            },
          });
  }

