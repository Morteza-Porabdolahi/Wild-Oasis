import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const { isLoading, mutate: logout } = useMutation( {
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success('You logged out successfully !');
      navigate('/login', { replace: true });
      queryClient.removeQueries();
    }
  })

  return [isLoading, logout];
}
