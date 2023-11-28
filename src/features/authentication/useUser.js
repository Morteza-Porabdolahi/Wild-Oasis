import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });
  const isAuth = data?.role === "authenticated";

  return [isLoading, isAuth, data]
}
