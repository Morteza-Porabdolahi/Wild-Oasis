import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const { isLoading: isLoggingIn, mutate: login } = useMutation({
    mutationFn: (user) => loginApi(user),
    onSuccess: (data) => {
      toast.success('You logged in successfully !');
      queryClient.setQueryData(['user'], data.user);
      navigate('/dashboard', { replace: true });
    },
    onError: (e) => {
      toast.error(e.message)
    }
  });

  return [isLoggingIn, login];
}
