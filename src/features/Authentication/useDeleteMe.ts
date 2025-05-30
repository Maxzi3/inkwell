import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMe } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../../services/api";

export function useDeleteMe() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
    return useMutation({
      mutationFn: deleteMe,
      onSuccess: async () => { 
        await queryClient.clear(); 
        setAccessToken(null)
        toast.success("Account deleted successfully!");
        navigate("/signup", { replace: true }); // Redirect to signup page
        toast.success('Account deleted')},
      onError: () => toast.error('Failed to delete account'),
    });
  }